import Image from 'next/image';
import Link from 'next/link';
import EstimatorProgressBar from './EstimatorProgressBar';

/**
 * EstimatorHeader — minimal wayfinding header for the guided estimator
 * flow. Visual language (floating glass capsule, logo treatment) borrowed
 * from V4Navbar, deliberately stripped of marketing nav links and the
 * mega-menu — this is a task flow, not a browsing surface. Carries the
 * milestone progress indicator (Phase 3).
 */
export default function EstimatorHeader() {
  return (
    <header className="sticky top-0 z-[65] flex justify-center pt-4 px-4">
      <div
        className="inline-flex items-center gap-5 sm:gap-8 h-[58px] px-5 sm:px-6 rounded-full max-w-full"
        style={{
          background: 'rgba(244,239,232,0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Link href="/" className="flex-shrink-0" style={{ width: '100px' }}>
          <Image
            src="/logo.png"
            alt="Luxora"
            width={120}
            height={32}
            style={{ height: 'auto', width: 'auto', maxWidth: '100px', maxHeight: '28px' }}
          />
        </Link>
        <EstimatorProgressBar />
      </div>
    </header>
  );
}
