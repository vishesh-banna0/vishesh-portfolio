// Breakpoint screenshots for visual QA (no browser MCP available in this env).
// Usage: node scripts/screenshot.mjs [outDir] [url]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const outDir = process.argv[2] || 'screenshots';
const base = process.argv[3] || process.env.URL || 'http://localhost:3000';
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'desktop', width: 1440, height: 900 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000); // let the denoise field resolve
  await page.screenshot({ path: `${outDir}/${vp.name}-hero.png` });
  // Scroll through the page so on-scroll reveals fire, then return to top.
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += window.innerHeight * 0.8;
          if (y < document.body.scrollHeight) setTimeout(step, 140);
          else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 400);
          }
        };
        step();
      }),
  );
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${vp.name}-full.png`, fullPage: true });
  await context.close();
  console.log(`captured ${vp.name}`);
}
await browser.close();
console.log('done');
