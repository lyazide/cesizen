FROM node:24.2-alpine3.21 AS builder

LABEL org.opencontainers.image.source=https://github.com/lyazide/cesizen

ADD . /app/

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

RUN npm run build

EXPOSE 3000

WORKDIR /app

# Copie uniquement les fichiers indispensables pour l'exécution

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/.next/static /app/.next/static

COPY docker/next/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

ENTRYPOINT [ "entrypoint" ]
CMD [ "node", "server.js"]