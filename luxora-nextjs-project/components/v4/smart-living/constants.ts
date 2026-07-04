import type { SceneKey, SmartLivingState } from './types';

/** Native render resolution (1344×768). The overlay rects below are
 *  calibrated as percentages of THIS raw image, not of the stage element —
 *  the stage can be any aspect ratio (it fills its container edge-to-edge
 *  with object-cover), and `useCoverMap` re-projects these rects onto
 *  whatever crop is actually visible, so alignment holds at any viewport. */
export const ROOM_IMAGE_ASPECT_RATIO = 1344 / 768;

/** Four room renders — one per (curtain × tv) combination. The TV state is
 *  baked into the photograph itself (not drawn as an overlay), so switching
 *  it on/off is a straight crossfade between renders, exactly like curtains. */
export const ROOM_IMAGES = {
  tvOffCurtainOpen: '/img/smart-living/tv-close-curtain-open.webp',
  tvOffCurtainClosed: '/img/smart-living/tv-close-curtain-close.webp',
  tvOnCurtainOpen: '/img/smart-living/room-open-curtain.webp',
  tvOnCurtainClosed: '/img/smart-living/room-closed-curtain.webp',
} as const;

/** Overlay hit-rects, calibrated by pixel-cropping the source render
 *  (values are percentages of the full 1344×768 photo). */
export const AC_RECT = { left: 44.8, top: 26, width: 14.7, height: 11.5 };
export const CAMERA_RECT = { left: 90.8, top: 22.6, width: 4, height: 6.5 };

export const scenePresets: Record<SceneKey, Partial<SmartLivingState>> = {
  morning: { light: true, curtain: false, tv: false, ac: false, security: false },
  work: { light: false, curtain: true, tv: false, ac: false, security: true },
  movie: { light: false, curtain: true, tv: true, ac: true, security: false },
  sleep: { light: false, curtain: false, tv: false, ac: true, security: false },
};

export const toastCopy = {
  device: {
    light: { on: 'Ambient lighting activated', off: 'Lights turned off' },
    curtain: { on: 'Curtains drawn — privacy mode', off: 'Curtains opened — natural light entering' },
    tv: { on: 'Entertainment mode ready', off: 'TV turned off' },
    ac: { on: 'Climate control active — cooling to 24°C', off: 'AC turned off' },
    security: { on: 'Home secured — system armed', off: 'Security disarmed' },
  },
  scene: {
    morning: 'Good Morning — natural daylight activated',
    work: 'Focus Mode — privacy & security engaged',
    movie: 'Cinema Experience — room optimized for viewing',
    sleep: 'Sleep Comfort — room prepared for rest',
  },
} as const;
