import type { CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

// Webinars shown on the start page. The site shows the next one that has not ended yet.
export const Webinars: CollectionConfig = {
  slug: 'webinarer',
  labels: { singular: 'Webinar', plural: 'Webinar' },
  admin: {
    group: 'Innehåll',
    useAsTitle: 'title',
    defaultColumns: ['title', 'startsAt', 'visible'],
    description: 'Startsidan visar nästa webinar som inte har slutat. Anmälningar hamnar under Förfrågningar.',
  },
  defaultSort: 'startsAt',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: 'title', label: 'Rubrik', type: 'text', required: true, defaultValue: 'Lär dig allt om RCS', maxLength: 100 },
    {
      name: 'description',
      label: 'Beskrivning',
      type: 'textarea',
      required: true,
      maxLength: 400,
      admin: { description: 'Två eller tre meningar om vad deltagarna får med sig.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startsAt',
          label: 'Datum och tid',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayAndTime', timeIntervals: 15, displayFormat: 'd MMM yyyy HH:mm' }, description: 'Svensk tid.' },
        },
        { name: 'durationMinutes', label: 'Längd (minuter)', type: 'number', required: true, defaultValue: 45, min: 5, max: 480 },
      ],
    },
    {
      name: 'registrationUrl',
      label: 'Anmälningslänk',
      type: 'text',
      admin: { description: 'Valfri, till exempel en Teams- eller Zoom-anmälan. Lämna tom för att ta emot anmälningar i formuläret på sajten.' },
      validate: (value: unknown) => (!value || /^https:\/\/\S+$/.test(String(value)) ? true : 'Ange en länk som börjar med https://'),
    },
    {
      name: 'visible',
      label: 'Visa på sajten',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
