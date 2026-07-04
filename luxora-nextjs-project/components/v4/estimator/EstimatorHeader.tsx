import Image from 'next/image';
import Link from 'next/link';

/**
 * EstimatorHeader — minimal wayfinding header for the guided estimator
 * flow. Visual language (floating glass capsule, logo treatment) borrowed
 * from V4Navbar, deliberately stripped of marketing nav links and the
 * mega-menu — this is a task flow, not a browsing surface.
 *
 * TODO (later phase): render the real step/progress indicator here once
 * EstimatorProgressBar exists (see Component Reuse Matrix §A).
 */
export default function EstimatorHeader() {
  return (
    <header className="sticky top-0 z-[65] flex justify-center pt-4">
      <div
        className="inline-flex items-center gap-6 h-[58px] px-6 rounded-full"
        style={{
          background: 'rgba(244,239,232,0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Link href="/" className="flex-shrink-0" style={{ width: '120px' }}>
          <Image
            src="/logo.png"
            alt="Luxora"
            width={120}
            height={32}
            style={{ height: 'auto', width: 'auto', maxWidth: '100px', maxHeight: '28px' }}
          />
        </Link>
        {/* TODO (later phase): EstimatorProgressBar / milestone label renders here */}
      </div>
    </header>
  );
}
