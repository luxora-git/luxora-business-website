'use client';

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export interface GalleryBottomFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Sticky action row at the bottom (typically "Clear All" + "Show Results"). */
  footer?: ReactNode;
}

/**
 * GalleryBottomFilterSheet — the generic mobile bottom-sheet shell used by
 * any Gallery filter/refine surface. Same fade+slide recipe as the site's
 * global ConsultationModal, kept consistent sitewide. Content is entirely
 * caller-supplied (`children`) — this component owns the chrome only.
 */
export default function GalleryBottomFilterSheet({ isOpen, onClose, title = 'Refine Designs', children, footer }: GalleryBottomFilterSheetProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[280] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(20,14,6,0.55)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
            style={{
              background: 'rgba(253,250,246,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,162,39,0.25)',
              boxShadow: '0 30px 90px rgba(20,14,6,0.35)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(44,31,20,0.08)]"
              style={{ color: luxoraColors.espresso }}
              aria-label="Close filters"
            >
              ✕
            </button>

            <div className="p-7 md:p-9">
              <h2 className="font-playfair text-2xl mb-6" style={{ color: luxoraColors.espresso }}>
                {title}
              </h2>

              {children}

              {footer && <div className="flex gap-3 pt-4">{footer}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
