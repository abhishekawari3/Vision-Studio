import { useRef } from 'react';
import { gsap, useMotion } from '../lib/gsap';

const ALMOND = 'M52 200 Q200 78 348 200 Q200 322 52 200 Z';
const RING_TEXT = 'ARCHITECTURE ✦ AESTHETICS ✦ AUTONOMY ✦ ARCHITECTURE ✦ AESTHETICS ✦ AUTONOMY ✦ ';

/** The studio's eye: opens on load, blinks, and follows the pointer. */
export default function Eye() {
  const svg = useRef<SVGSVGElement>(null);

  useMotion(svg, () => {
    const q = gsap.utils.selector(svg);
    const iris = q('[data-iris]')[0] as Element;
    const lids = q('[data-lids]')[0] as Element;

    gsap.to(q('[data-ring-text]'), { rotation: 360, svgOrigin: '200 200', duration: 48, ease: 'none', repeat: -1 });
    gsap.to(q('[data-ring-ticks]'), { rotation: -360, svgOrigin: '200 200', duration: 110, ease: 'none', repeat: -1 });

    // Open, then blink every few seconds
    gsap.from(lids, { scaleY: 0.02, svgOrigin: '200 200', duration: 1, delay: 0.85, ease: 'expo.out' });
    gsap
      .timeline({ repeat: -1, repeatDelay: 4.4, delay: 3.4 })
      .to(lids, { scaleY: 0.04, svgOrigin: '200 200', duration: 0.09, ease: 'power2.in' })
      .to(lids, { scaleY: 1, svgOrigin: '200 200', duration: 0.24, ease: 'power2.out' });

    const xTo = gsap.quickTo(iris, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(iris, 'y', { duration: 0.55, ease: 'power3.out' });
    let lastMove = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !svg.current) return;
      lastMove = Date.now();
      const r = svg.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / 360);
      xTo((dx / dist) * 52 * reach);
      yTo((dy / dist) * 26 * reach);
    };

    // With no pointer around (touch, idle), the eye looks about on its own
    const wander = window.setInterval(() => {
      if (Date.now() - lastMove < 3500) return;
      xTo(gsap.utils.random(-46, 46));
      yTo(gsap.utils.random(-14, 14));
    }, 1900);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.clearInterval(wander);
    };
  });

  return (
    <svg ref={svg} viewBox="0 0 400 400" className="h-auto w-full" aria-hidden="true">
      <defs>
        <path id="eye-ring-path" d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0" />
        <clipPath id="eye-almond">
          <path d={ALMOND} />
        </clipPath>
      </defs>

      {/* blueprint guides */}
      <g className="stroke-sky" strokeWidth="1" opacity="0.35" fill="none">
        <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="3 7" />
        <line x1="0" y1="200" x2="400" y2="200" strokeDasharray="3 7" />
        <circle cx="200" cy="200" r="196" />
      </g>

      <g data-ring-ticks>
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          className="stroke-sky"
          strokeWidth="10"
          strokeDasharray="1.5 10.28"
          opacity="0.7"
        />
      </g>

      <g data-ring-text>
        <text className="fill-fog font-mono" fontSize="12.5" fontWeight="500" letterSpacing="3">
          <textPath href="#eye-ring-path" textLength="1100" lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </g>

      <g data-lids>
        <path d={ALMOND} className="fill-paper" />
        <g clipPath="url(#eye-almond)">
          <g data-iris>
            <circle cx="200" cy="200" r="68" className="fill-sun" />
            <circle
              cx="200"
              cy="200"
              r="50"
              fill="none"
              className="stroke-ink"
              strokeWidth="14"
              strokeDasharray="1.2 7.53"
              opacity="0.45"
            />
            <circle cx="200" cy="200" r="30" className="fill-ink" />
            <circle cx="187" cy="186" r="8.5" className="fill-paper" />
          </g>
        </g>
        <path d={ALMOND} fill="none" className="stroke-sky" strokeWidth="3" />
      </g>
    </svg>
  );
}
