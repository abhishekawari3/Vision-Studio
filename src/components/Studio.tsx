import { useRef } from 'react';
import { gsap, useMotion, useSectionReveal } from '../lib/gsap';
import { principles } from '../lib/data';

const STATEMENT: { word: string; mark?: boolean }[] = [
  { word: 'We' },
  { word: 'bridge' },
  { word: 'the' },
  { word: 'gap' },
  { word: 'between' },
  { word: 'business' },
  { word: 'ideas' },
  { word: 'and' },
  { word: 'reliable', mark: true },
  { word: 'software', mark: true },
  { word: 'solutions.', mark: true },
];

export default function Studio() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  useMotion(root, () => {
    const q = gsap.utils.selector(root);

    // The mission lights up word by word as you read down the page
    gsap.from(q('[data-word]'), {
      opacity: 0.14,
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: { trigger: q('[data-statement]')[0], start: 'top 82%', end: 'bottom 48%', scrub: 0.4 },
    });

    (q('[data-principle]') as HTMLElement[]).forEach((row) => {
      const st = () => ({ trigger: row, start: 'top 84%', once: true });
      gsap.from(row.querySelector('[data-rule]'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: st(),
      });
      gsap.from(row.querySelector('[data-word-big]'), { yPercent: 115, duration: 1.1, ease: 'power4.out', scrollTrigger: st() });
      gsap.from(row.querySelector('[data-detail]'), {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: st(),
      });
    });
  });

  return (
    <section id="studio" ref={root} className="bg-paper text-ink">
      <div className="wrap py-24 lg:py-36">
        <p data-reveal className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate">
          About the studio
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h2
            data-statement
            className="font-display text-[clamp(2.2rem,5.4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] lg:col-span-8"
          >
            {STATEMENT.map(({ word, mark }, i) => (
              <span key={i}>
                <span data-word className={mark ? 'inline-block bg-sun px-[0.12em]' : 'inline-block'}>
                  {word}
                </span>{' '}
              </span>
            ))}
          </h2>

          <p data-reveal className="max-w-md self-end text-lg leading-relaxed text-slate lg:col-span-4">
            VISION is an independent digital product engineering studio. We turn ambitious ideas into digital
            products through software engineering, product design and modern technology.
          </p>
        </div>

        <div className="mt-24 lg:mt-32">
          <h3 data-reveal className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate">
            Three principles hold it together
          </h3>

          <ul>
            {principles.map((p) => (
              <li key={p.title} data-principle className="relative">
                <span data-rule aria-hidden="true" className="absolute inset-x-0 top-0 block h-0.5 bg-ink" />
                <div className="grid items-end gap-5 py-9 lg:grid-cols-12 lg:gap-12 lg:py-12">
                  <h4 className="overflow-hidden pb-[0.12em] font-display text-[clamp(2.6rem,7.4vw,6.75rem)] font-extrabold leading-[0.95] tracking-[-0.045em] lg:col-span-7">
                    <span data-word-big className="block">
                      <span className="text-sky-deep">A</span>
                      {p.title.slice(1)}
                    </span>
                  </h4>
                  <div data-detail className="lg:col-span-5 lg:pb-3">
                    <p className="max-w-md text-lg leading-relaxed">{p.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li key={t} className="border border-ink/30 px-2.5 py-1 font-mono text-xs">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="block h-0.5 bg-ink" />
        </div>
      </div>
    </section>
  );
}
