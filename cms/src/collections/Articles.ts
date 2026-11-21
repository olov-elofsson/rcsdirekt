import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

export const articleCategories = [
  'Grunder',
  'För företag',
  'Meddelanden',
  'Integration',
  'Begrepp',
  'Mobil & operatörer',
  'Teknik',
  'Meddelandedesign',
  'Företag',
]

export const Articles: CollectionConfig = {
  slug: 'artiklar',
  labels: { singular: 'Artikel', plural: 'Artiklar' },
  admin: {
    group: 'Kunskapsbank',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published', 'slug'],
    listSearchableFields: ['title', 'slug', 'description'],
    description: 'Guider och begreppsartiklar under rcsdirekt.se/blogg.',
  },
  orderable: true,
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'title', label: 'Rubrik', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Adress',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: string | null | undefined) =>
        value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : 'Bara små bokstäver a–z, siffror och bindestreck.',
      admin: { position: 'sidebar', description: 'Visas som rcsdirekt.se/blogg/<adress>. Om du ändrar den slutar gamla länkar fungera.' },
    },
    { name: 'category', label: 'Ämne', type: 'select', required: true, options: articleCategories, admin: { position: 'sidebar' } },
    { name: 'published', label: 'Publicerad', type: 'text', required: true, admin: { position: 'sidebar', description: 'ÅÅÅÅ-MM-DD' }, validate: (value: string | null | undefined) => (value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? true : 'Ange datum som ÅÅÅÅ-MM-DD.') },
    { name: 'description', label: 'Ingress', type: 'textarea', required: true },
    {
      name: 'keywords',
      label: 'Sökord',
      type: 'array',
      labels: { singular: 'Sökord', plural: 'Sökord' },
      admin: { description: 'Ord och fraser som ska hitta artikeln i bloggens sökning.', initCollapsed: true },
      fields: [{ name: 'keyword', label: 'Sökord', type: 'text', required: true }],
    },
    {
      name: 'sections',
      label: 'Avsnitt',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Avsnitt', plural: 'Avsnitt' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', label: 'Mellanrubrik', type: 'text', admin: { description: 'Kan lämnas tom för det första avsnittet.' } },
        {
          name: 'paragraphs',
          label: 'Stycken',
          type: 'array',
          labels: { singular: 'Stycke', plural: 'Stycken' },
          fields: [{ name: 'text', label: 'Text', type: 'textarea', required: true }],
        },
        {
          name: 'points',
          label: 'Punktlista',
          type: 'array',
          labels: { singular: 'Punkt', plural: 'Punkter' },
          admin: { initCollapsed: true },
          fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
        },
        {
          name: 'sources',
          label: 'Källor',
          type: 'relationship',
          relationTo: 'kallor',
          hasMany: true,
          required: true,
          minRows: 1,
        },
        { name: 'sectionId', label: 'Ankare', type: 'text', admin: { description: 'Valfritt ankare för direktlänk, till exempel "fordjupning".' } },
      ],
    },
    {
      name: 'related',
      label: 'Relaterade artiklar',
      type: 'relationship',
      relationTo: 'artiklar',
      hasMany: true,
    },
  ],
}
