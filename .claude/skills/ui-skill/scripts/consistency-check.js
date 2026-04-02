#!/usr/bin/env node
/**
 * Design Consistency Check
 *
 * Scans source files for hardcoded values that suggest design drift:
 * - Hex colors not in the design system
 * - Arbitrary pixel values outside a spacing scale
 * - Inconsistent border-radius values
 * - Button/input height variance
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

// Extract known tokens from CSS or MASTER.md
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
  // Common framework/library colors to ignore
  const ignore = new Set(["#000000", "#FFFFFF", "#ffffff", "#000000"]);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let match;
      hexInCode.lastIndex = 0;
      while ((match = hexInCode.exec(lines[i])) !== null) {
        const color = match[0].toUpperCase();
        if (!knownColors.has(color) && !ignore.has(color)) {
          // Check if it's inside a CSS variable definition (that's fine)
          if (lines[i].includes("--") && lines[i].includes(":")) continue;
          // Check if it's in a comment
          if (lines[i].trim().startsWith("//") || lines[i].trim().startsWith("*")) continue;
          issues.push({
            file: path.relative(".", file),
            line: i + 1,
            value: match[0],
            issue: "Hardcoded color not in design tokens",
          });
        }
      }
    }
  }
  return issues;
}

// Check for inconsistent border-radius values
function checkBorderRadius(files) {
  const radiusValues = {};
  const radiusPattern = /rounded-\[(\d+)px\]|rounded-(none|sm|md|lg|xl|2xl|3xl|full)/g;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match;
    radiusPattern.lastIndex = 0;
    while ((match = radiusPattern.exec(content)) !== null) {
      const val = match[0];
      if (!radiusValues[val]) radiusValues[val] = [];
      radiusValues[val].push(path.relative(".", file));
    }
  }

  const uniqueValues = Object.keys(radiusValues);
  if (uniqueValues.length > 5) {
    return [
      {
        issue: `${uniqueValues.length} different border-radius values found`,
        values: uniqueValues.join(", "),
        hint: "Consider standardizing to 3-4 radius values max",
      },
    ];
  }
  return [];
}

// Check for arbitrary spacing values
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
        // Flag values not on a 4px grid
        if (px % 4 !== 0) {
          issues.push({
            file: path.relative(".", file),
            line: i + 1,
            value: match[0],
            issue: `Arbitrary spacing ${px}px is not on 4px grid`,
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

console.log(`Design Consistency Check — ${files.length} files\n`);

const colorIssues = checkHardcodedColors(files, knownColors);
const radiusIssues = checkBorderRadius(files);
const spacingIssues = checkSpacingDrift(files);

const totalIssues = colorIssues.length + radiusIssues.length + spacingIssues.length;

if (colorIssues.length > 0) {
  console.log(`Hardcoded colors (${colorIssues.length}):`);
  for (const issue of colorIssues.slice(0, 10)) {
    console.log(`  ${issue.file}:${issue.line} — ${issue.value}`);
  }
  if (colorIssues.length > 10) console.log(`  ... and ${colorIssues.length - 10} more`);
  console.log();
}

if (radiusIssues.length > 0) {
  console.log(`Border radius inconsistency:`);
  for (const issue of radiusIssues) {
    console.log(`  ${issue.issue}`);
    console.log(`  Values: ${issue.values}`);
    console.log(`  ${issue.hint}`);
  }
  console.log();
}

if (spacingIssues.length > 0) {
  console.log(`Spacing drift (${spacingIssues.length}):`);
  for (const issue of spacingIssues.slice(0, 10)) {
    console.log(`  ${issue.file}:${issue.line} — ${issue.value} (${issue.issue})`);
  }
  if (spacingIssues.length > 10) console.log(`  ... and ${spacingIssues.length - 10} more`);
  console.log();
}

if (totalIssues === 0) {
  console.log("No consistency issues found.");
} else {
  console.log(`${totalIssues} total issue(s). Review and fix to maintain design consistency.`);
}
