import type { ReactNode } from 'react';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface LegalPageLayoutProps {
  eyebrow?: string;
  title: string;
  updated?: string;
  children: ReactNode;
}

/**
 * LegalPageLayout — shared shell for footer utility pages (policies, About,
 * Careers, Contact, Sitemap). Deliberately simple — a centered title block
 * over a plain cream background, then a prose column — rather than the
 * full photographic `PageHero`, since these pages have no hero photography
 * of their own and don't need the same visual weight as content pages.
 */
export default function LegalPageLayout({ eyebrow = 'Luxora Interiors', title, updated, children }: LegalPageLayoutProps) {
  return (
    <div style={{ background: luxoraColors.ivory }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-40 pb-24 md:pt-48 md:pb-32">
        <span className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5 block" style={{ color: luxoraColors.gold }}>
          {eyebrow}
        </span>
        <h1
          className="font-playfair font-normal leading-[1.1] tracking-[-0.02em] mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: luxoraColors.espresso }}
        >
          {title}
        </h1>
        {updated && (
          <p className="text-[13px] font-light mb-12" style={{ color: luxoraColors.mutedBeige }}>
            Last updated: {updated}
          </p>
        )}
        <div className="text-[15px] leading-[1.85] font-light" style={{ color: luxoraColors.softBrown }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-playfair text-[1.35rem] mb-3" style={{ color: luxoraColors.espresso }}>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: luxoraColors.gold }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
