import { useCallback, useEffect, useRef, useState } from 'react';
import { ROOM_IMAGE_ASPECT_RATIO } from './constants';

export interface OverlayRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * The room render is shown with `object-fit: cover`, so depending on the
 * container's aspect ratio, either the top/bottom or the left/right of the
 * 1344×768 photo gets cropped out of view. Overlay rects are authored as
 * percentages of the FULL photo — this hook re-projects them onto whatever
 * slice of the photo is actually visible, so fixtures (TV, AC, camera) stay
 * pixel-aligned at any viewport width, not just the one they were measured
 * against.
 */
export function useCoverMap<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [visible, setVisible] = useState({ left: 0, top: 0, width: 100, height: 100 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recompute = () => {
      const { clientWidth: cw, clientHeight: ch } = el;
      if (!cw || !ch) return;
      const containerAspect = cw / ch;
      const imageAspect = ROOM_IMAGE_ASPECT_RATIO;

      if (containerAspect > imageAspect) {
        // Container relatively wider than the photo — crop top & bottom.
        const visibleHeightFraction = imageAspect / containerAspect;
        setVisible({ left: 0, width: 100, top: (1 - visibleHeightFraction) * 50, height: visibleHeightFraction * 100 });
      } else {
        // Container relatively narrower/taller than the photo — crop sides.
        const visibleWidthFraction = containerAspect / imageAspect;
        setVisible({ top: 0, height: 100, left: (1 - visibleWidthFraction) * 50, width: visibleWidthFraction * 100 });
      }
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mapRect = useCallback(
    (rect: OverlayRect): OverlayRect => ({
      left: ((rect.left - visible.left) / visible.width) * 100,
      top: ((rect.top - visible.top) / visible.height) * 100,
      width: (rect.width / visible.width) * 100,
      height: (rect.height / visible.height) * 100,
    }),
    [visible]
  );

  return { containerRef, mapRect };
}
