// Starts a new build of the website when content changes, so edits go live.
// The site reads its content from /api/site-content while it is being built.
// SITE_BUILD_TRIGGER is the Cloud Build trigger's resource name, for example
// projects/rcsdirekt/locations/europe-west1/triggers/<id>. Without it nothing happens.
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from 'payload'

const METADATA_TOKEN = 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token'
// Saves close together are covered by one build: the build fetches content tens of
// seconds after it starts, so a later save in this window is still included.
// shortcut: a save late in the window that the running build misses waits for the next save;
// add a trailing trigger (Cloud Tasks, since Cloud Run idles CPU after the request) if that bites.
const COALESCE_MS = 15_000

let lastTriggered = 0

async function accessToken(): Promise<string> {
  const response = await fetch(METADATA_TOKEN, { headers: { 'metadata-flavor': 'Google' } })
  if (!response.ok) throw new Error(`metadata token: ${response.status}`)
  return ((await response.json()) as { access_token: string }).access_token
}

export async function triggerSiteRebuild(req: PayloadRequest, reason: string): Promise<void> {
  const trigger = process.env.SITE_BUILD_TRIGGER
  if (!trigger || req.context?.skipRebuild) return
  const now = Date.now()
  if (now - lastTriggered < COALESCE_MS) return
  lastTriggered = now
  try {
    const response = await fetch(`https://cloudbuild.googleapis.com/v1/${trigger}:run`, {
      method: 'POST',
      headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' },
      body: JSON.stringify({ source: { branchName: process.env.SITE_BUILD_BRANCH || 'main' } }),
    })
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`)
    req.payload.logger.info(`Started website build after change: ${reason}`)
  } catch (error) {
    lastTriggered = 0
    req.payload.logger.error({ err: error }, `Could not start website build after change: ${reason}`)
  }
}

export const rebuildAfterChange: CollectionAfterChangeHook = async ({ req, collection, doc }) => {
  await triggerSiteRebuild(req, `${collection.slug} ${doc?.id ?? ''}`.trim())
  return doc
}

export const rebuildAfterDelete: CollectionAfterDeleteHook = async ({ req, collection, doc }) => {
  await triggerSiteRebuild(req, `${collection.slug} ${doc?.id ?? ''} borttagen`.trim())
  return doc
}

export const rebuildAfterGlobalChange: GlobalAfterChangeHook = async ({ req, global, doc }) => {
  await triggerSiteRebuild(req, global.slug)
  return doc
}
