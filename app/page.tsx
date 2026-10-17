import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <div className="dot-grid min-h-dvh">
      <Nav />
      <main id="main">
        {/* The hero paints immediately; everything below it defers. */}
        <Hero />
        <div className="defer-paint">
          <Capabilities />
        </div>
        <div className="defer-paint">
          <Work />
        </div>
        <div className="defer-paint">
          <About />
        </div>
        <div className="defer-paint">
          <Stack />
        </div>
        <div className="defer-paint">
          <Credentials />
        </div>
        <div className="defer-paint">
          <Writing />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
