import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId, useSectionReveal } from '../lib/gsap';
import { services } from '../lib/data';
import { Lines } from './ui';

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const mounted = useRef(false);
  const [open, setOpen] = useState(0);

  useSectionReveal(root);

  useLayoutEffect(() => {
    const instant = !mounted.current || prefersReducedMotion();
    mounted.current = true;

    panels.current.forEach((panel, i) => {
      if (!panel) return;
      gsap.killTweensOf(panel);
      if (i === open) {
        gsap.set(panel, { visibility: 'visible' });
        gsap.to(panel, {
          height: 'auto',
          duration: instant ? 0 : 0.55,
          ease: 'power3.inOut',
          onComplete: () => ScrollTrigger.refresh(),
        });
        if (!instant) {
          gsap.fromTo(
            panel.querySelectorAll('[data-item]'),
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', stagger: 0.045, delay: 0.15 },
          );
        }
      } else {
        gsap.to(panel, {
          height: 0,
          duration: instant ? 0 : 0.45,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(panel, { visibility: 'hidden' });
            if (open === -1) ScrollTrigger.refresh();
          },
        });
      }
    });
  }, [open]);

  const discuss = (enquiry: string) => {
    window.dispatchEvent(new CustomEvent('vision:enquiry', { detail: enquiry }));
    scrollToId('contact');
  };

  return (
    <section id="services" ref={root} className="bg-paper text-ink">
      <div className="wrap py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2
            data-head
            className="font-display text-[clamp(2.25rem,7vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.045em] lg:col-span-8"
          >
            <Lines lines={['Six disciplines.', 'One senior team.']} />
          </h2>
          <p data-reveal className="max-w-sm text-lg leading-relaxed text-slate lg:col-span-4 lg:pb-3">
            Everything a digital product needs, from the first screen to the last service, built under one roof.
          </p>
        </div>

        <ul data-stagger className="mt-14 border-t-2 border-ink lg:mt-20">
          {services.map((s, i) => {
            const isOpen = open === i;
            const Icon = s.icon;
            return (
              <li key={s.title} className="border-b-2 border-ink">
                <h3>
                  <button
                    type="button"
                    id={`service-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left lg:grid-cols-[auto_1.25fr_1fr_auto] lg:gap-8 lg:py-7"
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center border-2 border-ink transition-colors duration-300 lg:h-14 lg:w-14 ${
                        isOpen ? 'bg-sun' : 'group-hover:bg-sky'
                      }`}
                    >
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="font-display text-[clamp(1.5rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-1.5">
                      {s.title}
                    </span>
                    <span className="hidden text-slate lg:block">{s.summary}</span>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 border-ink transition-colors duration-300 ${
                        isOpen ? 'bg-ink text-sun' : 'group-hover:bg-ink group-hover:text-paper'
                      }`}
                    >
                      <Plus
                        className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`service-panel-${i}`}
                  role="region"
                  aria-labelledby={`service-button-${i}`}
                  ref={(el) => {
                    panels.current[i] = el;
                  }}
                  className="overflow-hidden"
                  style={i === 0 ? { height: 'auto' } : { height: 0, visibility: 'hidden' }}
                >
                  <div className="pb-9 pt-1 lg:pb-11 lg:pl-[5.5rem]">
                    <p data-item className="mb-5 text-slate lg:hidden">
                      {s.summary}
                    </p>
                    <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                      {s.items.map((item) => (
                        <li key={item} data-item className="flex items-start gap-3 text-[17px] font-medium">
                          <span aria-hidden="true" className="mt-[0.55em] h-2 w-2 shrink-0 bg-sky-deep" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div data-item className="mt-7">
                      <button
                        type="button"
                        onClick={() => discuss(s.enquiry)}
                        className="group/btn inline-flex items-center gap-2.5 bg-ink px-5 py-3 text-sm font-bold text-paper transition-colors duration-200 hover:bg-sun hover:text-ink"
                      >
                        Discuss {s.title}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
