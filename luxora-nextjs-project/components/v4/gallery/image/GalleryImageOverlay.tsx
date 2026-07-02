export type GalleryImageOverlayVariant = 'bottom' | 'bottom-strong' | 'top' | 'none';

export interface GalleryImageOverlayProps {
  variant?: GalleryImageOverlayVariant;
  className?: string;
}

const GRADIENTS: Record<Exclude<GalleryImageOverlayVariant, 'none'>, string> = {
  bottom: 'linear-gradient(to top, rgba(20,14,6,0.78) 0%, rgba(20,14,6,0.10) 50%, transparent 100%)',
  'bottom-strong': 'linear-gradient(180deg, rgba(20,14,6,0.04) 0%, rgba(20,14,6,0.22) 50%, rgba(20,14,6,0.84) 100%)',
  top: 'linear-gradient(to bottom, rgba(20,14,6,0.48) 0%, transparent 45%)',
};

/**
 * GalleryImageOverlay — the one gradient-overlay primitive used wherever
 * text sits directly on a photograph (Visual Language Guide §3.4). Always
 * the same warm dark-gradient family; only direction/strength varies.
 * Editorial Cards (text beside, not on, the image) never render this.
 */
export default function GalleryImageOverlay({ variant = 'bottom', className = '' }: GalleryImageOverlayProps) {
  if (variant === 'none') return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ background: GRADIENTS[variant] }}
    />
  );
}
