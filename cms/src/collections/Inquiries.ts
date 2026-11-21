import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

// Messages from the contact form and account requests from "Skapa konto" on the website.
// The website sends them through the /api/leads endpoint; nobody creates them by hand.
export const Inquiries: CollectionConfig = {
  slug: 'forfragningar',
  labels: { singular: 'Förfrågan', plural: 'Förfrågningar' },
  admin: {
    group: 'Kunder',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'type', 'status', 'createdAt'],
    description: 'Meddelanden från kontaktformuläret och kontoförfrågningar från rcsdirekt.se. Markera dem som hanterade när ni har svarat.',
  },
  defaultSort: '-createdAt',
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          label: 'Typ',
          type: 'select',
          required: true,
          options: [
            { label: 'Kontakt', value: 'contact' },
            { label: 'Skapa konto', value: 'signup' },
          ],
          admin: { readOnly: true },
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'Ny', value: 'new' },
            { label: 'Hanterad', value: 'done' },
          ],
        },
      ],
    },
    { name: 'name', label: 'Namn', type: 'text', required: true, maxLength: 100, admin: { readOnly: true } },
    { name: 'company', label: 'Företag', type: 'text', maxLength: 120, admin: { readOnly: true } },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'E-post', type: 'email', required: true, admin: { readOnly: true } },
        { name: 'phone', label: 'Telefon', type: 'text', maxLength: 30, admin: { readOnly: true } },
      ],
    },
    { name: 'message', label: 'Meddelande', type: 'textarea', maxLength: 1000, admin: { readOnly: true } },
    { name: 'note', label: 'Intern anteckning', type: 'textarea', admin: { description: 'Syns bara här i CMS:et.' } },
  ],
}
