#!/usr/bin/env node
/**
 * Visual Check — Takes screenshots at multiple breakpoints using Playwright.
 *
 * Usage:
 *   node visual-check.js --url http://localhost:3001/home --output .ui-skill/screenshots
 *   node visual-check.js --manifest .ui-skill/manifest.json --port 3001 --output .ui-skill/screenshots
 *
 * Dependencies:
 *   npm install -D playwright && npx playwright install chromium
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BREAKPOINTS = {
  mobile:  { width: 375,  height: 812,  label: '375px (Mobile)' },
  tablet:  { width: 768,  height: 1024, label: '768px (Tablet)' },
  desktop: { width: 1440, height: 900,  label: '1440px (Desktop)' },
};

async function screenshotUrl(browser, url, outputDir, pageName) {
  const results = [];

  for (const [bp, { width, height, label }] of Object.entries(BREAKPOINTS)) {
    const page = await browser.newPage({ viewport: { width, height } });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      // Wait a moment for any client-side rendering
      await page.waitForTimeout(1000);

      const filename = `${pageName}-${bp}.png`;
      const filepath = path.join(outputDir, filename);
      await page.screenshot({ path: filepath, fullPage: true });
      results.push({ page: pageName, breakpoint: bp, label, file: filepath });
      console.log(`  ✓ ${pageName} @ ${label} → ${filename}`);
    } catch (err) {
      console.error(`  ✗ ${pageName} @ ${label} — ${err.message}`);
      results.push({ page: pageName, breakpoint: bp, label, error: err.message });
    } finally {
      await page.close();
    }
  }

  return results;
}

async function main() {
  const args = process.argv.slice(2);

  let urls = [];
  let outputDir = '.ui-skill/screenshots';
  let port = '3001';

  // Parse args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      urls.push({ url: args[++i], name: new URL(args[i]).pathname.replace(/\//g, '-').replace(/^-/, '') || 'home' });
    } else if (args[i] === '--manifest' && args[i + 1]) {
      const manifest = JSON.parse(fs.readFileSync(args[++i], 'utf-8'));
      for (const [pageId, pageData] of Object.entries(manifest.pages || {})) {
        const route = pageId === 'home' ? '/home' : `/${pageId}`;
        urls.push({ url: `http://localhost:${port}${route}`, name: pageId });
      }
    } else if (args[i] === '--port' && args[i + 1]) {
      port = args[++i];
    } else if (args[i] === '--output' && args[i + 1]) {
      outputDir = args[++i];
    }
  }

  if (urls.length === 0) {
    console.log('Usage:');
    console.log('  node visual-check.js --url http://localhost:3001/home --output .ui-skill/screenshots');
    console.log('  node visual-check.js --manifest .ui-skill/manifest.json --port 3001 --output .ui-skill/screenshots');
    process.exit(1);
  }

  // Create output directory
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`\nVisual Check — ${urls.length} page(s) × ${Object.keys(BREAKPOINTS).length} breakpoints\n`);

  const browser = await chromium.launch();
  const allResults = [];

  for (const { url, name } of urls) {
    console.log(`${name} (${url}):`);
    const results = await screenshotUrl(browser, url, outputDir, name);
    allResults.push(...results);
  }

  await browser.close();

  // Summary
  const success = allResults.filter(r => !r.error).length;
  const failed = allResults.filter(r => r.error).length;
  console.log(`\n${success} screenshots taken, ${failed} failed`);
  console.log(`Output: ${outputDir}/`);

  if (success > 0) {
    console.log(`\nReview the screenshots to verify:`);
    console.log(`  - Layout adapts correctly at each breakpoint`);
    console.log(`  - No visual issues (spacing, hierarchy, overflow)`);
    console.log(`  - Design matches the intended style (no AI-slop)`);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  if (err.message.includes('Cannot find module')) {
    console.log('\nPlaywright not installed. Run:');
    console.log('  npm install -D playwright && npx playwright install chromium');
  }
  process.exit(1);
});
