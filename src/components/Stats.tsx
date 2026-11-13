import { useRef } from 'react';
import { gsap, useMotion } from '../lib/gsap';
import { stats } from '../lib/data';

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const q = gsap.utils.selector(root);
    const st = () => ({ trigger: root.current, start: 'top 80%', once: true });

    (q('[data-count]') as HTMLElement[]).forEach((el, i) => {
      const end = Number(el.dataset.count);
      const counter = { v: 0 };
      el.textContent = '0';
      gsap.to(counter, {
        v: end,
        duration: 1.9,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: st(),
        onUpdate: () => {
          el.textContent = String(Math.round(counter.v));
        },
      });
    });

    gsap.from(q('[data-stat]'), { y: 44, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: st() });

    return () => {
      (q('[data-count]') as HTMLElement[]).forEach((el) => {
        el.textContent = el.dataset.count ?? '';
      });
    };
  });

  return (
    <section ref={root} aria-label="Studio statistics" className="border-y-2 border-ink bg-sky text-ink">
      <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-stat
            className={`flex flex-col-reverse justify-end gap-3 py-10 lg:py-16 ${
              i % 2 === 1 ? 'border-l-2 border-ink pl-5 sm:pl-8' : 'pr-5 sm:pr-8'
            } ${i > 1 ? 'border-t-2 border-ink lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l-2 lg:pl-8' : ''}`}
          >
            <dt className="max-w-[14rem] font-mono text-[11px] font-medium uppercase leading-snug tracking-[0.14em] sm:text-xs">
              {s.label}
            </dt>
            <dd className="font-display text-[clamp(3.25rem,8.4vw,6rem)] lg:text-[clamp(4rem,7vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em]">
              <span data-count={s.value}>{s.value}</span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
