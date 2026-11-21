// POST /api/leads: the website forwards contact, sign-up and webinar forms here.
// Only the website knows LEAD_API_KEY, so the endpoint cannot be used directly.
import { timingSafeEqual } from 'crypto'
import type { PayloadHandler } from 'payload'

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

function keyMatches(given: string | null): boolean {
  const expected = process.env.LEAD_API_KEY
  if (!expected || !given) return false
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export const createLead: PayloadHandler = async (req) => {
  if (!keyMatches(req.headers.get('x-lead-key'))) return Response.json({ error: 'forbidden' }, { status: 403 })
  const body = (await req.json?.().catch(() => null)) as Record<string, unknown> | null
  if (!body) return Response.json({ error: 'invalid' }, { status: 400 })
  const type = body.type === 'signup' || body.type === 'webinar' ? body.type : 'contact'
  const data = {
    type,
    status: 'new',
    name: text(body.name, 100),
    company: text(body.company, 120),
    email: text(body.email, 255),
    phone: text(body.phone, 30),
    message: text(body.message, 1000),
  } as const
  if (!data.name || !data.email) return Response.json({ error: 'invalid' }, { status: 400 })
  try {
    await req.payload.create({ collection: 'forfragningar', data, overrideAccess: true })
  } catch (error) {
    req.payload.logger.error({ err: error }, 'Could not save inquiry')
    return Response.json({ error: 'invalid' }, { status: 400 })
  }
  req.payload.logger.info(`New inquiry (${type}) from ${data.email}`)
  return Response.json({ ok: true }, { status: 201 })
}
