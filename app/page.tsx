import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/*
 * Single-page site for Harry's Coffee Shop.
 * Sections are composed in order: Nav → Hero → About → Menu → Reviews →
 * Visit Us (Contact + dynamic Opening Hours) → Footer.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Menu />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
