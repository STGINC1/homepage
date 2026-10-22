import { serializeJsonLd } from "@/lib/seo";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Structured data for search engines. Input is built from our own constants. */
export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
