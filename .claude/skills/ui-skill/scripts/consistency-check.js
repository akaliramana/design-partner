#!/usr/bin/env node
/**
 * Design Consistency Helper
 *
 * Flags obvious design drift that grep can reliably catch:
 * - Hex colors not in the design system tokens
 * - Arbitrary spacing values off the 4px grid
 *
 * This is a helper, not an enforcer. Semantic consistency (same-role
 * buttons matching, component family radius, etc.) requires visual
 * review — Claude does that by reading code and reviewing screenshots.
 *
 * Usage:
 *   node consistency-check.js --src src/ --tokens design-system/MASTER.md
 *   node consistency-check.js --src src/ --css src/app/globals.css
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
let srcDir = "src";
let tokensFile = null;
let cssFile = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--src" && args[i + 1]) srcDir = args[++i];
  if (args[i] === "--tokens" && args[i + 1]) tokensFile = args[++i];
  if (args[i] === "--css" && args[i + 1]) cssFile = args[++i];
}

// Extract known colors from CSS or MASTER.md
function extractKnownColors(file) {
  if (!file || !fs.existsSync(file)) return new Set();
  const content = fs.readFileSync(file, "utf-8");
  const colors = new Set();
  const hexPattern = /#[0-9A-Fa-f]{6}/g;
  let match;
  while ((match = hexPattern.exec(content)) !== null) {
    colors.add(match[0].toUpperCase());
  }
  return colors;
}

// Recursively find .tsx/.jsx/.css files
function findFiles(dir, exts) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      results.push(...findFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

// Check for hardcoded hex colors not in token set
function checkHardcodedColors(files, knownColors) {
  const issues = [];
  const hexInCode = /#[0-9A-Fa-f]{6}/g;
  const ignore = new Set(["#000000", "#FFFFFF"]);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let match;
      hexInCode.lastIndex = 0;
      while ((match = hexInCode.exec(lines[i])) !== null) {
        const color = match[0].toUpperCase();
        if (!knownColors.has(color) && !ignore.has(color)) {
          // Skip CSS variable definitions (those ARE the tokens)
          if (lines[i].includes("--") && lines[i].includes(":")) continue;
          // Skip comments
          if (lines[i].trim().startsWith("//") || lines[i].trim().startsWith("*")) continue;
          issues.push({
            file: path.relative(".", file),
            line: i + 1,
            value: match[0],
          });
        }
      }
    }
  }
  return issues;
}

// Check for arbitrary spacing values off the 4px grid
function checkSpacingDrift(files) {
  const arbitrarySpacing = /(?:p|m|gap|space)-\[(\d+)px\]/g;
  const issues = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let match;
      arbitrarySpacing.lastIndex = 0;
      while ((match = arbitrarySpacing.exec(lines[i])) !== null) {
        const px = parseInt(match[1]);
        if (px % 4 !== 0) {
          issues.push({
            file: path.relative(".", file),
            line: i + 1,
            value: match[0],
            px,
          });
        }
      }
    }
  }
  return issues;
}

// --- Main ---
const knownColors = extractKnownColors(tokensFile || cssFile);
const files = findFiles(srcDir, [".tsx", ".jsx", ".css"]);

console.log(`Design Consistency Helper — ${files.length} files scanned\n`);

if (knownColors.size === 0) {
  console.log("Note: No token file provided. Color check will flag ALL hardcoded hex values.");
  console.log("  Use --css <path> or --tokens <path> to provide your design tokens.\n");
}

const colorIssues = checkHardcodedColors(files, knownColors);
const spacingIssues = checkSpacingDrift(files);

if (colorIssues.length > 0) {
  console.log(`Hardcoded colors outside tokens (${colorIssues.length}):`);
  for (const issue of colorIssues.slice(0, 15)) {
    console.log(`  ${issue.file}:${issue.line} — ${issue.value}`);
  }
  if (colorIssues.length > 15) console.log(`  ... and ${colorIssues.length - 15} more`);
  console.log();
}

if (spacingIssues.length > 0) {
  console.log(`Off-grid spacing (${spacingIssues.length}):`);
  for (const issue of spacingIssues.slice(0, 15)) {
    console.log(`  ${issue.file}:${issue.line} — ${issue.value} (${issue.px}px is not on 4px grid)`);
  }
  if (spacingIssues.length > 15) console.log(`  ... and ${spacingIssues.length - 15} more`);
  console.log();
}

const total = colorIssues.length + spacingIssues.length;
if (total === 0) {
  console.log("No obvious drift found.");
} else {
  console.log(`${total} item(s) flagged. Review manually — some may be intentional.`);
}

console.log("\nNote: This helper catches what grep can catch (hardcoded colors, off-grid spacing).");
console.log("Semantic consistency (same-role buttons, component families, spacing rhythm)");
console.log("requires visual review — check screenshots across pages.");
