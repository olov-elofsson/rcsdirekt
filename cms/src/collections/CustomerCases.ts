import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

export const CustomerCases: CollectionConfig = {
  slug: 'kundcase',
  labels: { singular: 'Kundcase', plural: 'Kundcase' },
  admin: { group: 'Innehåll', useAsTitle: 'name', defaultColumns: ['name', 'slug'], description: 'Korten under "Kundcase" på startsidan. Dra för att ändra ordning.' },
  orderable: true,
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'name', label: 'Företag', type: 'text', required: true },
    { name: 'logo', label: 'Logotyp', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        { name: 'width', label: 'Logotypens bredd (px)', type: 'number', required: true, min: 1 },
        { name: 'height', label: 'Logotypens höjd (px)', type: 'number', required: true, min: 1 },
      ],
    },
    { name: 'description', label: 'Beskrivning', type: 'textarea', required: true },
    {
      name: 'slug',
      label: 'Presentation',
      type: 'text',
      admin: { description: 'Namnet på presentationen som visas under rcsdirekt.se/demo/<namn>. Lämna tomt för att visa "Kundcase kommer snart".' },
    },
  ],
}
