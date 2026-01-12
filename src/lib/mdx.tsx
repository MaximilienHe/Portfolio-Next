// src/lib/mdx.tsx
import type { ComponentType } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type RenderMdxOptions = {
  autolinkHeadings?: boolean;
  components?: Record<string, ComponentType<any>>;
};

export async function renderMdx(
  source: string,
  { autolinkHeadings = true, components }: RenderMdxOptions = {},
) {
  const rehypePlugins: any[] = [rehypeSlug];
  if (autolinkHeadings) {
    rehypePlugins.push([rehypeAutolinkHeadings, { behavior: "wrap" }]);
  }

  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins,
      },
    },
  });
  return content;
}
