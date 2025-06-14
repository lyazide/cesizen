#FROM node:24.2-alpine3.21 AS builder
# syntax=docker.io/docker/dockerfile:1

FROM node:24.2-alpine3.21 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM node:24.2-alpine3.21 AS builder



WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi
#ADD . /app/

#RUN npm install
#RUN npm rebuild bcrypt
#RUN npm run build

FROM node:24.2-alpine3.21 AS next

LABEL org.opencontainers.image.source=https://github.com/lyazide/cesizen
ENV DATABASE_URL="postgresql://postgres:Rebecca151205@postgres:5432/cesizen?schema=public"
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# Set the correct permission for prerender cache
#RUN mkdir .next
#RUN chown -R nextjs:nodejs .next
#COPY --from=builder /app/prisma ./prisma
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/node_modules ./node_modules
##COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
##COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


#RUN npm install
#COPY --from=builder /app/.next/static /app/.next/staticcd 

ENV CHECKPOINT_DISABLE=1
#disable data collection from Prisma
ENV DISABLE_PRISMA_TELEMETRY=true 


EXPOSE 3000

COPY docker/next/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

ENV PORT=3000

#ENTRYPOINT [ "entrypoint" ]
ENV HOSTNAME="0.0.0.0"

#CMD ["node", ".next/standalone/server.js"]
#CMD ["npm", "run", "start"]
RUN npx --no-update-notifier prisma migrate deploy
USER nextjs
CMD ["node", "server.js"]