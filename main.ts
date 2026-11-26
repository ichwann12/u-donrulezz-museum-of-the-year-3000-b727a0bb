// Museum of the Year 3000 — a single museum label from the year 3000,
// placed next to an ordinary object from today.
// Node 22, standard library only. No network access, no wall clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// The entry text lives in entry.txt at the repo root.
// It must be a single line of at most 200 characters.
const line = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();

if (line.includes("\n") || line.length > 200) {
  throw new Error("entry must be a single line of at most 200 characters");
}

// Output goes to the directory the make.fun harness provides.
// MAKEFUN_OUTPUT_DIR wins: in the grader MAKEFUN_BOT_DIR points at the
// read-only repo (/bot), so writing there dies with EACCES.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(here, "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "output.txt"), line + "\n", "utf8");

console.log(line);
