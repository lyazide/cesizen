#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  npm install
  npx --no-update-notifier prisma migrate deploy
fi

exec "$@"