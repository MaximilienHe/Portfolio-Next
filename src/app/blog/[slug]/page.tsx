import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEntries, getEntry } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  return getAllEntries("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = getEntry("blog", params.slug);
    const canonical = post.canonical ?? `https://maximilienherr.fr/blog/${post.slug}`;
    const image = post.cover ?? "/banniere_dev_redac.png";

    return {
      title: post.title,
      description: post.description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        url: canonical,
        title: post.title,
        description: post.description,
        images: [{ url: image }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [image],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getEntry("blog", params.slug);
  } catch {
    notFound();
  }

  const content = await renderMdx(post.body);
  const canonical = post.canonical ?? `https://maximilienherr.fr/blog/${post.slug}`;
  const image = post.cover ?? "https://maximilienherr.fr/banniere_dev_redac.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: [image],
    author: { "@type": "Person", name: "Maximilien Herr", url: "https://maximilienherr.fr" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <main className="container">
      <article>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div>{content}</div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
