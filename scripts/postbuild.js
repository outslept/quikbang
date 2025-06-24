import { mkdirSync, copyFileSync, existsSync } from "fs";
import { dirname } from "path";

const source = "data/bang-index.json";
const target = "dist/data/bang-index.json";

mkdirSync(dirname(target), { recursive: true });

if (existsSync(source)) {
  copyFileSync(source, target);
  console.log(`Copied ${source} to ${target}`);
} else {
  console.warn(`Source file ${source} not found`);
}
