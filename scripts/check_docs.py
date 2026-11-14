#!/usr/bin/env python3
"""Check Markdown files for merge markers and broken local links."""

from pathlib import Path
import re
import sys
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
CONFLICT_MARKER = re.compile(r"^(<<<<<<<|=======|>>>>>>>)(?:\s|$)")
MARKDOWN_LINK = re.compile(r"!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))")
EXTERNAL_SCHEMES = ("http://", "https://", "mailto:", "data:")
QUIZ_QUESTION = re.compile(r"^Q(\d+)\s+-\s+Choose (ONE|ALL that apply)$", re.MULTILINE)
WEEK_MODULES = {
    1: "01-essentials",
    2: "02-linux",
    3: "03-bash",
    4: "04-git",
    5: "05-sdlc",
    6: "06-terraform",
    7: "07-ansible",
    8: "08-docker",
    9: "09-aws",
    10: "10-kubernetes",
    11: "11-cicd-observability",
    12: "12-capstone",
}
WEEK_CLASSES = {
    1: [
        "class-1-internet-networking-domain-dns.md",
        "class-2-app-architecture-vscode-ai-troubleshooting.md",
        "class-3-asking-questions-review.md",
    ],
    2: [
        "class-1-linux-intro-vm-setup-system.md",
        "class-2-files-permissions-users.md",
        "class-3-processes-networking-shell-scripting-project.md",
    ],
}


def markdown_files() -> list[Path]:
    return sorted(
        path
        for path in ROOT.rglob("*.md")
        if not {".git", "node_modules", ".terraform"}.intersection(
            path.relative_to(ROOT).parts
        )
    )


def check_file(path: Path) -> list[str]:
    errors = []
    text = path.read_text(encoding="utf-8")
    relative_path = path.relative_to(ROOT)

    for line_number, line in enumerate(text.splitlines(), start=1):
        if CONFLICT_MARKER.match(line):
            errors.append(f"{relative_path}:{line_number}: merge-conflict marker")

    for match in MARKDOWN_LINK.finditer(text):
        destination = (match.group(1) or match.group(2) or "").strip()
        if (
            not destination
            or destination.startswith("#")
            or destination.startswith(EXTERNAL_SCHEMES)
        ):
            continue

        local_path = unquote(destination.split("#", 1)[0].split("?", 1)[0])
        if not local_path:
            continue
        target = (path.parent / local_path).resolve()
        if not target.exists():
            errors.append(f"{relative_path}: broken local link: {destination}")

    return errors


def check_quiz(path: Path) -> list[str]:
    errors = []
    text = path.read_text(encoding="utf-8")
    questions = QUIZ_QUESTION.findall(text)
    relative_path = path.relative_to(ROOT)

    if len(questions) != 12:
        errors.append(f"{relative_path}: expected 12 questions, found {len(questions)}")
    if [int(number) for number, _ in questions] != list(range(1, 13)):
        errors.append(f"{relative_path}: question numbers must run from Q1 to Q12")
    if sum(kind == "ONE" for _, kind in questions) != 8:
        errors.append(f"{relative_path}: expected 8 single-answer questions")
    if sum(kind == "ALL that apply" for _, kind in questions) != 4:
        errors.append(f"{relative_path}: expected 4 multiple-answer questions")
    if "11 out of 12" not in text:
        errors.append(f"{relative_path}: pass score must state 11 out of 12")

    return errors


def check_course_structure() -> list[str]:
    errors = []
    for week, module_name in WEEK_MODULES.items():
        module = ROOT / "modules" / module_name
        classes = WEEK_CLASSES.get(
            week, ["class-1.md", "class-2.md", "class-3.md"]
        )
        required = [
            "00-overview.md",
            *classes,
            f"assignment-{week}.md",
            "troubleshooting.md",
            f"quiz-week-{week}.md",
        ]
        errors.extend(
            f"Week {week}: missing required lesson {module_name}/{filename}"
            for filename in required
            if not (module / filename).is_file()
        )
    return errors


def main() -> int:
    files = markdown_files()
    errors = [error for path in files for error in check_file(path)]
    quizzes = sorted(ROOT.glob("modules/**/quiz-week-*.md"))
    errors.extend(error for path in quizzes for error in check_quiz(path))
    if len(quizzes) != len(WEEK_MODULES):
        errors.append(
            f"expected {len(WEEK_MODULES)} weekly quizzes, found {len(quizzes)}"
        )
    errors.extend(check_course_structure())
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1

    print(
        f"Documentation checks passed ({len(files)} Markdown files, "
        f"{len(quizzes)} weekly quizzes)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
