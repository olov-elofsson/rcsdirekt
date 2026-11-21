import type { Access } from 'payload'

export const loggedIn: Access = ({ req }) => Boolean(req.user)
