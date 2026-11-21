import type { GlobalConfig } from 'payload'

import { iconField } from '../fields/icon'
import { loggedIn } from '../lib/access'

export const Demo: GlobalConfig = {
  slug: 'demo',
  label: 'Interaktiv demo',
  admin: { group: 'Sidor', description: 'Telefonen på startsidan som visar vad RCS kan.' },
  access: { read: loggedIn, update: loggedIn },
  fields: [
    {
      name: 'features',
      label: 'Funktioner',
      type: 'array',
      minRows: 6,
      maxRows: 6,
      labels: { singular: 'Funktion', plural: 'Funktioner' },
      admin: { description: 'Sex funktioner med fasta platser i telefonen, i ordningen 1–6. Ändra text men inte ordning.' },
      fields: [
        { name: 'title', label: 'Rubrik', type: 'text', required: true },
        { name: 'copy', label: 'Text', type: 'text', required: true },
      ],
    },
    {
      name: 'richCards',
      label: 'Kort i karusellen',
      type: 'array',
      labels: { singular: 'Kort', plural: 'Kort' },
      fields: [iconField(), { name: 'title', label: 'Rubrik', type: 'text', required: true }, { name: 'copy', label: 'Text', type: 'text', required: true }],
    },
    {
      name: 'replies',
      label: 'Svarsknappar',
      type: 'array',
      labels: { singular: 'Svarsknapp', plural: 'Svarsknappar' },
      fields: [
        { name: 'option', label: 'Knapptext', type: 'text', required: true },
        { name: 'title', label: 'Svarets rubrik', type: 'text', required: true },
        { name: 'copy', label: 'Svarets text', type: 'textarea', required: true },
        {
          name: 'actions',
          label: 'Knappar i svaret',
          type: 'array',
          labels: { singular: 'Knapp', plural: 'Knappar' },
          fields: [{ name: 'label', label: 'Text', type: 'text', required: true }],
        },
      ],
    },
  ],
}
