import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the short description of each message type now says
// when to pick it, so Basic, Single and Conversation are easy to tell apart on the price cards.
// A text changes only if it still reads as before, so edits made in the CMS are kept.
const SHORT: Record<string, [from: string, to: string]> = {
  basic: [
    'Verifierade textmeddelanden för korta och tydliga besked.',
    'Välj Basic när ni bara skickar text, högst 160 tecken. Till exempel orderbekräftelser, leveransbesked och engångskoder.',
  ],
  single: [
    'Rika utskick med bilder, video, karuseller och knappar.',
    'Välj Single när meddelandet har bild, video, knappar eller mer än 160 tecken. Till exempel kampanjer, nyhetsbrev och erbjudanden.',
  ],
  conversation: [
    'Tvåvägsdialog med bilder, knappar och snabbsvar.',
    'Välj Conversation när kunden svarar och ni skriver fram och tillbaka, vanligtvis inom 24 timmar. Till exempel kundservice och ombokningar.',
  ],
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Record<string, any>
  const plans = (priser.plans ?? []) as Record<string, any>[]
  let changed = 0
  const next = plans.map((plan) => {
    const change = SHORT[plan.slug]
    if (!change || plan.short !== change[0]) return plan
    changed += 1
    return { ...plan, short: change[1] }
  })
  if (!changed) {
    payload.logger.info('Migration: plan descriptions already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'priser', req, data: { plans: next } as never })
  payload.logger.info(`Migration: ${changed} plan descriptions say when to pick the plan.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
