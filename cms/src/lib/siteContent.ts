import type { Payload } from 'payload'

import type { Article, SiteContent, Source, Webinar } from './site-content-types'

type Doc = Record<string, any>

const text = (value: unknown) => (typeof value === 'string' ? value : '')
const list = <T = Doc>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])
const relation = (value: unknown, key: string) => (value && typeof value === 'object' ? text((value as Doc)[key]) : '')

async function all(payload: Payload, collection: 'artiklar' | 'kallor'): Promise<Doc[]> {
  const result = await payload.find({ collection, depth: 1, limit: 0, pagination: false, sort: '_order' })
  return result.docs as Doc[]
}

/** A legal page from the Juridiskt global: heading, intro, last change and sections. */
function legalPage(group: Doc | undefined) {
  return {
    title: text(group?.title),
    description: text(group?.description),
    updated: text(group?.updated),
    sections: list(group?.sections).map((row) => ({ heading: text(row.heading), body: text(row.body) })),
  }
}

/** Builds the content the site renders, in the shape of src/content/types.ts. */
export async function buildSiteContent(payload: Payload): Promise<SiteContent> {
  const [articleDocs, sourceDocs, webinarDocs, startsida, priser, juridiskt] = await Promise.all([
    all(payload, 'artiklar'),
    all(payload, 'kallor'),
    payload
      .find({ collection: 'webinarer', depth: 0, limit: 0, pagination: false, sort: 'startsAt', where: { visible: { equals: true } } })
      .then((result) => result.docs as Doc[]),
    payload.findGlobal({ slug: 'startsida', depth: 0 }) as Promise<Doc>,
    payload.findGlobal({ slug: 'priser', depth: 0 }) as Promise<Doc>,
    payload.findGlobal({ slug: 'juridiskt', depth: 0 }) as Promise<Doc>,
  ])

  const sources: Source[] = sourceDocs.map((doc) => ({
    id: text(doc.sourceId),
    title: text(doc.title),
    url: text(doc.url),
    finding: text(doc.finding),
    implication: text(doc.implication),
  }))

  // Hidden articles stay in the CMS; the site only gets their old address and where it leads.
  const visibleDocs = articleDocs.filter((doc) => !doc.archived)
  const visibleSlugs = new Set(visibleDocs.map((doc) => text(doc.slug)))
  // A redirect may only lead to an article that is shown, or it ends on a 404 or loops.
  const redirects = articleDocs
    .filter((doc) => doc.archived && visibleSlugs.has(relation(doc.replacedBy, 'slug')))
    .map((doc) => ({ from: text(doc.slug), to: relation(doc.replacedBy, 'slug') }))

  // The article image uses the generated 'card' size (960x600 WebP) when it exists, otherwise the original.
  const cardImage = (image: Doc | undefined, name: string): Article['image'] => {
    if (!image?.filename) return null
    const card = image.sizes?.card
    const file = card?.filename ? card : image
    return {
      url: `/media/${encodeURIComponent(file.filename)}`,
      alt: text(image.alt) || name,
      width: Number(file.width) || 960,
      height: Number(file.height) || 600,
    }
  }

  const articles: Article[] = visibleDocs.map((doc) => ({
    slug: text(doc.slug),
    title: text(doc.title),
    description: text(doc.description),
    category: text(doc.category),
    keywords: list(doc.keywords).map((row) => text(row.keyword)),
    published: text(doc.published),
    author: text(doc.author),
    image: cardImage(doc.image, text(doc.title)),
    sections: list(doc.sections).map((section, index) => ({
      id: text(section.sectionId) || `avsnitt-${index + 1}`,
      title: text(section.title),
      paragraphs: list(section.paragraphs).map((row) => text(row.text)),
      points: list(section.points).map((row) => text(row.text)),
      sources: list(section.sources).map((source) => relation(source, 'sourceId')).filter(Boolean),
    })),
  }))

  // Only webinars that have not ended; the site also hides one that ends after the build.
  const now = Date.now()
  const webinarer: Webinar[] = webinarDocs
    .map((doc) => ({
      title: text(doc.title),
      description: text(doc.description),
      startsAt: text(doc.startsAt),
      durationMinutes: Number(doc.durationMinutes) || 45,
      registrationUrl: text(doc.registrationUrl),
    }))
    .filter((webinar) => webinar.title && Date.parse(webinar.startsAt) + webinar.durationMinutes * 60_000 > now)

  const availability = (rows: unknown) => list(rows).map((row) => ({ code: text(row.code), name: text(row.name), available: Boolean(row.available) }))

  return {
    version: 1,
    startsida: {
      seo: { title: text(startsida.seo?.title), description: text(startsida.seo?.description) },
      hero: { title: text(startsida.hero?.title), highlight: text(startsida.hero?.highlight), description: text(startsida.hero?.description) },
    },
    priser: {
      seo: { title: text(priser.seo?.title), description: text(priser.seo?.description) },
      heading: text(priser.heading),
      intro: text(priser.intro),
      plans: list(priser.plans).map((plan) => ({
        name: text(plan.name),
        slug: text(plan.slug),
        price: text(plan.price),
        badge: text(plan.badge),
        contents: text(plan.contents),
        operatorPrices: list(plan.operatorPrices)
          .map((row) => ({ operator: text(row.operator), price: text(row.price) }))
          .filter((row) => row.operator && row.price),
      })),
      operators: list(priser.operators).map((row) => text(row.name)),
      countries: availability(priser.countries),
      currencies: availability(priser.currencies),
      selectorNote: text(priser.selectorNote),
      vatNote: text(priser.vatNote),
      includedHeading: text(priser.includedHeading),
      included: list(priser.included).map((row) => text(row.text)),
      faqHeading: text(priser.faqHeading),
      faq: list(priser.faq).map((row) => ({ question: text(row.question), answer: text(row.answer) })),
      volumeText: text(priser.volumeText),
      networksHeading: text(priser.networksHeading),
      networksNote: text(priser.networksNote),
      networks: list(priser.networks).map((row) => ({
        network: text(row.network),
        host: text(row.host),
        basic: text(row.basic),
        single: text(row.single),
        conversation: text(row.conversation),
        sms: text(row.sms),
      })),
    },
    webinarer,
    juridiskt: { integritetspolicy: legalPage(juridiskt.integritetspolicy), villkor: legalPage(juridiskt.villkor) },
    kunskap: { sources, articles, redirects },
  }
}
