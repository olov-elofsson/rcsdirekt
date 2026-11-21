import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

export const Glossary: CollectionConfig = {
  slug: 'begrepp',
  labels: { singular: 'Begrepp', plural: 'Begrepp' },
  admin: { group: 'Kunskapsbank', useAsTitle: 'term', defaultColumns: ['term', 'aliases', 'article'] },
  orderable: true,
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'term', label: 'Begrepp', type: 'text', required: true, unique: true },
    { name: 'aliases', label: 'Andra namn', type: 'text', admin: { description: 'Synonymer som också ska hitta begreppet i sökningen.' } },
    { name: 'definition', label: 'Förklaring', type: 'textarea', required: true },
    { name: 'source', label: 'Källa', type: 'relationship', relationTo: 'kallor', required: true },
    { name: 'article', label: 'Artikel om begreppet', type: 'relationship', relationTo: 'artiklar', required: true },
  ],
}
