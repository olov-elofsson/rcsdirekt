# RCS Direkt for Google Cloud Run: builds the site as a Node server.
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile
COPY . .
# Latest content from Payload CMS. This runs in the build stage, which Cloud Build never
# caches, so every build (including the ones the CMS starts after an edit) fetches fresh content.
ARG CMS_URL=https://rcsdirekt-cms-631487523529.europe-west1.run.app
RUN CMS_URL=$CMS_URL bun scripts/fetch-content.ts
ENV NITRO_PRESET=node-server
RUN bun run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
USER node
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
