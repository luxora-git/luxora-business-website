'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PremiumLightbox from './PremiumLightbox';
import type { OpenLightboxOptions } from './types';

interface LightboxContextValue {
  open: (options: OpenLightboxOptions) => void;
  close: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * LightboxProvider — mounted once in the root layout (alongside
 * `ConsultationModalProvider`) so every page shares the exact same
 * `PremiumLightbox` instance. Call `useLightbox().open({ images, panel })`
 * from anywhere to trigger it — there is never more than one lightbox
 * implementation on the site.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<OpenLightboxOptions | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = useCallback((next: OpenLightboxOptions) => {
    setOptions(next);
    setActiveIndex(next.initialIndex ?? 0);
  }, []);
  const close = useCallback(() => setOptions(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {options && (
        <PremiumLightbox
          images={options.images}
          panel={options.panel}
          activeIndex={activeIndex}
          onNavigate={setActiveIndex}
          onClose={close}
        />
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return ctx;
}
