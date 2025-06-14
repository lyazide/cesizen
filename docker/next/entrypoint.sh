#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  npm install
 
fi
if [ -d "/app/.next/server/app/Diagnostics" ]; then
    mv /app/.next/server/app/Diagnostics /app/.next/server/app/diagnostics
    chown -R nextjs:nodejs /app/.next/server/app/diagnostics
fi

echo "Generating Prisma Client..."
npx --no-update-notifier prisma generate

echo "Applying Prisma migrations..."
npx --no-update-notifier prisma migrate deploy

exec "$@"