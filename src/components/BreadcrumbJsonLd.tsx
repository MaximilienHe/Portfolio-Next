// components/BreadcrumbJsonLd.tsx
export function BreadcrumbJsonLd({
    items,
  }: {
    items: { name: string; url: string }[];
  }) {
    const json = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    );
  }
  