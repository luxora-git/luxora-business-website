import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export type GalleryButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text';
export type GalleryButtonSize = 'sm' | 'md' | 'lg';

interface GalleryButtonBaseProps {
  variant?: GalleryButtonVariant;
  size?: GalleryButtonSize;
  icon?: ReactNode;
  iconPosition?: 'leading' | 'trailing';
  children: ReactNode;
  className?: string;
}

export type GalleryButtonProps =
  | (GalleryButtonBaseProps & { href: string; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>)
  | (GalleryButtonBaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>);

const SIZE_PADDING: Record<GalleryButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[10.5px]',
  md: 'px-8 py-3.5 text-[11px]',
  lg: 'px-11 py-5 text-[13px]',
};

function variantStyle(variant: GalleryButtonVariant): CSSProperties {
  switch (variant) {
    case 'primary':
      return { background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 8px 28px rgba(201,162,39,0.28)' };
    case 'secondary':
      return { border: '1.5px solid rgba(44,31,20,0.18)', color: luxoraColors.espresso, background: 'transparent' };
    case 'ghost':
      return { border: '1.5px solid rgba(201,162,39,0.35)', color: luxoraColors.espresso, background: '#FDFAF6' };
    case 'text':
      return { color: luxoraColors.gold, background: 'transparent', padding: 0 };
  }
}

/**
 * GalleryButton — the one button primitive every Gallery surface renders
 * through (primary CTA, secondary outline, ghost utility action, or a plain
 * text link). Renders an `<a>`/`next/link` when `href` is passed, otherwise
 * a native `<button>` — same visual language either way.
 */
export default function GalleryButton({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'trailing',
  children,
  className = '',
  href,
  ...rest
}: GalleryButtonProps) {
  const isText = variant === 'text';
  const sizing = isText ? '' : SIZE_PADDING[size];
  const base = `inline-flex items-center justify-center gap-2.5 ${isText ? '' : 'rounded-full'} font-bold tracking-[0.10em] uppercase transition-all duration-300 ${isText ? 'hover:gap-3' : 'hover:-translate-y-0.5'} ${sizing} ${className}`;
  const style = variantStyle(variant);
  const content = (
    <>
      {icon && iconPosition === 'leading' && icon}
      {children}
      {icon && iconPosition === 'trailing' && icon}
    </>
  );

  if (href) {
    const { external, ...anchorRest } = rest as { external?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base} style={style} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={base} style={style} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={base} style={style} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
