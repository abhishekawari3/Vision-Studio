import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { scrollToId } from '../lib/gsap';

type AnchorLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  onNavigate?: () => void;
};

/** In-page link that glides to a section with GSAP instead of jumping. */
export function AnchorLink({ to, onNavigate, children, ...rest }: AnchorLinkProps) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        scrollToId(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Heading lines wrapped in masks so GSAP can slide each one up into view. */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <span data-line className="block">
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

/** VISION wordmark – the O is the studio's eye. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="VISION"
      className={`inline-flex items-center font-display font-extrabold leading-none tracking-[-0.02em] ${className}`}
    >
      <span aria-hidden="true">VISI</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-[0.05em] h-[0.76em] w-[0.76em] shrink-0">
        <circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" strokeWidth="4.2" />
        <circle cx="12" cy="12" r="3.3" className="fill-sun" />
      </svg>
      <span aria-hidden="true">N</span>
    </span>
  );
}

export const btnPrimary =
  'group/btn inline-flex items-center justify-center gap-2.5 bg-sun px-6 py-3.5 text-[15px] font-bold text-ink transition-colors duration-200 hover:bg-white';

export const btnGhost =
  'group/btn inline-flex items-center justify-center gap-2.5 border-2 border-white/25 px-6 py-3 text-[15px] font-bold text-white transition-colors duration-200 hover:border-sky hover:text-sky';
