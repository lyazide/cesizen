
# syntax=docker.io/docker/dockerfile:1

# Installation de base avec paquets
FROM node:24.2-alpine3.21 AS base
WORKDIR /app
## Utilisation de la recommendation du lien 
## https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
##  qui décrit pourquoi libc6-compat peut être necessaire.
RUN apk add --no-cache libc6-compat

# Installation des dependences lorsque cela est necessaire
FROM base AS deps
# Installation propore "clean install" en fonction du gestionnaire de paquets préféré
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile non trouvé." && exit 1; \
    fi

# Buold de l'application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
## Installation des dependences en fonction du gestionnaire de paquets préféré
RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile non trouvé." && exit 1; \
    fi

## Création de l'image finale optimisée pour la production
FROM node:24.2-alpine3.21 AS next

LABEL org.opencontainers.image.source=https://github.com/lyazide/cesizen
ENV DATABASE_URL="postgresql://postgres:Rebecca151205@postgres:5432/cesizen?schema=public"
ENV NEXTAUTH_URL=http://ec2-107-23-85-12.compute-1.amazonaws.com
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client


ENV CHECKPOINT_DISABLE=1

## désactive la collect de donnée de Prisma
ENV DISABLE_PRISMA_TELEMETRY=true 

ENV NEXTAUTH_SECRET="mysecret"

EXPOSE 3000

COPY docker/next/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint

ENV PORT=3000

ENTRYPOINT [ "entrypoint" ]

ENV HOSTNAME="0.0.0.0"

USER nextjs
CMD ["node", "server.js"]