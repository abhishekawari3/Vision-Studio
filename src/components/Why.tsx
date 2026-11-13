import { useRef } from 'react';
import { useSectionReveal } from '../lib/gsap';
import { reasons } from '../lib/data';
import { Lines } from './ui';

export default function Why() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);

  return (
    <section id="why" ref={root} className="bg-sun text-ink">
      <div className="wrap py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2
            data-head
            className="font-display text-[clamp(2.6rem,7vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] lg:col-span-8"
          >
            <Lines lines={['Why choose', 'VISION?']} />
          </h2>
          <p data-reveal className="max-w-sm text-lg font-medium leading-relaxed lg:col-span-4 lg:pb-3">
            Four commitments we make on every engagement, whatever the size of the build.
          </p>
        </div>

        <ul data-stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <li
                key={r.title}
                className="group flex flex-col border-2 border-ink p-6 transition-colors duration-300 hover:bg-ink hover:text-paper lg:p-7"
              >
                <span className="grid h-12 w-12 place-items-center bg-ink text-sun transition-colors duration-300 group-hover:bg-sun group-hover:text-ink">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-8 font-display text-[1.75rem] font-extrabold leading-[1.02] tracking-[-0.03em]">
                  {r.title}
                </h3>
                <ul className="mt-6 space-y-2.5 border-t-2 border-current pt-5">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-medium leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 bg-ink transition-colors duration-300 group-hover:bg-sun"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
