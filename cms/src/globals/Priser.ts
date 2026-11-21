import type { ArrayField, GlobalConfig } from 'payload'

import { seoField } from '../fields/seo'
import { loggedIn } from '../lib/access'

const availability = (name: string, label: string, codeLabel: string): ArrayField => ({
    name,
    label,
    type: 'array',
    labels: { singular: label, plural: label },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'code', label: codeLabel, type: 'text', required: true },
          { name: 'name', label: 'Namn', type: 'text', required: true },
          { name: 'available', label: 'Går att välja', type: 'checkbox', defaultValue: false },
        ],
      },
    ],
})

export const Priser: GlobalConfig = {
  slug: 'priser',
  label: 'Prissida',
  admin: { group: 'Sidor' },
  access: { read: loggedIn, update: loggedIn },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Priser',
          fields: [
            { name: 'heading', label: 'Rubrik', type: 'text', required: true },
            { name: 'intro', label: 'Ingress', type: 'textarea', required: true },
            {
              name: 'plans',
              label: 'Meddelandetyper',
              type: 'array',
              labels: { singular: 'Meddelandetyp', plural: 'Meddelandetyper' },
              admin: { description: 'Visas både på prissidan och på startsidan.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', label: 'Namn', type: 'text', required: true },
                    { name: 'price', label: 'Pris', type: 'text', required: true, admin: { description: 'Till exempel "0,30 SEK"' } },
                    { name: 'badge', label: 'Etikett', type: 'text', admin: { description: 'Till exempel "Populärast". Lämna tomt för ingen.' } },
                  ],
                },
                { name: 'contents', label: 'Innehåll i korthet', type: 'text', required: true },
                { name: 'short', label: 'Kort beskrivning', type: 'text', required: true },
                { name: 'copy', label: 'Lång beskrivning', type: 'textarea', required: true },
                { name: 'slug', label: 'Kortnamn', type: 'text', required: true, admin: { description: 'Till exempel "basic". Ändra inte i onödan.' } },
              ],
            },
            {
              name: 'operators',
              label: 'Operatörer',
              type: 'array',
              labels: { singular: 'Operatör', plural: 'Operatörer' },
              fields: [{ name: 'name', label: 'Operatör', type: 'text', required: true }],
            },
            { name: 'vatNote', label: 'Text under priserna', type: 'text', required: true },
          ],
        },
        {
          label: 'Land och valuta',
          fields: [
            availability('countries', 'Länder', 'Landskod'),
            availability('currencies', 'Valutor', 'Valutakod'),
            { name: 'selectorNote', label: 'Text under väljarna', type: 'textarea', required: true },
          ],
        },
        {
          label: 'Ingår och frågor',
          fields: [
            { name: 'includedHeading', label: 'Rubrik för det som ingår', type: 'text', required: true },
            {
              name: 'included',
              label: 'Ingår alltid',
              type: 'array',
              labels: { singular: 'Punkt', plural: 'Punkter' },
              fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
            },
            { name: 'faqHeading', label: 'Rubrik för frågor', type: 'text', required: true },
            {
              name: 'faq',
              label: 'Frågor och svar',
              type: 'array',
              labels: { singular: 'Fråga', plural: 'Frågor' },
              fields: [
                { name: 'question', label: 'Fråga', type: 'text', required: true },
                { name: 'answer', label: 'Svar', type: 'textarea', required: true },
              ],
            },
            { name: 'volumeText', label: 'Text före "Kontakta oss"', type: 'text', required: true },
          ],
        },
        { label: 'Sökmotorer', fields: [seoField] },
      ],
    },
  ],
}
