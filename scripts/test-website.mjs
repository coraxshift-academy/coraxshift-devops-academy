import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parseQuiz } from "../website/quiz-parser.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (let week = 1; week <= 12; week += 1) {
  test(`Week ${week} quiz parses as 12 answerable questions`, async () => {
    const directories = await readdir(path.join(root, "modules"));
    const moduleDirectory = directories.find((directory) => directory.startsWith(`${String(week).padStart(2, "0")}-`));
    assert.ok(moduleDirectory, `Week ${week} module directory exists`);
    const sourcePath = path.join(root, "modules", moduleDirectory, `quiz-week-${week}.md`);
    const questions = parseQuiz(await readFile(sourcePath, "utf8"));
    assert.deepEqual(questions.map((question) => question.number), Array.from({ length: 12 }, (_, index) => index + 1));
    assert.equal(questions.filter((question) => question.kind === "single").length, 8);
    assert.equal(questions.filter((question) => question.kind === "multiple").length, 4);
    for (const question of questions) {
      assert.equal(question.options.length, 4);
      assert.ok(question.explanation.length > 0);
    }
  });
}

test("search index points only to existing course documents", async () => {
  const index = JSON.parse(await readFile(path.join(root, "website/search-index.json"), "utf8"));
  assert.ok(index.length >= 90);
  for (const document of index) {
    const target = path.resolve(root, "website", document.path);
    assert.ok(target.startsWith(`${root}${path.sep}`), `search path remains inside the repository: ${document.path}`);
    await access(target);
  }
});

test("quiz parser rejects incomplete source instead of hiding missing answers", () => {
  assert.throws(() => parseQuiz("Q1 - Choose ONE\nA prompt without the full quiz."), /Expected 12 quiz questions/);
});
