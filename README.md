npx create-next-app@latest

npm install prisma --save-dev

npx prisma init --datasource-provider postgresql

npx prisma migrate dev

node .\scripts\populateDiagnostics.js

node .\scripts\populateEmotions.js 

node .\scripts\populateRespirations.js 