import type { Metadata } from "next";

export const CANONICAL_PROTOCOL = "https";
export const CANONICAL_HOST = "maximilienherr.fr";
export const SITE_URL = `${CANONICAL_PROTOCOL}://${CANONICAL_HOST}`;
export const SITE_NAME = "Maximilien Herr";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/banniere_dev_redac.png`;

function normalizePath(pathname: string): string {
  const raw = pathname.trim();
  if (!raw || raw === "/") return "/";

  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/");
}

export function getCanonicalUrl(pathname: string): string {
  return `${SITE_URL}${normalizePath(pathname)}`;
}

type BuildPageMetadataInput = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  robots?: Metadata["robots"];
  locale?: string;
  extraAlternates?: Omit<NonNullable<Metadata["alternates"]>, "canonical">;
};

export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(input.path);
  const image = input.image ?? DEFAULT_OG_IMAGE;
  const ogTitle = input.ogTitle ?? `${input.title} | ${SITE_NAME}`;
  const ogDescription = input.ogDescription ?? input.description;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
      ...(input.extraAlternates ?? {}),
    },
    openGraph: {
      type: input.type ?? "website",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: SITE_NAME,
      locale: input.locale ?? "fr_FR",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.imageAlt ?? `Aperçu ${ogTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    robots: input.robots ?? { index: true, follow: true },
    keywords: input.keywords,
  };
}
