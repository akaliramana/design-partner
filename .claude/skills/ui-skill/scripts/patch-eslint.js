#!/usr/bin/env node
/**
 * Patch ESLint config to ignore .claude/** directory.
 * Handles multiple ESLint config formats:
 *   - eslint.config.mjs (flat config with defineConfig + globalIgnores — Next.js 16+)
 *   - eslint.config.mjs (flat config with array export)
 *   - .eslintrc.json (legacy)
 *   - .eslintignore (legacy)
 *
 * Usage: node patch-eslint.js /path/to/project
 *
 * Exit codes:
 *   0 = success (patched or already ignored)
 *   1 = no ESLint config found (warning, not error)
 *   2 = patch failed
 */

const fs = require("fs");
const path = require("path");

const target = process.argv[2];
if (!target) {
  console.error("Usage: node patch-eslint.js /path/to/project");
  process.exit(2);
}

const MARKER = ".claude";

// --- Helper: check if content already ignores .claude ---
function alreadyIgnored(content) {
  return content.includes(".claude");
}

// --- Strategy 1: eslint.config.mjs (flat config) ---
function patchFlatConfig(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (alreadyIgnored(content)) {
    console.log("PATCHED: .claude already in " + path.basename(filePath));
    return true;
  }

  // Pattern A: globalIgnores([...]) — Next.js 16+ with defineConfig
  const globalIgnoresRe = /globalIgnores\(\[\s*\n/;
  if (globalIgnoresRe.test(content)) {
    content = content.replace(
      globalIgnoresRe,
      'globalIgnores([\n    ".claude/**",\n'
    );
    fs.writeFileSync(filePath, content);
    console.log("PATCHED: Added .claude/** to globalIgnores in " + path.basename(filePath));
    return true;
  }

  // Pattern B: defineConfig([...]) without globalIgnores
  const defineConfigRe = /defineConfig\(\[\s*\n/;
  if (defineConfigRe.test(content)) {
    content = content.replace(
      defineConfigRe,
      'defineConfig([\n  { ignores: [".claude/**"] },\n'
    );
    fs.writeFileSync(filePath, content);
    console.log("PATCHED: Added .claude/** ignores to defineConfig in " + path.basename(filePath));
    return true;
  }

  // Pattern C: export default [...] (plain array)
  const exportArrayRe = /export\s+default\s+\[/;
  if (exportArrayRe.test(content)) {
    content = content.replace(
      exportArrayRe,
      'export default [\n  { ignores: [".claude/**"] },'
    );
    fs.writeFileSync(filePath, content);
    console.log("PATCHED: Added .claude/** ignores to exported array in " + path.basename(filePath));
    return true;
  }

  // Pattern D: export default <variable> (variable reference)
  const exportVarRe = /export\s+default\s+(\w+)\s*;/;
  const match = content.match(exportVarRe);
  if (match) {
    const varName = match[1];
    content = content.replace(
      exportVarRe,
      `export default [{ ignores: [".claude/**"] }, ...${varName}];`
    );
    fs.writeFileSync(filePath, content);
    console.log("PATCHED: Wrapped " + varName + " with .claude/** ignores in " + path.basename(filePath));
    return true;
  }

  console.error("FAILED: Could not patch " + path.basename(filePath) + " — unrecognized format");
  return false;
}

// --- Strategy 2: .eslintrc.json (legacy) ---
function patchLegacyJson(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (alreadyIgnored(content)) {
    console.log("PATCHED: .claude already in " + path.basename(filePath));
    return true;
  }

  try {
    const config = JSON.parse(content);
    if (!config.ignorePatterns) {
      config.ignorePatterns = [];
    }
    config.ignorePatterns.push(".claude/**");
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + "\n");
    console.log("PATCHED: Added .claude/** to ignorePatterns in " + path.basename(filePath));
    return true;
  } catch (e) {
    console.error("FAILED: Could not parse " + path.basename(filePath));
    return false;
  }
}

// --- Strategy 3: .eslintignore ---
function patchEslintIgnore(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    if (alreadyIgnored(content)) {
      console.log("PATCHED: .claude already in .eslintignore");
      return true;
    }
    fs.appendFileSync(filePath, "\n.claude/\n");
  } else {
    fs.writeFileSync(filePath, ".claude/\n");
  }
  console.log("PATCHED: Added .claude/ to .eslintignore");
  return true;
}

// --- Main ---
const flatConfigs = ["eslint.config.mjs", "eslint.config.js", "eslint.config.cjs"];
const legacyConfigs = [".eslintrc.json", ".eslintrc.js", ".eslintrc.cjs", ".eslintrc.yml", ".eslintrc.yaml"];

let patched = false;

// Try flat config first
for (const name of flatConfigs) {
  const filePath = path.join(target, name);
  if (fs.existsSync(filePath)) {
    patched = patchFlatConfig(filePath);
    break;
  }
}

// Try legacy config
if (!patched) {
  for (const name of legacyConfigs) {
    const filePath = path.join(target, name);
    if (fs.existsSync(filePath)) {
      if (name.endsWith(".json")) {
        patched = patchLegacyJson(filePath);
      } else {
        // For JS/YML legacy configs, fall back to .eslintignore
        patched = patchEslintIgnore(path.join(target, ".eslintignore"));
      }
      break;
    }
  }
}

// Fallback: create .eslintignore
if (!patched) {
  // Check if there's any ESLint config at all
  const hasAnyConfig = [...flatConfigs, ...legacyConfigs].some((name) =>
    fs.existsSync(path.join(target, name))
  );
  if (hasAnyConfig) {
    patched = patchEslintIgnore(path.join(target, ".eslintignore"));
  } else {
    console.log("SKIPPED: No ESLint config found");
    process.exit(1);
  }
}

process.exit(patched ? 0 : 2);
