import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { triggerSiteRebuild } from '../lib/rebuild'

// Content change: the blog keeps the ten most important articles plus news. Every other article
// stays in the CMS but is hidden on the site, and its old address leads to the closest kept
// article (chosen by subject words in the address, else by topic). Nothing is deleted.
const KEEP = [
  'vad-ar-rcs',
  'rcs-vs-sms',
  'rcs-for-foretag',
  'rcs-basic-single-conversation',
  'vad-kostar-rcs',
  'verifierad-avsandare',
  'rcs-sverige-operatorer',
  'rcs-pa-iphone',
  'rcs-api-webhooks',
  'rcs-gdpr-samtycke',
]
const NEWS = ['svenska-operatorer-oppnar-rcs-pa-iphone']

/** Subject words in an address, checked in order, and the kept article they lead to. */
const BY_WORD: [RegExp, string][] = [
  [/iphone|ios|apple/, 'rcs-pa-iphone'],
  [/pris|kostnad|kostar|debiter|faktur|budget|roi/, 'vad-kostar-rcs'],
  [/gdpr|samtycke|personuppgift|lag|invandning|avregistr|dataminim|lagring|kansliga|integritet/, 'rcs-gdpr-samtycke'],
  [/avsandare|agent|verifier|varumarke|logotyp|profil/, 'verifierad-avsandare'],
  [/api|webhook|handelse|integration|nyckel|kapabilitet|fallback|logg|status|tekni|server/, 'rcs-api-webhooks'],
  [/operator|telia|tele2|telenor|tre|comviq|hallon|android|tackning|rackvidd/, 'rcs-sverige-operatorer'],
  [/sms/, 'rcs-vs-sms'],
  [/basic|single|conversation|kort|karusell|knapp|forslag|bild|video|meddelande/, 'rcs-basic-single-conversation'],
]
const BY_TOPIC: Record<string, string> = {
  Grunder: 'vad-ar-rcs',
  Begrepp: 'vad-ar-rcs',
  Företag: 'rcs-for-foretag',
  Meddelandedesign: 'rcs-basic-single-conversation',
  Teknik: 'rcs-api-webhooks',
  'Mobil & operatörer': 'rcs-sverige-operatorer',
}
const replacementFor = (slug: string, category: string) =>
  BY_WORD.find(([pattern]) => pattern.test(slug))?.[1] ?? BY_TOPIC[category] ?? 'vad-ar-rcs'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({ collection: 'artiklar', depth: 0, limit: 0, pagination: false, req })
  const idOf = new Map(docs.map((doc) => [String((doc as Record<string, any>).slug), doc.id]))
  if (!KEEP.every((slug) => idOf.has(slug))) {
    payload.logger.warn(`Migration: kept articles missing (${KEEP.filter((slug) => !idOf.has(slug)).join(', ')}); blog not changed.`)
    return
  }
  let hidden = 0
  for (const doc of docs as Record<string, any>[]) {
    const slug = String(doc.slug)
    const data: Record<string, unknown> = NEWS.includes(slug)
      ? { category: 'Nyheter', archived: false }
      : KEEP.includes(slug)
        ? { archived: false }
        : { archived: true, replacedBy: idOf.get(replacementFor(slug, String(doc.category))) }
    if (data.archived) hidden++
    await payload.update({ collection: 'artiklar', id: doc.id, data: data as never, req, context: { skipRebuild: true } })
  }
  // The start page shows three picks; they must be articles that are still shown.
  const picks = [...NEWS, 'vad-ar-rcs', 'rcs-for-foretag'].map((slug) => idOf.get(slug)).filter(Boolean)
  if (req.context) req.context.skipRebuild = false
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  await payload.updateGlobal({ slug: 'startsida', req, data: { blogg: { ...startsida.blogg, picks } } as never })
  payload.logger.info(`Migration: blog keeps ${docs.length - hidden} articles, ${hidden} hidden with redirects.`)
  await triggerSiteRebuild(req, 'bloggen bantad till de viktigaste artiklarna')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: untick "Dold på sajten" in the CMS to show an article again.
}
