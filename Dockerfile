# Google Cloud Run image. Lovable builds for its own runtime; this builds the same app as a Node server.
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
# The lockfile points some packages at Lovable's internal npm cache, which is not reachable
# outside Lovable. Same packages, same integrity hashes, fetched from the public registry instead.
RUN sed -i 's#https://europe-west1-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache/#https://registry.npmjs.org/#g' bun.lock \
 && bun install --frozen-lockfile
COPY . .
ENV NITRO_PRESET=node-server
RUN bun run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
USER node
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
