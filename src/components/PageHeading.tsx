import type { ReactNode } from "react";

export function PageHeading({ title, description, children }: { title: ReactNode; description: ReactNode; children?: ReactNode }) {
  return (
    <header className="bg-background py-14 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-5 text-center lg:px-8">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        <div className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</div>
        {children ? <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
      </div>
    </header>
  );
}