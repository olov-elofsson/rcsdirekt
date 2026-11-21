import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Bild', plural: 'Bilder' },
  admin: { group: 'Innehåll', useAsTitle: 'alt' },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'],
    // A light version for the customer case cards; the original is kept as uploaded.
    imageSizes: [{ name: 'card', width: 960, height: 600, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } }],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternativtext',
      type: 'text',
      required: true,
      admin: { description: 'Beskriv bilden för den som inte kan se den, till exempel företagsnamnet för en logotyp.' },
    },
  ],
}
