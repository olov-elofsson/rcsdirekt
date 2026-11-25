// The site's logo in the CMS: the full logo on the login page, the drop in the sidebar.
export function Logo() {
  return <img className="rd-logo" src="/brand/rcsdirekt.svg" alt="rcsdirekt.se" />
}

export function Icon() {
  return <img className="rd-icon" src="/brand/symbol.svg" alt="rcsdirekt.se" />
}

/** The logo at the top of the sidebar, linking to the dashboard. */
export function NavLogo() {
  return (
    <a className="rd-nav-logo" href="/admin" aria-label="Översikt">
      <img src="/brand/rcsdirekt.svg" alt="rcsdirekt.se" />
    </a>
  )
}
