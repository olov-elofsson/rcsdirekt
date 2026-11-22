import type { Payload } from 'payload'

import type { Article, CustomerCase, GlossaryTerm, SiteContent, Source, Webinar } from './site-content-types'

type Doc = Record<string, any>

const text = (value: unknown) => (typeof value === 'string' ? value : '')
const list = <T = Doc>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])
const relation = (value: unknown, key: string) => (value && typeof value === 'object' ? text((value as Doc)[key]) : '')

async function all(payload: Payload, collection: 'artiklar' | 'kallor' | 'begrepp' | 'kundcase'): Promise<Doc[]> {
  const result = await payload.find({ collection, depth: 1, limit: 0, pagination: false, sort: '_order' })
  return result.docs as Doc[]
}

/** Builds the content the site renders, in the shape of src/content/types.ts. */
export async function buildSiteContent(payload: Payload): Promise<SiteContent> {
  const [articleDocs, sourceDocs, glossaryDocs, caseDocs, webinarDocs, startsida, priser, demo] = await Promise.all([
    all(payload, 'artiklar'),
    all(payload, 'kallor'),
    all(payload, 'begrepp'),
    all(payload, 'kundcase'),
    payload
      .find({ collection: 'webinarer', depth: 0, limit: 0, pagination: false, sort: 'startsAt', where: { visible: { equals: true } } })
      .then((result) => result.docs as Doc[]),
    payload.findGlobal({ slug: 'startsida', depth: 1 }) as Promise<Doc>,
    payload.findGlobal({ slug: 'priser', depth: 0 }) as Promise<Doc>,
    payload.findGlobal({ slug: 'demo', depth: 0 }) as Promise<Doc>,
  ])

  const sources: Source[] = sourceDocs.map((doc) => ({
    id: text(doc.sourceId),
    title: text(doc.title),
    url: text(doc.url),
    finding: text(doc.finding),
    implication: text(doc.implication),
  }))

  const articles: Article[] = articleDocs.map((doc) => ({
    slug: text(doc.slug),
    title: text(doc.title),
    description: text(doc.description),
    category: text(doc.category),
    keywords: list(doc.keywords).map((row) => text(row.keyword)),
    published: text(doc.published),
    sections: list(doc.sections).map((section, index) => ({
      id: text(section.sectionId) || `avsnitt-${index + 1}`,
      title: text(section.title),
      paragraphs: list(section.paragraphs).map((row) => text(row.text)),
      points: list(section.points).map((row) => text(row.text)),
      sources: list(section.sources).map((source) => relation(source, 'sourceId')).filter(Boolean),
    })),
    related: list(doc.related).map((related) => relation(related, 'slug')).filter(Boolean),
  }))

  const glossary: GlossaryTerm[] = glossaryDocs.map((doc) => ({
    term: text(doc.term),
    aliases: text(doc.aliases),
    definition: text(doc.definition),
    source: relation(doc.source, 'sourceId'),
    article: relation(doc.article, 'slug'),
  }))

  // The card uses the generated 'card' size (960x600 WebP) when it exists, otherwise the original.
  const caseImage = (image: Doc | undefined, name: string): CustomerCase['image'] => {
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

  const kundcase: CustomerCase[] = caseDocs.map((doc) => ({
    name: text(doc.name),
    logo: {
      url: doc.logo?.filename ? `/media/${encodeURIComponent(doc.logo.filename)}` : '',
      alt: text(doc.logo?.alt) || text(doc.name),
      width: Number(doc.width) || 1,
      height: Number(doc.height) || 1,
    },
    image: caseImage(doc.image, text(doc.name)),
    description: text(doc.description),
    slug: text(doc.slug),
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

  const items = (rows: unknown) => list(rows).map((row) => ({ icon: text(row.icon), title: text(row.title), copy: text(row.copy) }))
  const availability = (rows: unknown) => list(rows).map((row) => ({ code: text(row.code), name: text(row.name), available: Boolean(row.available) }))

  return {
    version: 1,
    startsida: {
      seo: { title: text(startsida.seo?.title), description: text(startsida.seo?.description) },
      hero: { title: text(startsida.hero?.title), highlight: text(startsida.hero?.highlight), description: text(startsida.hero?.description) },
      kundcaseHeading: text(startsida.kundcaseHeading),
      fordelar: { heading: text(startsida.fordelar?.heading), intro: text(startsida.fordelar?.intro), items: items(startsida.fordelar?.items) },
      jamforelse: {
        heading: text(startsida.jamforelse?.heading),
        intro: text(startsida.jamforelse?.intro),
        rows: list(startsida.jamforelse?.rows).map((row) => ({ label: text(row.label), sms: text(row.sms), rcs: text(row.rcs) })),
      },
      vagar: { heading: text(startsida.vagar?.heading), intro: text(startsida.vagar?.intro), items: items(startsida.vagar?.items) },
      pris: { heading: text(startsida.pris?.heading), subheading: text(startsida.pris?.subheading), intro: text(startsida.pris?.intro) },
      blogg: {
        heading: text(startsida.blogg?.heading),
        intro: text(startsida.blogg?.intro),
        picks: list(startsida.blogg?.picks).map((article) => relation(article, 'slug')).filter(Boolean),
      },
      kontakt: { heading: text(startsida.kontakt?.heading), intro: text(startsida.kontakt?.intro) },
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
        short: text(plan.short),
        copy: text(plan.copy),
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
    },
    kundcase,
    webinarer,
    demo: {
      features: list(demo.features).map((row, index) => ({ id: index + 1, title: text(row.title), copy: text(row.copy) })),
      richCards: items(demo.richCards),
      replies: list(demo.replies).map((row) => ({
        option: text(row.option),
        title: text(row.title),
        copy: text(row.copy),
        actions: list(row.actions).map((action) => text(action.label)),
      })),
    },
    kunskap: { sources, glossary, articles },
  }
}
