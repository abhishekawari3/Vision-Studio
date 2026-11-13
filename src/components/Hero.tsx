import { useRef } from 'react';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { gsap, useMotion } from '../lib/gsap';
import { AnchorLink, btnGhost, btnPrimary } from './ui';
import Eye from './Eye';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const q = gsap.utils.selector(root);

    gsap
      .timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })
      .from(q('[data-line]'), { yPercent: 118, duration: 1.2, stagger: 0.13 })
      .from(q('[data-fade]'), { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, 0.45)
      .from(q('[data-eye]'), { scale: 0.7, rotation: -24, autoAlpha: 0, duration: 1.4, ease: 'expo.out' }, 0.2)
      .from(q('[data-grid]'), { autoAlpha: 0, duration: 1.6, ease: 'power1.out' }, 0);

    // Drift apart on the way out
    const out = () => ({ trigger: root.current, start: 'top top', end: 'bottom top', scrub: true });
    gsap.to(q('[data-eye-drift]'), { yPercent: 22, ease: 'none', scrollTrigger: out() });
    gsap.to(q('[data-copy]'), { yPercent: -8, ease: 'none', scrollTrigger: out() });
  });

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[calc(100svh-3.75rem)] flex-col overflow-hidden bg-ink text-white"
    >
      <div data-grid className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="wrap relative grid flex-1 items-center gap-10 pb-12 pt-28 lg:grid-cols-[1.45fr_1fr] lg:gap-8 lg:pb-10 lg:pt-24">
        <div data-copy>
          <p data-fade className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-sky sm:text-xs">
            Independent digital product engineering studio
          </p>

          <h1 className="mt-6 font-display text-[clamp(3.4rem,19.5vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.045em] lg:text-[clamp(5rem,min(11.5vw,21vh),11.25rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-line className="block whitespace-nowrap">
                Think Big.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <span data-line className="block whitespace-nowrap">
                Build <span className="text-sun">Bold.</span>
              </span>
            </span>
          </h1>

          <p data-fade className="mt-6 max-w-xl text-lg leading-relaxed text-fog sm:text-xl">
            VISION turns ambitious ideas into digital products, software platforms and automated systems for
            startups, businesses and enterprises.
          </p>

          <div data-fade className="mt-9 flex flex-wrap gap-3">
            <AnchorLink to="contact" className={btnPrimary}>
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </AnchorLink>
            <AnchorLink to="work" className={btnGhost}>
              See the work
            </AnchorLink>
          </div>
        </div>

        <div data-eye-drift className="mx-auto w-[min(72vw,22rem)] lg:mx-0 lg:w-full lg:max-w-[31rem] lg:justify-self-end">
          <div data-eye>
            <Eye />
          </div>
        </div>
      </div>

      <div className="relative border-t border-line">
        <div data-fade className="wrap flex items-center justify-between gap-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fog sm:text-xs">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-sun" aria-hidden="true" />
            <span>Sangamner · Bengaluru · Mumbai · Delhi NCR</span>
          </p>
          <AnchorLink to="studio" className="hidden items-center gap-2 text-white transition-colors hover:text-sun sm:flex">
            Scroll
            <ArrowDown className="nudge h-3.5 w-3.5" aria-hidden="true" />
          </AnchorLink>
        </div>
      </div>
    </section>
  );
}
