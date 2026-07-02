'use client';

import { motion } from 'framer-motion';
import V4Navbar from '../V4Navbar';
import V4FooterSection from '../V4FooterSection';
import V4SmoothScroll from '../V4SmoothScroll';

export interface ServicePageShellProps {
  children: React.ReactNode;
}

/**
 * ServicePageShell — the chrome every service page shares with the
 * homepage: the same floating navbar, the same smooth-scroll behaviour,
 * the same page-mount fade-in, and the same footer. Mirrors the wrapper in
 * app/page.tsx exactly so service pages feel like a natural
 * extension of the homepage rather than a different site.
 */
export default function ServicePageShell({ children }: ServicePageShellProps) {
  return (
    <>
      <V4SmoothScroll />
      <motion.div
        style={{ minHeight: '100vh', backgroundColor: '#F5EFE6' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <V4Navbar />
        {children}
        <V4FooterSection />
      </motion.div>
    </>
  );
}
