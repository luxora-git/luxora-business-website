/**
 * Renders one or more JSON-LD documents as <script type="application/ld+json">.
 * Server-safe (no 'use client'); usable from any server component/page.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const docs = Array.isArray(data) ? data : [data];
  return (
    <>
      {docs.map((doc, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doc) }}
        />
      ))}
    </>
  );
}
