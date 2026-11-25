'use client'
import { usePathname } from 'next/navigation'

/** "Översikt" at the top of the sidebar, marked while the dashboard is open. */
export function NavHome() {
  const pathname = usePathname()
  const here = pathname === '/admin' || pathname === '/admin/'
  return (
    <a className="rd-nav-home" href="/admin" aria-current={here ? 'page' : undefined}>
      Översikt
    </a>
  )
}
