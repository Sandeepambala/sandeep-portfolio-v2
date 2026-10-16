import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Stack from "@/components/Stack";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div className="dot-grid min-h-dvh">
      <Nav />
      <main id="main">
        <Hero />
        <Capabilities />
        <Work />
        <About />
        <Stack />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
