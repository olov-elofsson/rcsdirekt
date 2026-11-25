import type { Payload } from 'payload'

import { NavHome } from './NavHome'

// The site's logo on the login page, and the drop as the small icon in the breadcrumb.
export function Logo() {
  return <img className="rd-logo" src="/brand/rcsdirekt.svg" alt="rcsdirekt.se" />
}

export function Icon() {
  return <img className="rd-icon" src="/brand/symbol.svg" alt="rcsdirekt.se" />
}

/** The top of the sidebar: "Översikt", and the count of new inquiries on Förfrågningar. */
export async function NavTop({ payload }: { payload: Payload }) {
  const { totalDocs } = await payload.count({ collection: 'forfragningar', where: { status: { equals: 'new' } } })
  return (
    <>
      <NavHome />
      {/* Payload renders the link itself, so the count reaches it as a CSS variable. */}
      {totalDocs ? <style>{`#nav-forfragningar{--rd-count:"${totalDocs}"}`}</style> : null}
    </>
  )
}
