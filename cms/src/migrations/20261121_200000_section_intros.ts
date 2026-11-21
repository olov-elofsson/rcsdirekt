import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: section intros on the start page that no longer repeat
// their heading or each other. Each intro changes only if it still reads as before, so later
// edits in the CMS are kept.
type Doc = Record<string, any>

const INTROS: [section: string, from: string, to: string][] = [
  [
    'fordelar',
    'Mottagaren kan klicka, boka eller svara direkt i meddelandet, och i statistiken ser ni vad som hände efter utskicket.',
    'Det här blir enklare för både er och kunden när meddelandet skickas som RCS.',
  ],
  [
    'jamforelse',
    'Båda hamnar i kundens meddelandeapp och betalas per meddelande. Skillnaden är vad som ryms i varje meddelande.',
    'Båda hamnar i kundens meddelandeapp och kostar per meddelande. Med RCS får meddelandet också avsändarprofil, bilder och knappar.',
  ],
  [
    'vagar',
    'Båda vägarna använder samma RCS-nätverk, samma avsändare och samma pris per meddelande. Skillnaden är vem som bygger meddelandet, ni eller era system.',
    'Webbverktyget och API:t skickar från samma avsändare och till samma pris. Välj det som passar hur ni arbetar.',
  ],
  [
    'pris',
    'Ni betalar per meddelande. Det finns ingen startavgift och ingen bindningstid.',
    'Priset beror på meddelandetyp och mottagarens operatör. Det finns ingen startavgift eller bindningstid.',
  ],
  [
    'blogg',
    'Guider och förklaringar om RCS, från grunderna till API och webhooks. Artiklarna är på svenska och anger sina källor.',
    'Från grunderna till API och webhooks. Artiklarna är på svenska och anger sina källor.',
  ],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  if (!startsida.fordelar?.heading) {
    payload.logger.warn('Migration: no start page content yet, intros not changed.')
    return
  }
  const data: Doc = {}
  for (const [section, from, to] of INTROS) {
    if (startsida[section]?.intro === from) data[section] = { ...startsida[section], intro: to }
  }
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info('Migration: start page section intros rewritten.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier texts are in git history if they are ever needed.
}
