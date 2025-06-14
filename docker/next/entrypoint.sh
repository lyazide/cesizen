#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  npm install
 
fi
echo "Generating Prisma Client..."
npx --no-update-notifier prisma generate

echo "Applying Prisma migrations..."
npx --no-update-notifier prisma migrate deploy

exec "$@"