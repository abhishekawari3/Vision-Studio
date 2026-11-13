import { useRef } from 'react';
import { gsap, ScrollTrigger, useMotion } from '../lib/gsap';
import { services } from '../lib/data';

/** Service ticker. Speeds up and flips direction with the scroll. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useMotion(root, () => {
    const loop = gsap.to(track.current, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 });
    // start far along so the loop can also play backwards
    loop.totalTime(34 * 500);

    let settle: gsap.core.Tween | undefined;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 450);
        settle?.kill();
        loop.timeScale(self.direction * boost);
        settle = gsap.to(loop, { timeScale: self.direction, duration: 0.9, ease: 'power2.out' });
      },
    });
  });

  return (
    <div ref={root} className="overflow-hidden border-y-2 border-ink bg-sun py-3.5 text-ink" aria-hidden="true">
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {services.map((s) => (
              <li
                key={s.title}
                className="flex items-center gap-7 pr-7 font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-[1.75rem]"
              >
                {s.title}
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
                  <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="12" cy="12" r="3.2" fill="currentColor" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
