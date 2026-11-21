# rcsdirekt CMS

Payload CMS for rcsdirekt.se. Editors log in at https://cms.rcsdirekt.se/admin.

- Content: start page, pricing page, interactive demo, customer cases, and the knowledge base
  (articles, sources, glossary). Images are stored in Cloud Storage (bucket `rcsdirekt-videos`,
  folder `cms-media/`) and shown on the site under `/media/<file>`.
- Publishing: every save starts a new build of the website (Cloud Build trigger in
  `SITE_BUILD_TRIGGER`). The build downloads `/api/site-content` into `src/content/content.json`.
  Changes are live after the build, usually within a few minutes.
- Database: Cloud SQL for PostgreSQL. Schema changes are migrations in `src/migrations`,
  applied automatically on start. After changing a collection, run
  `npx payload migrate:create <name>` against a local database and commit the result.
- First start on an empty database imports `src/seed/content.json` (the site content from before
  the CMS existed).

Environment: `DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL`, `GCS_BUCKET`, `GOOGLE_CLOUD_PROJECT`,
`SITE_BUILD_TRIGGER`, `SEED_ASSET_BASE_URL`, `FIRST_USER_EMAILS`.

Local: start Postgres, set `DATABASE_URL` and `PAYLOAD_SECRET`, then `npm install && npm run dev`.
