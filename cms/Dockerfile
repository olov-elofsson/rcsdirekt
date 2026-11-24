# Payload CMS (Next.js) for Cloud Run. Build context is the cms/ folder.
FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# The build only needs a secret to be present; the real one is given at runtime.
RUN PAYLOAD_SECRET=build-only DATABASE_URL=postgres://build-only npm run build

FROM base AS runner
WORKDIR /app
# SEED_ON_EMPTY=false: an empty database is never filled automatically; set it to true on the
# service only when starting a new environment on purpose.
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=8080 HOSTNAME=0.0.0.0 SEED_ON_EMPTY=false
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
