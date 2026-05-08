import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: null,
  token: null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "blog",
        label: "Billets de blog",
        path: "content/blog",
        format: "mdx",
        defaultItem: () => ({
          date: new Date().toISOString(),
          draft: true,
          noindex: false,
        }),
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          {
            type: "string",
            name: "description",
            label: "Description (intro courte)",
            required: true,
            ui: { component: "textarea" },
          },
          { type: "string", name: "seoTitle", label: "Titre SEO" },
          {
            type: "string",
            name: "seoDescription",
            label: "Description SEO (~155 car.)",
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date de publication",
            required: true,
          },
          { type: "datetime", name: "updated", label: "Date de mise à jour" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "image", name: "cover", label: "Image de couverture" },
          { type: "string", name: "canonical", label: "URL canonique" },
          { type: "boolean", name: "draft", label: "Brouillon" },
          { type: "boolean", name: "noindex", label: "Exclure de l'index (noindex)" },
          {
            type: "object",
            name: "faq",
            label: "FAQ",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.question || "Nouvelle question",
              }),
            },
            fields: [
              { type: "string", name: "question", label: "Question" },
              {
                type: "string",
                name: "answer",
                label: "Réponse",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Corps du billet",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout (encadré)",
                fields: [
                  { type: "string", name: "title", label: "Titre" },
                  {
                    type: "rich-text",
                    name: "children",
                    label: "Contenu",
                  },
                ],
              },
              {
                name: "CodeBlock",
                label: "Bloc de code",
                fields: [
                  { type: "string", name: "language", label: "Langage" },
                  {
                    type: "string",
                    name: "children",
                    label: "Code",
                    ui: { component: "textarea" },
                  },
                ],
              },
              {
                name: "ImageCarousel",
                label: "Carrousel d'images",
                fields: [
                  {
                    type: "object",
                    name: "images",
                    label: "Images",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.alt || item?.src || "Nouvelle image",
                      }),
                    },
                    fields: [
                      { type: "image", name: "src", label: "Image", required: true },
                      { type: "string", name: "alt", label: "Texte alternatif" },
                      { type: "number", name: "width", label: "Largeur (px)" },
                      { type: "number", name: "height", label: "Hauteur (px)" },
                    ],
                  },
                ],
              },
              {
                name: "DroidsoftFeed",
                label: "Encart DroidSoft (flux WP)",
                fields: [
                  {
                    type: "string",
                    name: "_note",
                    label: "Info",
                    ui: {
                      component: () => null,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "projets",
        label: "Projets",
        path: "content/projets",
        format: "mdx",
        defaultItem: () => ({
          date: new Date().toISOString(),
          draft: false,
          noindex: false,
        }),
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: { component: "textarea" },
          },
          { type: "string", name: "seoTitle", label: "Titre SEO" },
          {
            type: "string",
            name: "seoDescription",
            label: "Description SEO",
            ui: { component: "textarea" },
          },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "datetime", name: "updated", label: "Mise à jour" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "image", name: "cover", label: "Cover" },
          { type: "string", name: "canonical", label: "URL canonique" },
          { type: "string", name: "logos", label: "Logos (chemins publics)", list: true },
          { type: "number", name: "priority", label: "Priorité (tri)" },
          { type: "boolean", name: "draft", label: "Brouillon" },
          { type: "boolean", name: "noindex", label: "Exclure de l'index (noindex)" },
          {
            type: "rich-text",
            name: "body",
            label: "Description longue",
            isBody: true,
          },
        ],
      },
    ],
  },
});
