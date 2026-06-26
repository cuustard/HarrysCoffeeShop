import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";

/*
 * Home page (/).
 * The shared shell — Navbar, <main> and Footer — lives in app/layout.tsx,
 * so each page only renders its own content.
 *
 * Sections: Hero → About → Menu snapshot → Reviews → Visit Us
 * (Contact + dynamic Opening Hours = the "Essential Info" block).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Reviews />
      <Contact />
    </>
  );
}
