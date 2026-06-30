import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * NOTIZIE — Prima Pagina.
 * Ogni file .md in src/content/news/ è una notizia.
 * Il corpo Markdown diventerà la pagina articolo completa.
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

/**
 * NIGHTLY — Highlights della notte (MVP + momenti chiave).
 * Un file per giornata di partite, nominato con la data (es. 2026-06-13.md).
 * Curato a mano finché non sblocchiamo le statistiche via API.
 */
const nightly = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nightly' }),
  schema: z.object({
    date: z.coerce.date(),
    mvp: z.object({
      name: z.string(),
      team: z.string(),
      pts: z.number(),
      reb: z.number(),
      ast: z.number(),
      image: z.string().optional(),
    }),
    highlights: z
      .array(
        z.object({
          label: z.string(),
          title: z.string(),
          description: z.string(),
        })
      )
      .max(3),
  }),
});

export const collections = { news, nightly };
