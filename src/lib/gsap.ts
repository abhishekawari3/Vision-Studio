import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs a GSAP setup scoped to `scope`, only while `query` matches. Reverts everything on cleanup. */
export function useMotion(scope: RefObject<Element | null>, setup: gsap.ContextFunc, query: string = MOTION_OK) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);
    mm.add(query, setup);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Shared scroll reveals for a section:
 *  [data-head]    – heading whose [data-line] children rise out of a mask
 *  [data-reveal]  – single block fades up
 *  [data-stagger] – direct children fade up one after another
 */
export function useSectionReveal(scope: RefObject<Element | null>) {
  useMotion(scope, () => {
    const q = gsap.utils.selector(scope);

    (q('[data-head]') as HTMLElement[]).forEach((head) => {
      gsap.from(head.querySelectorAll('[data-line]'), {
        yPercent: 115,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: head, start: 'clamp(top 86%)', once: true },
      });
    });

    (q('[data-reveal]') as HTMLElement[]).forEach((el) => {
      gsap.from(el, {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
      });
    });

    (q('[data-stagger]') as HTMLElement[]).forEach((group) => {
      gsap.from(group.children, {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'clamp(top 84%)', once: true },
      });
    });
  });
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : 1.1,
    ease: 'power3.inOut',
    overwrite: true,
    scrollTo: { y: el, offsetY: id === 'top' ? 0 : 60, autoKill: true },
  });
  if (window.history.replaceState) {
    window.history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`);
  }
}
