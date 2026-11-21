import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: five sharper advantages and clearer section headings on
// the start page. Each text changes only if it still reads as before, so later edits in the CMS
// are kept.
type Doc = Record<string, any>

const OLD_TITLES = ['Knappar i meddelandet', 'Statistik i realtid', 'Betala per meddelande', 'En öppen standard', 'Verifierad avsändare']

const ADVANTAGES = [
  { icon: 'shield', title: 'Kunden ser att det är ni', copy: 'Företagsnamn, logotyp och en blå bock visas i stället för ett okänt nummer. Avsändaren kontrolleras innan den får skicka.' },
  { icon: 'pointer', title: 'Svar med ett tryck', copy: 'Kunden bekräftar, bokar om eller väljer ett alternativ direkt i meddelandet, och svaret kommer tillbaka till er.' },
  { icon: 'image', title: 'Visa vad det gäller', copy: 'Bilder, video och flera kort att svepa mellan i samma meddelande, så att kunden ser erbjudandet innan den klickar vidare.' },
  { icon: 'bar-chart', title: 'Ni ser vad som händer', copy: 'Rapporterna visar om meddelandet har kommit fram och lästs, och vilka knappar kunderna har tryckt på.' },
  { icon: 'message', title: 'Ingen ny app', copy: 'Meddelandet hamnar i telefonens vanliga meddelandeapp: Google Meddelanden på Android och Meddelanden på iPhone från iOS 18.' },
]

const HEADINGS: [section: string, from: string, to: string][] = [
  ['jamforelse', 'RCS och SMS sida vid sida', 'Det RCS kan som sms inte kan'],
  ['vagar', 'Från webben eller via API', 'Skicka från webben eller koppla in era system'],
  ['pris', 'Enkel prissättning', 'Betala per meddelande'],
  ['blogg', 'Kunskap och guider', 'Guider om RCS'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  if (!startsida.fordelar?.heading) {
    payload.logger.warn('Migration: no start page content yet, headings not changed.')
    return
  }
  const data: Doc = {}
  const titles = ((startsida.fordelar.items ?? []) as Doc[]).map((item) => item.title)
  if (titles.every((title) => OLD_TITLES.includes(title))) {
    data.fordelar = { ...startsida.fordelar, items: ADVANTAGES }
  }
  for (const [section, from, to] of HEADINGS) {
    if (startsida[section]?.heading === from) data[section] = { ...startsida[section], heading: to }
  }
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info('Migration: start page advantages and headings rewritten.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier texts are in git history if they are ever needed.
}
