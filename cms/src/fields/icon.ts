import type { SelectField } from 'payload'

// Keep in sync with src/content/icons.ts in the site.
export const iconOptions = [
  { label: 'Graf uppåt', value: 'trending-up' },
  { label: 'Stapeldiagram', value: 'bar-chart' },
  { label: 'Plånbok', value: 'wallet' },
  { label: 'Jordglob', value: 'globe' },
  { label: 'Kod', value: 'code' },
  { label: 'Bild', value: 'image' },
  { label: 'Lager', value: 'layers' },
  { label: 'Muspekare', value: 'pointer' },
  { label: 'Pratbubbla', value: 'message' },
  { label: 'Sköld', value: 'shield' },
  { label: 'Bock', value: 'check' },
  { label: 'Gnistor', value: 'sparkles' },
]

export const iconField = (): SelectField => ({
  name: 'icon',
  label: 'Ikon',
  type: 'select',
  required: true,
  options: iconOptions,
})
