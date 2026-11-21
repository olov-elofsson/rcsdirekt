import type { GroupField } from 'payload'

export const seoField: GroupField = {
  name: 'seo',
  label: 'Sökmotorer och delning',
  type: 'group',
  admin: { description: 'Visas i Googles sökresultat och när sidan delas.' },
  fields: [
    { name: 'title', label: 'Sidtitel', type: 'text', required: true },
    { name: 'description', label: 'Beskrivning', type: 'textarea', required: true },
  ],
}
