import Script from 'next/script';

/**
 * GA4 measurement ID for luxora.in.
 *
 * This is a public identifier — it ships to the browser inside the tag itself,
 * so it lives in source rather than an env var. (The project has no
 * NEXT_PUBLIC_* configuration to slot it into, and an env var that silently
 * goes missing on Vercel would drop analytics without any build error.)
 */
const GA_MEASUREMENT_ID = 'G-7XMCC0HDJG';

/**
 * GoogleAnalytics — the GA4 gtag.js tag, rendered once from the root layout so
 * every route in the app is covered without per-page wiring.
 *
 * Strategy: `afterInteractive`, not `beforeInteractive`. Google's own snippet
 * says "immediately after <head>", but in the App Router a raw <script> in the
 * head causes a hydration mismatch, and `beforeInteractive` blocks hydration
 * for a script that does not need to run that early. `afterInteractive` is what
 * the Next.js docs and `@next/third-parties` both use for GA — the initial
 * page_view still fires correctly.
 *
 * Development is excluded so localhost traffic never reaches the property.
 * Remove the NODE_ENV guard if you need to verify the tag under `npm run dev`.
 */
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
