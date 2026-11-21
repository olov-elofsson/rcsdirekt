import { postgresAdapter } from '@payloadcms/db-postgres'
import { gcsStorage } from '@payloadcms/storage-gcs'
import { en } from '@payloadcms/translations/languages/en'
import { sv } from '@payloadcms/translations/languages/sv'
import path from 'path'
import { buildConfig, type CollectionConfig, type GlobalConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Articles } from './collections/Articles'
import { CustomerCases } from './collections/CustomerCases'
import { Glossary } from './collections/Glossary'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Sources } from './collections/Sources'
import { Users } from './collections/Users'
import { Webinars } from './collections/Webinars'
import { Demo } from './globals/Demo'
import { Priser } from './globals/Priser'
import { Startsida } from './globals/Startsida'
import { rebuildAfterChange, rebuildAfterDelete, rebuildAfterGlobalChange } from './lib/rebuild'
import { createLead } from './lib/leads'
import { buildSiteContent } from './lib/siteContent'
import { migrations } from './migrations'
import { seedIfEmpty } from './seed/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Every content change starts a new build of the website.
const publishing = (collection: CollectionConfig): CollectionConfig => ({
  ...collection,
  hooks: {
    ...collection.hooks,
    afterChange: [...(collection.hooks?.afterChange ?? []), rebuildAfterChange],
    afterDelete: [...(collection.hooks?.afterDelete ?? []), rebuildAfterDelete],
  },
})
const publishingGlobal = (global: GlobalConfig): GlobalConfig => ({
  ...global,
  hooks: { ...global.hooks, afterChange: [...(global.hooks?.afterChange ?? []), rebuildAfterGlobalChange] },
})

// The CMS answers on cms.rcsdirekt.se and on its Cloud Run address. serverURL stays unset so the
// admin calls the API on whichever address it was opened from; both are trusted for cookie logins.
const trustedOrigins = [
  process.env.SERVER_URL,
  'https://cms.rcsdirekt.se',
  'https://rcsdirekt-cms-631487523529.europe-west1.run.app',
  'http://localhost:3000',
].filter((origin): origin is string => Boolean(origin))

export default buildConfig({
  csrf: trustedOrigins,
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' – RCS Direkt CMS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { sv, en }, fallbackLanguage: 'sv' },
  collections: [
    Users,
    publishing(Media),
    publishing(CustomerCases),
    publishing(Articles),
    publishing(Glossary),
    publishing(Sources),
    publishing(Webinars),
    Inquiries,
  ],
  globals: [publishingGlobal(Startsida), publishingGlobal(Priser), publishingGlobal(Demo)],
  endpoints: [
    {
      // Public: the website reads its content from here while it is being built.
      path: '/site-content',
      method: 'get',
      handler: async (req) => Response.json(await buildSiteContent(req.payload), { headers: { 'cache-control': 'no-store' } }),
    },
    { path: '/leads', method: 'post', handler: createLead },
  ],
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Production applies the committed migrations on start instead of pushing schema changes.
    push: process.env.NODE_ENV !== 'production',
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    gcsStorage({
      enabled: Boolean(process.env.GCS_BUCKET),
      bucket: process.env.GCS_BUCKET || '',
      options: { projectId: process.env.GOOGLE_CLOUD_PROJECT },
      collections: { media: { prefix: 'cms-media' } },
    }),
  ],
  onInit: async (payload) => {
    await seedIfEmpty(payload)
  },
})
