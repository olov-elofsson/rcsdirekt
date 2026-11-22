import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: short, standard headings for the homepage sections and
// intros in a plainer, more relaxed voice. A field changes only if it still reads as before,
// so text edited in the CMS is kept.
const CHANGES: [group: string, field: string, from: string, to: string][] = [
  [
    'hero',
    'description',
    'Med RCS kommer utskicket med ert namn, er logotyp, bilder och knappar i kundens vanliga meddelandeapp. Skicka från webben eller via API och betala per meddelande.',
    'RCS är nästa steg efter sms. Utskicket kommer med ert namn och er logga, och kunden ser bilder och trycker på knappar direkt i sin vanliga meddelandeapp. Ni skickar från webben eller via API och betalar per meddelande.',
  ],
  ['jamforelse', 'heading', 'Det RCS kan som sms inte kan', 'RCS jämfört med sms'],
  [
    'jamforelse',
    'intro',
    'Båda hamnar i kundens meddelandeapp och kostar per meddelande. Med RCS får meddelandet också avsändarprofil, bilder och knappar.',
    'Ett sms är text från ett nummer. RCS kommer i samma app men med er logga, en verifierad avsändare, bilder och knappar. För kunden känns det mer som en liten app i tråden än som ett sms.',
  ],
  ['vagar', 'heading', 'Skicka från webben eller koppla in era system', 'Plattform'],
  [
    'vagar',
    'intro',
    'Webbverktyget och API:t skickar från samma avsändare och till samma pris. Välj det som passar hur ni arbetar.',
    'Vill ni bygga ett utskick själva gör ni det i webbläsaren. Vill ni att era system skickar automatiskt kopplar ni in API:t. Avsändaren och priset är desamma.',
  ],
  ['pris', 'heading', 'Betala per meddelande', 'Priser'],
  [
    'pris',
    'intro',
    'Priset beror på meddelandetyp och mottagarens operatör. Det finns ingen startavgift eller bindningstid.',
    'Ni betalar för det ni skickar. Priset beror på vilken typ av meddelande det är och vilken operatör mottagaren har. Det kostar inget att starta och det finns ingen bindningstid.',
  ],
  ['blogg', 'heading', 'Guider om RCS', 'Insikter'],
  [
    'blogg',
    'intro',
    'Från grunderna till API och webhooks. Artiklarna är på svenska och anger sina källor.',
    'Allt från vad RCS är till hur API:t och webhooks fungerar. Skrivet på svenska, med källor.',
  ],
  ['kontakt', 'heading', 'Prata med oss', 'Kontakt'],
  [
    'kontakt',
    'intro',
    'Berätta vad ni vill skicka, så hjälper vi er med avsändare, upplägg och integration.',
    'Berätta lite om vad ni vill skicka. Vi hör av oss och hjälper till med avsändare, upplägg och koppling.',
  ],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  const data: Record<string, Record<string, unknown>> = {}
  for (const [group, field, from, to] of CHANGES) {
    if (startsida[group]?.[field] !== from) continue
    data[group] = { ...(data[group] ?? startsida[group]), [field]: to }
  }
  if (!Object.keys(data).length) {
    payload.logger.info('Migration: homepage headings and intros already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info(`Migration: new headings and intros for ${Object.keys(data).join(', ')}.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
