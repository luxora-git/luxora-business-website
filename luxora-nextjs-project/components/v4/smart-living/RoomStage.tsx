'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ROOM_IMAGES, AC_RECT, CAMERA_RECT } from './constants';
import { useCoverMap } from './useCoverMap';
import type { SmartLivingState } from './types';

interface RoomStageProps {
  state: SmartLivingState;
  /** Fires once, after all four room renders have been preloaded and
   * decoded. Parents can use it to hold off letting the user toggle
   * curtain/TV before the crossfade has anything ready to animate. */
  onReady?: () => void;
}

const PREMIUM_EASE = 'power3.out';
const PREMIUM_EASE_INOUT = 'power3.inOut';
const CROSSFADE_DURATION = 0.9;
const CROSSFADE_EASE = 'power2.inOut';

/** One room render per (curtain × tv) combination — see ROOM_IMAGES. */
type RoomVariant = keyof typeof ROOM_IMAGES;
const VARIANTS = Object.keys(ROOM_IMAGES) as RoomVariant[];

function variantFor(state: SmartLivingState): RoomVariant {
  if (state.tv) return state.curtain ? 'tvOnCurtainClosed' : 'tvOnCurtainOpen';
  return state.curtain ? 'tvOffCurtainClosed' : 'tvOffCurtainOpen';
}

/**
 * The interactive room render — a fixed image state engine, not a
 * slideshow. All four photographs (one per curtain × tv combination) are
 * mounted ONCE and forever: their `src` is never reassigned, they are
 * never unmounted, and no image is ever fetched or decoded again after the
 * initial preload. Switching curtain/TV state only ever animates `opacity`
 * / `scale` (GPU-composited, no layout, no repaint) on the four
 * permanently-resident `<img>` layers via a single reusable GSAP timeline.
 * This is what keeps every transition — the 1st or the 500th — identical:
 * there is no decode, no reflow, no DOM churn left to cause the odd-numbered
 * "lag" a src-swapping approach produces.
 *
 * Everything else (lighting, AC airflow, security) is a CSS/GSAP overlay on
 * top, untouched by this rewrite. `useCoverMap` re-projects fixture rects
 * onto whatever slice of the 1344×768 photo is visible under
 * `object-cover`, so overlays stay pixel-aligned at any viewport width.
 */
