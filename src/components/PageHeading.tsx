import type { ReactNode } from "react";

/**
 * A content page's introduction, as on fortnox.se: Marin, centred, and pulled up under the floating
 * header so the menu bar sits on it. Links in the description stay white; actions in `children`
 * should be the white `outline` Button and quiet links, as everywhere on Marin.
 */
export function PageHeading({ title, description, children }: { title: ReactNode; description: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative -mt-[4.75rem] mb-12 overflow-hidden bg-ink text-ink-foreground sm:mb-16">
      <div className="relative mx-auto max-w-6xl px-5 pt-36 pb-16 text-center sm:pt-40 sm:pb-20 lg:px-8">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.08] text-balance text-ink-foreground sm:text-5xl lg:text-6xl">{title}</h1>
        <div className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl [&_a]:text-ink-foreground">{description}</div>
        {children ? <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
      </div>
    </header>
  );
}
