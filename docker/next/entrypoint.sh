#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  npm install
 
fi
 npx --no-update-notifier prisma migrate deploy
exec "$@"