FROM node:24.2-alpine3.21 AS builder
#FROM node:24.2-alpine3.21 AS next
ENV DATABASE_URL="postgresql://postgres:Rebecca151205@postgres:5432/cesizen?schema=public"

ADD . /app/

WORKDIR /app

RUN npm install
#RUN npm rebuild bcrypt
RUN npm run build

#FROM node:24.2-alpine3.21 AS next

LABEL org.opencontainers.image.source=https://github.com/lyazide/cesizen
ENV DATABASE_URL="postgresql://postgres:Rebecca151205@postgres:5432/cesizen?schema=public"
WORKDIR /app
#COPY --from=builder /app/public ./public
#COPY --from=builder /app/prisma ./prisma
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/node_modules ./node_modules

#RUN npm install
#COPY --from=builder /app/.next/static /app/.next/static

ENV CHECKPOINT_DISABLE=1
ENV DISABLE_PRISMA_TELEMETRY=true


EXPOSE 3000

COPY docker/next/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

ENTRYPOINT [ "entrypoint" ]
CMD ["node", ".next/standalone/server.js"]
#CMD ["npm", "run", "start"]