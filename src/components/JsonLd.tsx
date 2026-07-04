export type JsonLdData = Record<string, unknown>;

/**
 * Renders one or more JSON-LD structured-data blocks as <script> tags.
 * `<` is escaped so a stray string value can never break out of the script.
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
