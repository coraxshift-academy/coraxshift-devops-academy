FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node public ./public
COPY --chown=node:node server.js ./
USER node

EXPOSE 3000
CMD ["node", "server.js"]
