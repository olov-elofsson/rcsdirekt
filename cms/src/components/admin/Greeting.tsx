import type { Payload } from 'payload'

// The top of the CMS dashboard: today's date, one question and what is waiting, in the site's
// design. A server component, so the counts come straight from the database on every visit.

const dateFormat = new Intl.DateTimeFormat('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Stockholm' })
const shortDate = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', timeZone: 'Europe/Stockholm' })

type Card = { count: string; title: string; text: string; href: string }

export async function Greeting({ payload }: { payload: Payload }) {
  const now = new Date()
  const [newInquiries, articles, webinars] = await Promise.all([
    payload.count({ collection: 'forfragningar', where: { status: { equals: 'new' } } }),
    payload.count({ collection: 'artiklar', where: { archived: { not_equals: true } } }),
    payload.find({
      collection: 'webinarer',
      where: { and: [{ visible: { equals: true } }, { startsAt: { greater_than_equal: now.toISOString() } }] },
      sort: 'startsAt',
      limit: 1,
      depth: 0,
    }),
  ])
  const next = webinars.docs[0] as { startsAt?: string; title?: string } | undefined

  const cards: Card[] = [
    {
      count: String(newInquiries.totalDocs),
      title: newInquiries.totalDocs === 1 ? '1 ny förfrågan' : `${newInquiries.totalDocs} nya förfrågningar`,
      text: newInquiries.totalDocs ? 'väntar på svar' : 'allt är besvarat',
      href: '/admin/collections/forfragningar?where[status][equals]=new',
    },
    {
      count: next?.startsAt ? shortDate.format(new Date(next.startsAt)).split(' ')[0] : '–',
      title: next?.startsAt ? `Webinar ${shortDate.format(new Date(next.startsAt))}` : 'Inget webinar inplanerat',
      text: next?.title ?? 'lägg till ett under Webinarer',
      href: '/admin/collections/webinarer',
    },
    {
      count: String(articles.totalDocs),
      title: `${articles.totalDocs} artiklar på sajten`,
      text: 'i bloggen och läslistan',
      href: '/admin/collections/artiklar',
    },
  ]

  const date = dateFormat.format(now)
  return (
    <section className="rd-greeting" aria-labelledby="rd-greeting-title">
      <div className="rd-greeting__band" aria-hidden="true">
        <img className="rd-greeting__symbol" src="/brand/symbol.svg" alt="" />
      </div>
      <p className="rd-greeting__date">{date.charAt(0).toUpperCase() + date.slice(1)}</p>
      <h1 id="rd-greeting-title" className="rd-greeting__title">Vad ska vi ta tag i i dag?</h1>
      <ul className="rd-greeting__cards">
        {cards.map((card) => (
          <li key={card.href}>
            <a className="rd-greeting__card" href={card.href}>
              <span className="rd-greeting__icon" aria-hidden="true">{card.count}</span>
              <span className="rd-greeting__text">
                <strong>{card.title}</strong>
                <span>{card.text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