export default function RoomStage({ state, onReady }: RoomStageProps) {
  const { containerRef: stageRef, mapRect } = useCoverMap<HTMLDivElement>();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Partial<Record<RoomVariant, HTMLImageElement>>>({});
  const sweepRef = useRef<HTMLDivElement>(null);
  const dimOverlayRef = useRef<HTMLDivElement>(null);
  const brightnessTargetRef = useRef<HTMLDivElement>(null);
  const acRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const armedBadgeRef = useRef<HTMLDivElement>(null);
  const pingRef = useRef<HTMLDivElement>(null);

  const activeVariant = useRef<RoomVariant>(variantFor(state));
  /** The single reusable timeline driving room crossfades. Killed and
   * rebuilt on every transition — never allowed to run two at once. */
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const readyRef = useRef(false);

  /* Preload + decode all four room renders before any transition is armed.
   * `data-active` (set once at first render, see JSX) paints the correct
   * layer immediately via plain CSS, so there is no flash while this is
   * still in flight — but no crossfade will animate until every image is
   * confirmed fully decoded and sitting in memory. */
  useEffect(() => {
    let cancelled = false;

    const decodeOne = (variant: RoomVariant) => {
      const el = layerRefs.current[variant];
      if (!el) return Promise.resolve();
      const whenLoaded = el.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            el.addEventListener('load', () => resolve(), { once: true });
            el.addEventListener('error', () => resolve(), { once: true });
          });
      return whenLoaded.then(() => el.decode().catch(() => {}));
    };

    Promise.all(VARIANTS.map(decodeOne)).then(() => {
      if (cancelled) return;
      readyRef.current = true;
      onReady?.();
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Subtle cinematic parallax on pointer move (Apple/Tesla configurator feel) ── */
  useEffect(() => {
    const stage = stageRef.current;
    const target = parallaxRef.current;
    if (!stage || !target) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(target, 'x', { duration: 0.9, ease: PREMIUM_EASE });
    const yTo = gsap.quickTo(target, 'y', { duration: 0.9, ease: PREMIUM_EASE });
    const rXTo = gsap.quickTo(target, 'rotationX', { duration: 0.9, ease: PREMIUM_EASE });
    const rYTo = gsap.quickTo(target, 'rotationY', { duration: 0.9, ease: PREMIUM_EASE });

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(px * -14);
      yTo(py * -10);
      rYTo(px * 2.2);
      rXTo(py * -1.6);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      rXTo(0);
      rYTo(0);
    };

    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  /* Room-state crossfade. Curtain and TV toggles both land here. Every
   * transition retargets ALL FOUR layers (not just the two involved) —
   * so if a new toggle interrupts one already in flight, whichever layer
   * was mid-fade gets a fresh target instead of being stranded at a
   * half-visible opacity. The previous timeline is always killed first,
   * so only one is ever running: no overlap, no stacked tweens. Only
   * `opacity`, `scale` and `zIndex` are touched — all GPU-composited,
   * nothing here forces layout or repaint. */
  useEffect(() => {
    const next = variantFor(state);
    if (next === activeVariant.current) return;
    activeVariant.current = next;

    if (!readyRef.current) {
      // Preload/decode hasn't finished yet — snap instantly rather than
      // animating a layer that may not have pixels ready to paint.
      VARIANTS.forEach((variant) => {
        const el = layerRefs.current[variant];
        if (!el) return;
        gsap.set(el, { opacity: variant === next ? 1 : 0, zIndex: variant === next ? 2 : 1, scale: 1 });
      });
      return;
    }

    timelineRef.current?.kill();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          timelineRef.current = null;
        },
      });
      timelineRef.current = tl;

      VARIANTS.forEach((variant) => {
        const el = layerRefs.current[variant];
        if (!el) return;
        const isNext = variant === next;
        gsap.set(el, { zIndex: isNext ? 2 : 1 });
        tl.to(el, { opacity: isNext ? 1 : 0, scale: isNext ? 1 : 1.01, duration: CROSSFADE_DURATION, ease: CROSSFADE_EASE }, 0);
      });

      tl.fromTo(
        sweepRef.current,
        { opacity: 0, x: '-30%' },
        { opacity: 0.5, x: '130%', duration: CROSSFADE_DURATION, ease: 'power1.inOut' },
        0
      ).to(sweepRef.current, { opacity: 0, duration: 0.25 }, '-=0.2');
    }, stageRef);

    return () => ctx.revert();
  }, [state.curtain, state.tv]);

  /* Light dim / restore — real brightness grade + soft overlay, not a flat shade */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(brightnessTargetRef.current, {
        filter: state.light ? 'brightness(1) saturate(1) contrast(1)' : 'brightness(0.52) saturate(0.75) contrast(1.05)',
        duration: 1.4,
        ease: PREMIUM_EASE_INOUT,
      });
      gsap.to(dimOverlayRef.current, {
        opacity: state.light ? 0 : 1,
        duration: 1.4,
        ease: PREMIUM_EASE_INOUT,
      });
    }, stageRef);
    return () => ctx.revert();
  }, [state.light]);

  /* AC airflow */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(acRef.current, { opacity: state.ac ? 1 : 0, duration: 1.1, ease: PREMIUM_EASE });
    }, stageRef);
    return () => ctx.revert();
  }, [state.ac]);

  /* Security arm / disarm — radar ping + glass badge */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(securityRef.current, { opacity: state.security ? 1 : 0, duration: 0.9, ease: PREMIUM_EASE });
      gsap.to(armedBadgeRef.current, {
        opacity: state.security ? 1 : 0,
        y: state.security ? 0 : -10,
        scale: state.security ? 1 : 0.94,
        duration: 0.7,
        ease: 'back.out(1.6)',
      });
      if (state.security) {
        gsap.fromTo(pingRef.current, { scale: 0.4, opacity: 0.8 }, { scale: 2.6, opacity: 0, duration: 1.8, ease: 'power2.out', repeat: -1 });
      } else {
        gsap.killTweensOf(pingRef.current);
      }
    }, stageRef);
    return () => ctx.revert();
  }, [state.security]);

  const ac = mapRect(AC_RECT);
  const camera = mapRect(CAMERA_RECT);

  return (
    <div
      ref={stageRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      <div ref={parallaxRef} className="absolute" style={{ inset: '-3%', transformStyle: 'preserve-3d' }}>
        {/* Brightness-graded image group — all four room renders live here
         * permanently. Opacity/scale/z-index are driven entirely by GSAP
         * (see the crossfade effect above); the only React-controlled prop
         * is `src`, and it's a per-variant constant that never changes, so
         * there is nothing for React to "fight" mid-animation. */}
        <div ref={brightnessTargetRef} className="absolute inset-0" style={{ filter: 'brightness(1) saturate(1) contrast(1)' }}>
          {VARIANTS.map((variant) => (
            <img
              key={variant}
              ref={(el) => {
                if (el) layerRefs.current[variant] = el;
              }}
              src={ROOM_IMAGES[variant]}
              alt={variant === 'tvOffCurtainOpen' ? 'Luxora smart living room' : ''}
              data-active={variant === activeVariant.current}
              className="v4-room-layer absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ willChange: 'opacity, transform' }}
              draggable={false}
            />
          ))}
        </div>

        {/* Curtain/TV-motion light sweep */}
        <div
          ref={sweepRef}
          className="absolute inset-y-0 pointer-events-none opacity-0"
          style={{
            width: '18%',
            background: 'linear-gradient(100deg, transparent, rgba(255,250,235,0.35), transparent)',
            filter: 'blur(6px)',
          }}
        />

        {/* Lights off — cool dim grade on top of the brightness shift */}
        <div
          ref={dimOverlayRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            background:
              'linear-gradient(rgba(6,9,18,0.22), rgba(6,9,18,0.22)), radial-gradient(ellipse 80% 60% at 50% 28%, rgba(18,26,44,0.28) 0%, rgba(5,8,16,0.62) 65%, rgba(2,4,9,0.78) 100%)',
          }}
        />

        {/* AC airflow overlay */}
        <div
          ref={acRef}
          className="absolute pointer-events-none opacity-0"
          style={{ left: `${ac.left - ac.width * 0.34}%`, top: `${ac.top}%`, width: `${ac.width * 1.68}%`, height: '50%' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1/2"
            style={{ background: 'radial-gradient(ellipse 75% 100% at 50% 0%, rgba(150,205,255,0.24) 0%, transparent 78%)' }}
          />
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 200" preserveAspectRatio="none">
            {[28, 50, 72].map((x, i) => (
              <path
                key={x}
                d={`M ${x} 4 C ${x - 6} 40, ${x + 10} 80, ${x - 4} 130 S ${x + 8} 190, ${x} 210`}
                fill="none"
                stroke="rgba(185,222,255,0.42)"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="v4-ac-stream"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </svg>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="v4-ac-particle absolute rounded-full"
              style={{
                left: `${14 + i * 16}%`,
                top: '6%',
                width: 4 + (i % 3),
                height: 4 + (i % 3),
                background: 'rgba(200,230,255,0.65)',
                filter: 'blur(1.2px)',
                animationDelay: `${i * 0.75}s`,
              }}
            />
          ))}
        </div>

        {/* Security overlay — scanning beam + camera indicator */}
        <div ref={securityRef} className="absolute inset-0 pointer-events-none opacity-0">
          <div className="absolute inset-0 v4-security-scan" />
          <div
            className="absolute"
            style={{
              left: `${camera.left + camera.width * 0.15}%`,
              top: `${camera.top + camera.height * 0.2}%`,
            }}
          >
            <div ref={pingRef} className="absolute -inset-2 rounded-full" style={{ border: '1.5px solid rgba(255,65,54,0.7)' }} />
            <span className="absolute rounded-full v4-camera-blink" style={{ width: 6, height: 6, background: '#FF4136', boxShadow: '0 0 8px 2px rgba(255,65,54,0.7)' }} />
          </div>
        </div>

        {/* ARMED badge — frosted glass */}
        <div
          ref={armedBadgeRef}
          className="absolute top-5 right-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full opacity-0 pointer-events-none"
          style={{ background: 'rgba(12,16,12,0.5)', backdropFilter: 'blur(10px) saturate(1.4)', WebkitBackdropFilter: 'blur(10px) saturate(1.4)', border: '1px solid rgba(255,90,80,0.4)', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full v4-camera-blink" style={{ background: '#FF4136' }} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/95">Armed</span>
        </div>

        {/* Cinematic vignette — permanent, subtle, adds depth like a graded still */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 45%, transparent 55%, rgba(10,7,4,0.22) 100%)' }}
        />
      </div>

      <style jsx>{`
        .v4-room-layer {
          opacity: 0;
          z-index: 1;
        }
        .v4-room-layer[data-active='true'] {
          opacity: 1;
          z-index: 2;
        }
        .v4-ac-particle {
          animation: v4AcDrift 4.5s ease-in-out infinite;
          opacity: 0;
        }
        @keyframes v4AcDrift {
          0% { transform: translate(0, 0); opacity: 0; }
          15% { opacity: 0.85; }
          80% { opacity: 0.15; }
          100% { transform: translate(6px, 220%); opacity: 0; }
        }
        .v4-ac-stream {
          stroke-dasharray: 10 14;
          animation: v4AcStream 2.6s linear infinite;
        }
        @keyframes v4AcStream {
          to { stroke-dashoffset: -48; }
        }
        .v4-security-scan {
          background: linear-gradient(180deg, rgba(255,60,50,0.14) 0%, transparent 12%);
          transform: translateY(-100%);
          animation: v4SecurityScan 4.4s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }
        @keyframes v4SecurityScan {
          0% { transform: translateY(-100%); opacity: 0; }
          8% { opacity: 0.85; }
          50% { transform: translateY(20%); opacity: 0.45; }
          92% { opacity: 0.85; }
          100% { transform: translateY(140%); opacity: 0; }
        }
        .v4-camera-blink {
          animation: v4CameraBlink 1.8s ease-in-out infinite;
        }
        @keyframes v4CameraBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .v4-ac-particle, .v4-ac-stream, .v4-security-scan, .v4-camera-blink {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
