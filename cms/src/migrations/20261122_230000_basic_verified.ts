import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: RCS Basic says that it too comes from a verified sender
// with the company's name and logo. A text changes only if it still reads as before.
const CHANGES: [field: 'short' | 'contents', from: string, to: string][] = [
  [
    'short',
    'Välj Basic när ni bara skickar text, högst 160 tecken. Till exempel orderbekräftelser, leveransbesked och engångskoder.',
    'Välj Basic när ni bara skickar text, högst 160 tecken. Den kommer också från en verifierad avsändare med ert namn och er logga. Till exempel orderbekräftelser, leveransbesked och engångskoder.',
  ],
  ['contents', 'Text upp till 160 tecken', 'Text upp till 160 tecken från verifierad avsändare'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Record<string, any>
  const plans = (priser.plans ?? []) as Record<string, any>[]
  let changed = 0
  const next = plans.map((plan) => {
    if (plan.slug !== 'basic') return plan
    const updated = { ...plan }
    for (const [field, from, to] of CHANGES) {
      if (updated[field] === from) {
        updated[field] = to
        changed += 1
      }
    }
    return updated
  })
  if (!changed) {
    payload.logger.info('Migration: Basic already mentions the verified sender.')
    return
  }
  await payload.updateGlobal({ slug: 'priser', req, data: { plans: next } as never })
  payload.logger.info('Migration: Basic mentions the verified sender.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
