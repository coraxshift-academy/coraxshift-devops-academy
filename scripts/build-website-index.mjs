import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const websiteDirectory = path.join(root, "website");
const outputPath = path.join(websiteDirectory, "search-index.json");
const includeTopLevel = ["README.md", "curriculum.md", "PORTFOLIO-GUIDE.md", "CLOUD-ARCHITECTURES.md", "OPEN-SOURCE-PROJECTS.md"];

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(entryPath));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(entryPath);
  }
  return files;
}

function plainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/[*_>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const files = [
  ...await markdownFiles(path.join(root, "modules")),
  ...includeTopLevel.map((name) => path.join(root, name)),
].sort();
const index = [];

for (const filePath of files) {
  const markdown = await readFile(filePath, "utf8");
  const relativePath = path.relative(websiteDirectory, filePath).split(path.sep).join("/");
  const firstHeading = markdown.match(/^#\s+(.+)$/m);
  const title = firstHeading?.[1].replace(/\*\*/g, "").trim() ?? path.basename(filePath, ".md");
  const moduleName = filePath.split(path.sep).includes("modules")
    ? path.relative(path.join(root, "modules"), filePath).split(path.sep)[0]
    : "";
  const week = moduleName ? Number(moduleName.slice(0, 2)) : null;
  index.push({ title, path: relativePath, week, text: plainText(markdown) });
}

const content = `${JSON.stringify(index, null, 2)}\n`;
if (process.argv.includes("--check")) {
  let existing;
  try {
    existing = await readFile(outputPath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (existing !== content) {
    console.error("website/search-index.json is stale. Run: node scripts/build-website-index.mjs");
    process.exitCode = 1;
  } else {
    console.log(`Website search index is current (${index.length} documents).`);
  }
} else {
  await writeFile(outputPath, content);
  console.log(`Generated website/search-index.json (${index.length} documents).`);
}
