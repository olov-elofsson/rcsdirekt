import { APIError, type CollectionConfig } from 'payload'

import { loggedIn } from '../lib/access'

// The very first account can be created by anyone who opens /admin before an account exists.
// To close that window, only the addresses in FIRST_USER_EMAILS may create it.
const firstUserEmails = () =>
  (process.env.FIRST_USER_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Användare', plural: 'Användare' },
  admin: { useAsTitle: 'email', group: 'Inställningar' },
  auth: { tokenExpiration: 60 * 60 * 12 },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    beforeValidate: [
      ({ req, operation, data }) => {
        if (operation !== 'create' || req.user) return data
        const allowed = firstUserEmails()
        const email = String(data?.email ?? '').trim().toLowerCase()
        if (allowed.length && !allowed.includes(email)) {
          throw new APIError('Det första kontot får bara skapas med en godkänd e-postadress.', 403, undefined, true)
        }
        return data
      },
    ],
  },
  fields: [{ name: 'name', label: 'Namn', type: 'text' }],
}
