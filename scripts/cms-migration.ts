// The newest CMS migration in this checkout, read from cms/src/migrations/index.ts.
// A push that adds a content migration also starts a site build at once; that build waits
// until the CMS reports the same migration, so it never publishes the content from before it.
import { existsSync, readFileSync } from "node:fs";

const index = new URL("../cms/src/migrations/index.ts", import.meta.url);

export function newestMigration(source: string): string | undefined {
  return [...source.matchAll(/name:\s*'([^']+)'/g)].at(-1)?.[1];
}

export function expectedMigration(): string | undefined {
  return existsSync(index) ? newestMigration(readFileSync(index, "utf8")) : undefined;
}
