import type { Field, GlobalConfig } from 'payload'

import { loggedIn } from '../lib/access'

// One legal page: heading, intro, the date it was last changed and its sections. A section's text
// is split into paragraphs at blank lines; lines starting with "- " become a bulleted list.
const page = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'title', label: 'Rubrik', type: 'text', required: true },
    { name: 'description', label: 'Ingress', type: 'textarea', required: true },
    { name: 'updated', label: 'Senast ändrad', type: 'text', required: true, admin: { description: 'Visas under ingressen, till exempel "22 november 2026". Ändra datumet när innehållet ändras.' } },
    {
      name: 'sections',
      label: 'Avsnitt',
      type: 'array',
      labels: { singular: 'Avsnitt', plural: 'Avsnitt' },
      admin: { description: 'Tom rad mellan stycken. Rader som börjar med "- " blir en punktlista.' },
      fields: [
        { name: 'heading', label: 'Rubrik', type: 'text', required: true },
        { name: 'body', label: 'Text', type: 'textarea', required: true },
      ],
    },
  ],
})

export const Juridiskt: GlobalConfig = {
  slug: 'juridiskt',
  label: 'Juridiskt',
  admin: { group: 'Sidor', description: 'Integritetspolicyn (/integritetspolicy) och villkoren (/villkor).' },
  access: { read: loggedIn, update: loggedIn },
  fields: [
    { type: 'tabs', tabs: [
      { label: 'Integritetspolicy', fields: [page('integritetspolicy', 'Integritetspolicy')] },
      { label: 'Villkor', fields: [page('villkor', 'Villkor')] },
    ] },
  ],
}
