import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap, useMotion } from '../lib/gsap';
import { EMAIL, nav, socials } from '../lib/data';
import { AnchorLink, Logo } from './ui';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-wordmark]'), {
      yPercent: 70,
      ease: 'none',
      scrollTrigger: { trigger: q('[data-wordmark-mask]')[0], start: 'top bottom', end: 'max', scrub: 0.5 },
    });
  });

  return (
    <footer ref={root} className="overflow-hidden border-t border-line bg-ink text-white">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-display text-3xl font-extrabold leading-none tracking-[-0.03em]">
            Think Big. <span className="text-sun">Build Bold.</span>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-fog">
            An independent digital product engineering studio for startups, businesses and enterprises.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {[...nav, { id: 'why', label: 'Why VISION' }, { id: 'contact', label: 'Contact' }].map((item) => (
              <li key={item.id}>
                <AnchorLink to={item.id} className="font-semibold text-white transition-colors hover:text-sun">
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky">Reach us</h2>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-block font-semibold text-white underline decoration-sun decoration-2 underline-offset-4 transition-colors hover:text-sun"
          >
            {EMAIL}
          </a>
          <p className="mt-2 leading-relaxed text-fog">Sangamner, Ahilyanagar, Maharashtra, India 422605</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-white transition-colors hover:text-sun"
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-wordmark-mask className="wrap overflow-hidden" aria-hidden="true">
        <div data-wordmark className="flex justify-center">
          <Logo className="text-[min(27.5vw,26rem)] text-paper" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 font-mono text-xs text-fog">
          <p>© {new Date().getFullYear()} VISION Studio. All client code is client-owned.</p>
          <AnchorLink to="top" className="inline-flex items-center gap-2 text-white transition-colors hover:text-sun">
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </AnchorLink>
        </div>
      </div>
    </footer>
  );
}
