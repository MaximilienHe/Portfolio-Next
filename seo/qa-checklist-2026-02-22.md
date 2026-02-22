# SEO QA Checklist - 2026-02-22

## Done in repo

- [x] Metadata centralized through `src/lib/seo.ts`
- [x] Canonical fallback redirects via `middleware.ts`
- [x] Robots and sitemap aligned with canonical base URL
- [x] H1 count fixed on `/contact` and `/nr`
- [x] Content rewritten on targeted low-score pages
- [x] Heavy assets converted to WebP and references updated
- [x] Disavow candidate file generated
- [x] Automated local check script added (`npm run seo:check`)

## To validate in environment (Traefik + Cloudflare Tunnel)

- [ ] `http://maximilienherr.fr` => `301` -> `https://maximilienherr.fr/`
- [ ] `http://www.maximilienherr.fr` => `301` -> `https://maximilienherr.fr/`
- [ ] `https://www.maximilienherr.fr` => `301` -> `https://maximilienherr.fr/`
- [ ] No redirect loop through tunnel/proxy chain
- [ ] Search Console coverage and canonical reports stable
- [ ] Crawl report rerun and compared with 2026-02-21 baseline
