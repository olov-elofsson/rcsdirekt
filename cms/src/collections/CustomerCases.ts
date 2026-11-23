import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

export const CustomerCases: CollectionConfig = {
  slug: 'kundcase',
  labels: { singular: 'Kundcase', plural: 'Kundcase' },
  admin: { group: 'Innehåll', useAsTitle: 'name', defaultColumns: ['name', 'slug'], description: 'Kundcasen på startsidan och deras presentationer under /demo. Dra för att ändra ordning.' },
  orderable: true,
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'name', label: 'Företag', type: 'text', required: true, admin: { description: 'Hela bolagsnamnet som det är registrerat, till exempel "Bilia AB".' } },
    {
      name: 'image',
      label: 'Bild',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Foto som visas överst på kortet, till exempel en miljö eller produkt som hör till kunden. Liggande format, minst 960 × 600 px. Saknas bild visas en ljus yta i brandkitets färger.' },
    },
    {
      name: 'logo',
      label: 'Logotyp',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Visas inte på startsidan. Sparas för andra sammanhang.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'width', label: 'Logotypens bredd (px)', type: 'number', min: 1 },
        { name: 'height', label: 'Logotypens höjd (px)', type: 'number', min: 1 },
      ],
    },
    { name: 'description', label: 'Beskrivning', type: 'textarea', required: true },
    {
      name: 'slug',
      label: 'Presentation',
      type: 'text',
      admin: { description: 'Namnet på presentationen som visas under rcsdirekt.se/demo/<namn>. Lämna tomt om kunden inte har någon presentation.' },
    },
  ],
}
