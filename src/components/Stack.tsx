import { useRef } from 'react';
import { useSectionReveal } from '../lib/gsap';
import { stack } from '../lib/data';
import { Lines } from './ui';

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section id="stack" ref={root} className="bg-ink text-white">
      <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              data-head
              className="font-display text-[clamp(2.6rem,9vw,4.5rem)] lg:text-[clamp(2.6rem,4.6vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            >
              <Lines lines={['Technology', <span className="text-sky">expertise.</span>]} />
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-lg leading-relaxed text-fog">
              The tools we reach for across frontend, backend, data, AI, mobile, IoT and infrastructure.
            </p>
          </div>
        </div>

        <dl data-stagger className="border-t border-line lg:col-span-8">
          {stack.map((row) => (
            <div
              key={row.category}
              className="grid gap-3 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6 lg:py-6"
            >
              <dt className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky">{row.category}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {row.tech.map((t) => (
                    <li
                      key={t}
                      className="border border-line px-3 py-1.5 font-mono text-sm text-white transition-colors duration-200 hover:border-sun hover:bg-sun hover:text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
