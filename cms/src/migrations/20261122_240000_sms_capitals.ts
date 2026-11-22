import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: SMS is written in capitals everywhere ("SMS", "SMS:et",
// "SMS-fallback"), in every text of the site's globals and collections. Addresses, slugs and ids are
// left alone, and so is "sms" inside a slug-like word such as "rcs-fallback-sms". Collections are
// saved without a rebuild each, and one global save at the end starts the website build.
type Doc = Record<string, any>

const SKIP_KEYS = new Set(['id', 'slug', 'url', 'href', 'sourceId', 'createdAt', 'updatedAt', 'globalType'])
const SMS = /(?<![-/_.\p{L}\d])[Ss]ms(et|en|ets|ens|er|erna)?(?![\p{L}\d])/gu
const rename = (text: string) => text.replace(SMS, (_match, ending?: string) => (ending ? `SMS:${ending}` : 'SMS'))

/** The same value with SMS capitalised in every string, except under keys that hold addresses or ids. */
function renameDeep(value: unknown): unknown {
  if (typeof value === 'string') return rename(value)
  if (Array.isArray(value)) return value.map(renameDeep)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Doc).map(([key, child]) => [key, SKIP_KEYS.has(key) ? child : renameDeep(child)]))
  }
  return value
}

/** Only the top-level fields that changed, so nothing else is written. */
function changedFields(doc: Doc): Doc {
  const next = renameDeep(doc) as Doc
  return Object.fromEntries(Object.keys(next).filter((key) => !SKIP_KEYS.has(key) && JSON.stringify(next[key]) !== JSON.stringify(doc[key])).map((key) => [key, next[key]]))
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  let count = 0
  for (const collection of ['artiklar', 'begrepp', 'kallor', 'kundcase', 'webinarer'] as const) {
    const { docs } = await payload.find({ collection, depth: 0, limit: 0, pagination: false, req })
    for (const doc of docs as Doc[]) {
      const data = changedFields(doc)
      if (!Object.keys(data).length) continue
      await payload.update({ collection, id: doc.id, data: data as never, req, context: { skipRebuild: true } })
      count++
    }
  }
  // Payload merges `context` into the shared request; the global saves should start the build again.
  req.context = { ...req.context, skipRebuild: false }
  for (const slug of ['demo', 'priser', 'juridiskt', 'startsida'] as const) {
    const doc = (await payload.findGlobal({ slug, depth: 0, req })) as Doc
    const data = changedFields(doc)
    if (!Object.keys(data).length) continue
    await payload.updateGlobal({ slug, data: data as never, req })
    count++
  }
  payload.logger.info(`Migration: SMS written in capitals in ${count} documents.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier texts are in git history if they are ever needed.
}
