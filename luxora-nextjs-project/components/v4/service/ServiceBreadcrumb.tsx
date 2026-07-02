import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import type { ServiceBreadcrumbItem } from '@/lib/content/services/types';

export interface ServiceBreadcrumbProps {
  items: ServiceBreadcrumbItem[];
  /** Set true when rendered over a dark image (Hero). Defaults to true. */
  light?: boolean;
}

/**
 * ServiceBreadcrumb — tiny wayfinding row used at the top of every service
 * page Hero. Shared across all future service pages.
 */
export default function ServiceBreadcrumb({ items, light = true }: ServiceBreadcrumbProps) {
  const mutedColor = light ? 'rgba(253,250,246,0.48)' : '#9C7B68';
  const currentColor = light ? luxoraColors.gold : '#2C1F14';

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.16em]"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-3">
            {item.href && !isLast ? (
              <a href={item.href} className="hover:underline transition-colors duration-300" style={{ color: mutedColor }}>
                {item.label}
              </a>
            ) : (
              <span className="font-semibold" style={{ color: isLast ? currentColor : mutedColor }}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <span aria-hidden="true" className="text-[6px]" style={{ color: 'rgba(201,162,39,0.55)' }}>
                ●
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
