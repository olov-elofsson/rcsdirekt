import type { GlobalConfig } from 'payload'

import { iconField } from '../fields/icon'
import { seoField } from '../fields/seo'
import { loggedIn } from '../lib/access'

const heading = { name: 'heading', label: 'Rubrik', type: 'text', required: true } as const
const intro = { name: 'intro', label: 'Ingress', type: 'textarea', required: true } as const

export const Startsida: GlobalConfig = {
  slug: 'startsida',
  label: 'Startsida',
  admin: { group: 'Sidor' },
  access: { read: loggedIn, update: loggedIn },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Toppen',
          fields: [
            {
              name: 'hero',
              label: 'Huvudrubrik',
              type: 'group',
              fields: [
                { name: 'title', label: 'Rubrik, första raden', type: 'text', required: true },
                { name: 'highlight', label: 'Rubrik, andra raden (blå)', type: 'text', required: true },
                { name: 'description', label: 'Text under rubriken', type: 'textarea', required: true },
              ],
            },
            { name: 'kundcaseHeading', label: 'Rubrik för kundcase', type: 'text', required: true, admin: { description: 'Själva korten redigeras under Kundcase.' } },
          ],
        },
        {
          label: 'Fördelar',
          fields: [
            {
              name: 'fordelar',
              label: 'Varför RCS',
              type: 'group',
              fields: [
                heading,
                intro,
                {
                  name: 'items',
                  label: 'Kort',
                  type: 'array',
                  labels: { singular: 'Kort', plural: 'Kort' },
                  fields: [iconField(), { name: 'title', label: 'Rubrik', type: 'text', required: true }, { name: 'copy', label: 'Text', type: 'textarea', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'RCS mot SMS',
          fields: [
            {
              name: 'jamforelse',
              label: 'Jämförelse',
              type: 'group',
              fields: [
                heading,
                intro,
                {
                  name: 'rows',
                  label: 'Rader',
                  type: 'array',
                  labels: { singular: 'Rad', plural: 'Rader' },
                  admin: { description: 'Skriv ✓ för en bock och ✗ för ett kryss. All annan text visas som den är.' },
                  fields: [
                    { name: 'label', label: 'Egenskap', type: 'text', required: true },
                    {
                      type: 'row',
                      fields: [
                        { name: 'sms', label: 'SMS', type: 'text', required: true },
                        { name: 'rcs', label: 'RCS', type: 'text', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Webb eller API',
          fields: [
            {
              name: 'vagar',
              label: 'Sätt att skicka',
              type: 'group',
              fields: [
                heading,
                intro,
                {
                  name: 'items',
                  label: 'Alternativ',
                  type: 'array',
                  labels: { singular: 'Alternativ', plural: 'Alternativ' },
                  fields: [iconField(), { name: 'title', label: 'Rubrik', type: 'text', required: true }, { name: 'copy', label: 'Text', type: 'textarea', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Priser, blogg och kontakt',
          fields: [
            {
              name: 'pris',
              label: 'Prissektionen',
              type: 'group',
              admin: { description: 'Själva priserna redigeras under Prissida.' },
              fields: [heading, { name: 'subheading', label: 'Underrubrik', type: 'text', required: true }, intro],
            },
            {
              name: 'blogg',
              label: 'Bloggsektionen',
              type: 'group',
              fields: [
                heading,
                intro,
                { name: 'picks', label: 'Utvalda artiklar', type: 'relationship', relationTo: 'artiklar', hasMany: true, maxRows: 3, required: true },
              ],
            },
            { name: 'kontakt', label: 'Kontaktsektionen', type: 'group', fields: [heading, intro] },
          ],
        },
        { label: 'Sökmotorer', fields: [seoField] },
      ],
    },
  ],
}
