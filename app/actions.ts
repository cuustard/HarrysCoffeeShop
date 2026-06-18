"use server";

/**
 * Server Actions for Harry's Coffee Shop.
 * ───────────────────────────────────────
 * First-party analytics only — no third-party tracking SDKs.
 *
 * `logSectionView` records a viewport impression in our own Supabase
 * (PostgreSQL) table via PostgREST. It runs on the server — on Cloudflare's
 * workerd runtime once bundled by @opennextjs/cloudflare — so it uses ONLY the
 * Web `fetch` API and no Node-native modules, keeping it edge-safe.
 *
 * Expected table `website_interactions`:
 *   id          bigint generated always as identity primary key
 *   section     text        not null              -- 'menu' | 'reviews'
 *   event_type  text        not null default 'view'
 *   session_id  uuid                              -- per-tab session (for uniques/funnels)
 *   created_at  timestamptz not null default now()
 *
 *   create index if not exists idx_wi_section_created
 *     on website_interactions (section, created_at desc);
 *
 * Required env (set as Worker secrets — never commit these):
 *   SUPABASE_URL                e.g. https://xxxxxxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY   server-only service-role key (bypasses RLS for inserts)
 */

export type TrackedSection = "menu" | "reviews";

// Whitelist — we never write arbitrary client-supplied strings to the DB.
const ALLOWED_SECTIONS: ReadonlySet<TrackedSection> = new Set([
  "menu",
  "reviews",
]);

// How long we'll wait on Supabase before giving up, so a hung request never
// ties up the worker invocation (or the client's action request).
const INSERT_TIMEOUT_MS = 3000;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function logSectionView(
  section: TrackedSection,
  sessionId?: string,
): Promise<void> {
  if (!ALLOWED_SECTIONS.has(section)) return;

  const baseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Misconfigured env → silently no-op rather than throwing in production.
  if (!baseUrl || !serviceKey) return;

  // Only accept a well-formed UUID; ignore anything else (never trust the client).
  const session_id = sessionId && UUID_RE.test(sessionId) ? sessionId : null;

  try {
    const res = await fetch(`${baseUrl}/rest/v1/website_interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        // Don't ask PostgREST to echo the inserted row back — we don't need it.
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ section, event_type: "view", session_id }),
      signal: AbortSignal.timeout(INSERT_TIMEOUT_MS),
    });

    if (!res.ok) {
      // Visible in `wrangler tail` for debugging; never surfaced to the user.
      console.warn(
        `analytics insert failed: ${res.status} ${await res.text()}`,
      );
    }
  } catch {
    // Analytics must never break the page — swallow any network/DB/timeout error.
  }
}
