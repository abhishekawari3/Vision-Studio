import { useEffect } from 'react';
import { ScrollTrigger, scrollToId } from './lib/gsap';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Studio from './components/Studio';
import Stats from './components/Stats';
import Services from './components/Services';
import Work from './components/Work';
import Why from './components/Why';
import Process from './components/Process';
import Stack from './components/Stack';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Web fonts change line lengths; re-measure every scroll trigger once they land
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const t = window.setTimeout(() => scrollToId(hash), 450);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-sun focus:px-4 focus:py-3 focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Studio />
        <Stats />
        <Services />
        <Work />
        <Why />
        <Process />
        <Stack />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
