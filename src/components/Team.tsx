import { useRef } from 'react';
import { useSectionReveal } from '../lib/gsap';
import { team } from '../lib/data';
import { Lines } from './ui';

export default function Team() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section id="team" ref={root} className="border-y-2 border-ink bg-sky text-ink">
      <div className="wrap py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2
            data-head
            className="font-display text-[clamp(2.6rem,7vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] lg:col-span-8"
          >
            <Lines lines={['Studio team.']} />
          </h2>
          <p data-reveal className="max-w-sm text-lg font-medium leading-relaxed lg:col-span-4 lg:pb-3">
            Senior people leading engineering, AI and product design. You talk to them directly.
          </p>
        </div>

        <ul data-stagger className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:mt-20 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="group">
              <div
                aria-hidden="true"
                className="relative aspect-[4/5] overflow-hidden bg-ink text-paper transition-colors duration-500 group-hover:bg-sun group-hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="absolute right-4 top-4 h-7 w-7 text-sun transition-colors duration-500 group-hover:text-ink">
                  <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
                  <circle cx="12" cy="12" r="3.2" fill="currentColor" />
                </svg>
                <span className="absolute -bottom-[0.08em] left-3 font-display text-[clamp(4.5rem,11vw,10rem)] font-extrabold leading-none tracking-[-0.07em] sm:left-4">
                  {m.initials}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-[-0.02em] sm:text-2xl">
                {m.name}
              </h3>
              <p className="mt-1 text-[15px] font-medium leading-snug text-ink/80 sm:text-base">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
