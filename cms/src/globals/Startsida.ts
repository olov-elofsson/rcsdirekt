import type { GlobalConfig } from 'payload'

import { seoField } from '../fields/seo'
import { loggedIn } from '../lib/access'

// Only what the start page reads from the CMS: the hero and the search-engine text.
// Everything else on the start page is written in the site's components.
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
          ],
        },
        { label: 'Sökmotorer', fields: [seoField] },
      ],
    },
  ],
}
