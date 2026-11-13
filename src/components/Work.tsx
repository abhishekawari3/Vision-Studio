import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap, useSectionReveal } from '../lib/gsap';
import { projects } from '../lib/data';
import { AnchorLink, Lines } from './ui';

const PIN_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';
const LAST = projects.length - 1;

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [index, setIndex] = useState(0);

  useSectionReveal(root);

  // Desktop: the section pins and vertical scroll drives the reel sideways
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      const trackEl = track.current!;
      const viewportEl = viewport.current!;
      viewportEl.scrollLeft = 0;
      setPinned(true);

      const distance = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.7,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            gsap.set(bar.current, { scaleX: self.progress });
            setIndex(Math.min(LAST, Math.round(self.progress * projects.length)));
          },
        },
      });

      return () => {
        setPinned(false);
        setIndex(0);
        gsap.set(bar.current, { scaleX: 0 });
      };
    });
    return () => mm.revert();
  }, []);

  // Everywhere else: a native swipe carousel
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const p = el.scrollLeft / max;
      gsap.set(bar.current, { scaleX: p });
      setIndex(Math.min(LAST, Math.round(p * projects.length)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const step = (dir: 1 | -1) => {
    const el = viewport.current;
    const card = track.current?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <section id="work" ref={root} className="bg-ink text-white">
      <div ref={pin} className="work-pin">
        <div className="wrap work-head flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <h2
              data-head
              className="font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
            >
              <Lines lines={['Selected work']} />
            </h2>
            <p data-reveal className="work-sub mt-2 max-w-md text-fog">
              Twelve projects and solutions across logistics, commerce, AI, IoT and SaaS.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <p className="font-mono text-sm text-fog" aria-live="polite">
              <span className="text-2xl font-bold text-sun">{String(index + 1).padStart(2, '0')}</span>
              <span> / {projects.length}</span>
            </p>
            {pinned ? (
              <p className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-fog xl:flex">
                Keep scrolling
                <ArrowRight className="h-4 w-4 text-sky" aria-hidden="true" />
              </p>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={index === 0}
                  aria-label="Previous project"
                  className="grid h-11 w-11 place-items-center border-2 border-white/30 text-white transition-colors hover:border-sun hover:text-sun disabled:opacity-35 disabled:hover:border-white/30 disabled:hover:text-white"
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next project"
                  className="grid h-11 w-11 place-items-center border-2 border-white/30 text-white transition-colors hover:border-sun hover:text-sun"
                >
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          ref={viewport}
          className="work-viewport"
          role="region"
          aria-label="Project reel"
          tabIndex={pinned ? -1 : 0}
        >
          <div ref={track} data-stagger className="flex w-max items-stretch gap-5 px-[var(--gutter)] will-change-transform">
            {projects.map((p, i) => (
              <article
                key={p.title}
                className="group flex w-[82vw] max-w-[25rem] shrink-0 snap-start flex-col border border-line bg-ink-2 sm:w-[25rem]"
              >
                <div className="work-media relative overflow-hidden bg-ink-3">
                  <img
                    src={p.image}
                    alt={p.alt}
                    width={960}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition-[filter,scale] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 ${
                      i % 2 === 0 ? 'bg-sun' : 'bg-sky'
                    }`}
                  />
                  <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 font-mono text-xs font-bold text-sun">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-0 right-0 bg-paper px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink">
                    {p.kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.35rem] font-bold leading-[1.15] tracking-[-0.02em] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog">{p.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {p.tech.map((t) => (
                      <li key={t} className="border border-line px-2 py-1 font-mono text-[11px] text-sky">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            <div className="flex w-[82vw] max-w-[21rem] shrink-0 snap-start flex-col justify-between gap-10 bg-sun p-6 text-ink sm:w-[21rem]">
              <p className="font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.04em]">
                Your product could be number thirteen.
              </p>
              <AnchorLink
                to="contact"
                className="group/btn inline-flex items-center justify-between gap-3 bg-ink px-5 py-3.5 text-[15px] font-bold text-paper transition-colors hover:bg-white hover:text-ink"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
              </AnchorLink>
            </div>
          </div>
        </div>

        <div className="wrap work-bar">
          <div className="h-0.5 bg-line">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-sun" />
          </div>
        </div>
      </div>
    </section>
  );
}
