import Parser from "rss-parser";
import fs from "fs";

const parser = new Parser();

const feeds = {
  "Next.js": "https://github.com/vercel/next.js/releases.atom",
  "Prisma": "https://github.com/prisma/prisma/releases.atom",
  "Jest": "https://github.com/facebook/jest/releases.atom",
  "Cypress": "https://github.com/cypress-io/cypress/releases.atom",
  "Docker Compose": "https://github.com/docker/compose/releases.atom",
  "Traefik": "https://github.com/traefik/traefik/releases.atom",
  "Chakra UI": "https://github.com/chakra-ui/chakra-ui/releases.atom"
};

(async () => {
  let markdown = "# 🧭 Veille Technologique\n\n";

  for (const [name, url] of Object.entries(feeds)) {
    const feed = await parser.parseURL(url);
    markdown += `## 🔧 ${name}\n\n`;

    feed.items.slice(0, 3).forEach(item => {
      const line = `- [${item.title}](${item.link}) — ${item.pubDate}`;
      markdown += line + "\n";
      console.log(`[${name}] ${line}`);
    });

    markdown += "\n";
  }

  fs.writeFileSync("veille-techno.md", markdown);

  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) {
    fs.writeFileSync(summaryPath, markdown);
  }
})();