// src/components/Breadcrumb.tsx
import Link from "next/link";

type BreadcrumbItem = { name: string; url: string };

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} className="breadcrumb-item">
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.url}>{item.name}</Link>
                    <span className="breadcrumb-sep" aria-hidden="true">
                      ›
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}