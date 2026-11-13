import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { nav, EMAIL } from '../lib/data';
import { AnchorLink, Logo } from './ui';

const TRACKED = ['top', 'studio', 'services', 'work', 'why', 'process', 'stack', 'team', 'contact'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav item for the section currently crossing the middle of the screen
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      TRACKED.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.from(menuRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power1.out' });
      gsap.from('[data-menu-item]', {
        yPercent: 115,
        duration: 0.75,
        ease: 'power4.out',
        stagger: 0.05,
        delay: 0.05,
      });
      gsap.from('[data-menu-foot]', { autoAlpha: 0, y: 16, duration: 0.6, delay: 0.4 });
    }, menuRef);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b text-white transition-colors duration-300 ${
          solid ? 'border-line bg-ink/92 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <AnchorLink to="top" onNavigate={() => setOpen(false)} className="text-[1.6rem] text-white" aria-label="VISION Studio, back to top">
            <Logo />
          </AnchorLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <AnchorLink
                      to={item.id}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                        isActive ? 'text-sun' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-sun transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </AnchorLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <AnchorLink
              to="contact"
              onNavigate={() => setOpen(false)}
              className="group/btn hidden items-center gap-2 bg-sun px-4 py-2.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-white sm:inline-flex"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </AnchorLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center border-2 border-white/25 text-white transition-colors hover:border-sun hover:text-sun lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-16 text-white lg:hidden"
        >
          <nav aria-label="Mobile" className="wrap flex-1 py-8">
            <ul>
              {[...nav, { id: 'contact', label: 'Contact' }].map((item) => (
                <li key={item.id} className="overflow-hidden border-b border-line">
                  <AnchorLink
                    to={item.id}
                    onNavigate={() => setOpen(false)}
                    data-menu-item
                    className={`flex items-center justify-between py-4 font-display text-[clamp(2rem,9vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em] ${
                      active === item.id ? 'text-sun' : 'text-white'
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="h-6 w-6 text-sky" aria-hidden="true" />
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
          <div data-menu-foot className="wrap pb-8">
            <a href={`mailto:${EMAIL}`} className="font-mono text-sm text-sky underline underline-offset-4">
              {EMAIL}
            </a>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-fog">Think Big. Build Bold.</p>
          </div>
        </div>
      )}
    </>
  );
}
