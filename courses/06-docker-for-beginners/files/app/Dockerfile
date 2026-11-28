# Multi-stage: build with one image, ship a smaller one.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
COPY server.js ./
RUN node --check server.js

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/server.js ./
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "server.js"]
