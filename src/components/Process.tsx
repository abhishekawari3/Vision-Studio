import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion, useMotion, useSectionReveal } from '../lib/gsap';
import { phases } from '../lib/data';
import { Lines } from './ui';

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const numerals = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useSectionReveal(root);

  // Track which phase sits on the reading line
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = list.current ? Array.from(list.current.children) : [];
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  useMotion(root, () => {
    gsap.from(fill.current, {
      scaleY: 0,
      ease: 'none',
      scrollTrigger: { trigger: list.current, start: 'top 55%', end: 'bottom 55%', scrub: 0.3 },
    });
  });

  useEffect(() => {
    gsap.to(numerals.current, {
      yPercent: (-100 / phases.length) * active,
      duration: prefersReducedMotion() ? 0 : 0.7,
      ease: 'power3.inOut',
      overwrite: true,
    });
  }, [active]);

  return (
    <section id="process" ref={root} className="bg-paper text-ink">
      <div className="wrap grid gap-14 py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2
              data-head
              className="font-display text-[clamp(2.6rem,9vw,4.5rem)] lg:text-[clamp(2.6rem,4.6vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            >
              <Lines lines={['From blueprint', 'to scale.']} />
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-lg leading-relaxed text-slate">
              A five-stage product development process. Every phase ends with deliverables you can hold us to.
            </p>

            <div className="mt-12 hidden items-end gap-4 lg:flex" aria-hidden="true">
              <div className="h-[1em] overflow-hidden font-display text-[9rem] font-extrabold leading-none xl:text-[11.5rem] tracking-[-0.06em]">
                <div ref={numerals}>
                  {phases.map((_, i) => (
                    <div key={i} className="h-[1em]">
                      0{i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pb-5 font-mono text-sm">
                <span className="block text-slate">/ 0{phases.length}</span>
                <span className="mt-1 block bg-sun px-2 py-1 font-bold">{phases[active].title}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute left-0 top-0 block h-full w-0.5 bg-ink/15" />
          <span ref={fill} aria-hidden="true" className="absolute left-0 top-0 block h-full w-0.5 origin-top bg-ink" />

          <ol ref={list}>
            {phases.map((p, i) => (
              <li key={p.title} className="relative pb-16 pl-8 last:pb-0 sm:pl-12 lg:pb-24">
                <span
                  aria-hidden="true"
                  className={`absolute left-[1px] top-1.5 block h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink transition-[background-color,scale] duration-300 ${
                    i <= active ? 'bg-sun' : 'bg-paper'
                  } ${i === active ? 'scale-125' : ''}`}
                />
                <div data-reveal>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate">
                    Phase {i + 1} <span className="lg:hidden">of {phases.length}</span>
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">{p.body}</p>

                  <h4 className="mt-7 font-mono text-xs font-bold uppercase tracking-[0.2em]">Deliverables</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.deliverables.map((d) => (
                      <li key={d} className="border-2 border-ink bg-paper px-3 py-1.5 text-[15px] font-medium">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
