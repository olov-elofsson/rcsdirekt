import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

export const Sources: CollectionConfig = {
  slug: 'kallor',
  labels: { singular: 'Källa', plural: 'Källor' },
  admin: {
    group: 'Kunskapsbank',
    useAsTitle: 'title',
    defaultColumns: ['title', 'sourceId', 'url'],
    description: 'Källor som artiklar och begrepp hänvisar till.',
  },
  orderable: true,
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    {
      name: 'sourceId',
      label: 'Kortnamn',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Unikt kortnamn, till exempel "gsma". Ändra inte för befintliga källor.' },
    },
    { name: 'title', label: 'Titel', type: 'text', required: true, admin: { description: 'Utgivare först, till exempel "Apple: Om RCS-meddelanden på iPhone".' } },
    {
      name: 'url',
      label: 'Webbadress',
      type: 'text',
      required: true,
      validate: (value: string | null | undefined) => (value && /^https:\/\//.test(value) ? true : 'Adressen måste börja med https://'),
    },
    {
      type: 'collapsible',
      label: 'Fakta från källan',
      admin: { initCollapsed: true, description: 'Visas som "Ur källorna" i artiklar som använder källan. Lämna tomt för att inte visa något.' },
      fields: [
        { name: 'finding', label: 'Vad källan säger', type: 'textarea' },
        { name: 'implication', label: 'Vad det betyder', type: 'textarea' },
      ],
    },
  ],
}
