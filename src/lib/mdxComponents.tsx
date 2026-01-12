import Image from "next/image";
import React from "react";

type ImageItem = { src: string; alt?: string; width?: number; height?: number };

export const mdxComponents = {
  Callout: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div
      style={{
        borderLeft: "4px solid #2563eb",
        background: "#f8fbff",
        padding: "12px 14px",
        borderRadius: "8px",
        fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
      }}
    >
      {title ? <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong> : null}
      <div>{children}</div>
    </div>
  ),
  CodeBlock: ({
    children,
    language,
  }: {
    children: React.ReactNode;
    language?: string;
  }) => (
    <pre
      style={{
        background: "#0f172a",
        color: "#e2e8f0",
        padding: "14px",
        borderRadius: "10px",
        overflowX: "auto",
        fontSize: "14px",
      }}
    >
      <code>{language ? `// ${language}\n` : ""}{children}</code>
    </pre>
  ),
  ImageCarousel: ({ images }: { images: ImageItem[] }) => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        overflowX: "auto",
        padding: "6px 2px 6px 0",
        scrollSnapType: "x mandatory",
      }}
    >
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          style={{
            minWidth: "260px",
            maxWidth: "320px",
            scrollSnapAlign: "start",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          {img.width && img.height ? (
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 90vw, 320px"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                fill
                sizes="(max-width: 768px) 90vw, 320px"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          )}
          {img.alt ? (
            <div style={{ padding: "8px", fontSize: "13px", color: "#334155" }}>{img.alt}</div>
          ) : null}
        </div>
      ))}
    </div>
  ),
  DroidsoftFeed: async () => {
    try {
      const res = await fetch("http://droidsoft.fr/wp-json", { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const name = data?.name ?? "DroidSoft";
      const description = data?.description ?? "Flux WordPress";
      const url = data?.url ?? "http://droidsoft.fr";

      return (
        <div
          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: 6 }}>{name}</div>
          <p style={{ margin: "0 0 8px 0", color: "#475569" }}>{description}</p>
          <a href={url} target="_blank" rel="noopener" style={{ color: "#2563eb" }}>
            {url}
          </a>
        </div>
      );
    } catch {
      return (
        <div
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px dashed #94a3b8",
            background: "#f8fafc",
            color: "#475569",
            fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
          }}
        >
          Impossible de contacter l\u2019API DroidSoft pour le moment.
        </div>
      );
    }
  },
};
