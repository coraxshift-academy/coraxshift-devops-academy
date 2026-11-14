import { parseQuiz } from "./quiz-parser.mjs";

const weeks = [
  { n: 1, title: "Essentials", topic: "Internet, networking, and tools", icon: "⌁", folder: "01-essentials", description: "Follow a website request from your browser to a server. Meet DNS, IP, HTTP, and the CoraxReads architecture." },
  { n: 2, title: "Linux", topic: "Linux and Nginx", icon: "⌘", folder: "02-linux", description: "Get comfortable in a terminal, serve your practice page, read logs, and learn safe file permissions." },
  { n: 3, title: "Bash", topic: "Shell automation", icon: "›_", folder: "03-bash", description: "Automate a health check and a verified backup. Learn how to make scripts safer before they run." },
  { n: 4, title: "Git", topic: "Git and GitHub", icon: "⌥", folder: "04-git", description: "Work in branches, open a pull request, review changes, and safely practice resolving a conflict." },
  { n: 5, title: "SDLC", topic: "Plan, test, and release", icon: "◷", folder: "05-sdlc", description: "Turn an idea into a tested change. Write a release plan and know how to roll it back." },
  { n: 6, title: "Terraform", topic: "Infrastructure as code", icon: "▧", folder: "06-terraform", description: "Describe local Docker infrastructure, review a plan, and understand state without cloud costs." },
  { n: 7, title: "Ansible", topic: "Configuration automation", icon: "⚙", folder: "07-ansible", description: "Set up a practice server consistently and prove that running your playbook twice is safe." },
  { n: 8, title: "Docker", topic: "Containers and Compose", icon: "▣", folder: "08-docker", description: "Package CoraxReads and its database. Practice images, networks, health checks, and persistent data." },
  { n: 9, title: "AWS", topic: "Cloud foundations", icon: "☁", folder: "09-aws", description: "Understand identity, networking, and costs. Deploy only with instructor approval and a cleanup plan." },
  { n: 10, title: "Kubernetes", topic: "Local orchestration", icon: "⎈", folder: "10-kubernetes", description: "Run an app locally with Deployments, Services, probes, logs, and a practical runbook." },
  { n: 11, title: "CI/CD + observability", topic: "Delivery and operations", icon: "↗", folder: "11-cicd-observability", description: "Test each change, see how the app is behaving, and document a safe recovery path." },
  { n: 12, title: "Capstone", topic: "Integrate and present", icon: "✦", folder: "12-capstone", description: "Bring your work together, explain the design, demonstrate recovery, and celebrate what you built." },
];

const storageKey = "coraxshift-learning-v1";
const grid = document.querySelector("#week-grid");
const searchInput = document.querySelector("#course-search");
const searchResults = document.querySelector("#search-results");
const quizDialog = document.querySelector("#quiz-dialog");
const quizContent = document.querySelector("#quiz-content");
const siteStatus = document.querySelector("#site-status");
let searchIndex = [];
let learnerState = { name: "", results: {} };
let quizState = null;
let statusTimer;

function coursePageUrl(markdownPath) {
  return window.location.hostname.endsWith(".github.io")
    ? markdownPath.replace(/\.md(?=$|[?#])/, ".html")
    : markdownPath;
}

function renderStaticMarkdownLinks() {
  if (!window.location.hostname.endsWith(".github.io")) return;
  for (const link of document.querySelectorAll("a[href]")) {
    link.href = coursePageUrl(link.getAttribute("href"));
  }
}

function showStatus(message) {
  siteStatus.textContent = message;
  siteStatus.classList.add("visible");
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => siteStatus.classList.remove("visible"), 5000);
}

function readLearnerState() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return { name: "", results: {} };
    const state = JSON.parse(saved);
    if (!state || typeof state !== "object" || typeof state.name !== "string" || !state.results || typeof state.results !== "object") {
      throw new Error("Saved learner data has an unexpected format.");
    }
    for (const [week, result] of Object.entries(state.results)) {
      if (!/^(?:[1-9]|1[0-2])$/.test(week)
        || !result
        || !Number.isInteger(result.score)
        || result.score < 0
        || result.score > 12
        || typeof result.passed !== "boolean"
        || !Number.isInteger(result.attempts)
        || result.attempts < 1
        || typeof result.completedAt !== "string") {
        throw new Error("A saved quiz result is invalid.");
      }
    }
    return state;
  } catch (error) {
    showStatus(`Could not read local progress: ${error.message}`);
    return { name: "", results: {} };
  }
}

function saveLearnerState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(learnerState));
    renderProgress();
  } catch (error) {
    showStatus(`Progress could not be saved in this browser: ${error.message}`);
  }
}

function renderProgress() {
  const name = learnerState.name.trim();
  document.querySelector("#profile-greeting").textContent = name ? `Welcome back, ${name}!` : "Your learning journey";
  document.querySelector("#profile-avatar").textContent = name ? name[0].toUpperCase() : "?";
  document.querySelector("#learner-name").value = name;

  const passed = Object.values(learnerState.results).filter((result) => result.passed).length;
  const mostRecent = Object.entries(learnerState.results).sort((a, b) => b[1].completedAt.localeCompare(a[1].completedAt))[0];
  document.querySelector("#weeks-complete").textContent = String(passed);
  document.querySelector("#progress-fill").style.width = `${Math.min(100, (passed / weeks.length) * 100)}%`;
  document.querySelector("#last-score").textContent = mostRecent
    ? `Week ${mostRecent[0]} · ${mostRecent[1].score}/12`
    : "Start your first quiz";

  for (const card of grid.querySelectorAll("[data-week-card]")) {
    const result = learnerState.results[card.dataset.weekCard];
    const badge = card.querySelector(".week-progress");
    if (result?.passed) {
      badge.hidden = false;
      badge.textContent = "PASSED";
    } else {
      badge.hidden = true;
    }
  }
}

function makeLink(href, text, className) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  link.className = className;
  return link;
}

function renderWeeks() {
  for (const week of weeks) {
    const card = document.createElement("article");
    card.className = "week-card";
    card.dataset.weekCard = String(week.n);

    const top = document.createElement("div");
    top.className = "week-card-top";
    const number = document.createElement("span");
    number.className = "week-number";
    number.textContent = `WEEK ${String(week.n).padStart(2, "0")}`;
    const icon = document.createElement("span");
    icon.className = "week-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = week.icon;
    const passed = document.createElement("span");
    passed.className = "week-progress";
    passed.hidden = true;
    passed.setAttribute("aria-label", "Quiz passed");
    top.append(number, icon, passed);

    const heading = document.createElement("h3");
    heading.textContent = week.title;
    const description = document.createElement("p");
    description.textContent = week.description;
    const links = document.createElement("div");
    links.className = "week-links";
    links.append(
      makeLink(coursePageUrl(`../modules/${week.folder}/00-overview.md`), "Explore lessons →", ""),
    );
    const quizButton = document.createElement("button");
    quizButton.type = "button";
    quizButton.className = "quiz-launch";
    quizButton.dataset.quizWeek = String(week.n);
    quizButton.textContent = "Take quiz";
    links.append(quizButton);
    card.append(top, heading, description, links);
    grid.append(card);
  }
  renderProgress();
}

function excerpt(text, query) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const matchAt = normalized.toLowerCase().indexOf(query.toLowerCase());
  const start = Math.max(0, matchAt - 55);
  const end = Math.min(normalized.length, matchAt + query.length + 100);
  return `${start ? "…" : ""}${normalized.slice(start, end)}${end < normalized.length ? "…" : ""}`;
}

function renderSearch() {
  const query = searchInput.value.trim();
  searchResults.replaceChildren();
  if (query.length < 2) {
    searchResults.classList.remove("visible");
    return;
  }
  searchResults.classList.add("visible");
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = searchIndex.map((item) => {
    const title = item.title.toLowerCase();
    const text = `${title} ${item.text.toLowerCase()}`;
    const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 4 : text.includes(term) ? 1 : -100), 0);
    return { item, score };
  }).filter((result) => result.score > 0).sort((a, b) => b.score - a.score).slice(0, 10);

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "No matching lesson yet. Try a broader topic such as Linux, Git, AWS, or monitoring.";
    searchResults.append(empty);
    return;
  }

  for (const { item } of matches) {
    const link = document.createElement("a");
    link.className = "search-result";
    link.href = coursePageUrl(item.path);
    const title = document.createElement("strong");
    title.textContent = item.title;
    const week = document.createElement("small");
    week.textContent = item.week ? `WEEK ${String(item.week).padStart(2, "0")}` : "COURSE GUIDE";
    const preview = document.createElement("span");
    preview.textContent = excerpt(item.text, terms.find((term) => item.text.toLowerCase().includes(term)) ?? query);
    link.append(title, week, preview);
    searchResults.append(link);
  }
}

function selectionsFor(question) {
  return [...quizContent.querySelectorAll('input[name="answer"]:checked')]
    .map((input) => input.value)
    .sort();
}

function sameAnswers(selected, expected) {
  return selected.length === expected.length && selected.every((answer, index) => answer === [...expected].sort()[index]);
}

function renderQuestion() {
  const question = quizState.questions[quizState.index];
  quizState.checked = false;
  quizContent.replaceChildren();

  const progress = document.createElement("div");
  progress.className = "quiz-progress-label";
  const progressText = document.createElement("span");
  progressText.textContent = `QUESTION ${quizState.index + 1} OF ${quizState.questions.length}`;
  const progressScore = document.createElement("span");
  progressScore.textContent = `Correct so far: ${quizState.score}`;
  progress.append(progressText, progressScore);

  const track = document.createElement("div");
  track.className = "progress-track";
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-label", "Quiz question progress");
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", "12");
  track.setAttribute("aria-valuenow", String(quizState.index));
  const fill = document.createElement("span");
  fill.style.width = `${(quizState.index / quizState.questions.length) * 100}%`;
  track.append(fill);

  const prompt = document.createElement("h3");
  prompt.className = "quiz-question";
  prompt.textContent = question.prompt;
  const options = document.createElement("fieldset");
  options.className = "quiz-options";
  const legend = document.createElement("legend");
  legend.className = "visually-hidden";
  legend.textContent = question.kind === "single" ? "Choose one answer" : "Choose all answers that apply";
  options.append(legend);

  for (const option of question.options) {
    const label = document.createElement("label");
    label.className = "quiz-option";
    const input = document.createElement("input");
    input.type = question.kind === "single" ? "radio" : "checkbox";
    input.name = "answer";
    input.value = option.value;
    input.disabled = quizState.checked;
    const text = document.createElement("span");
    text.textContent = `${option.value}. ${option.text}`;
    label.append(input, text);
    options.append(label);
  }

  const hint = document.createElement("p");
  hint.className = "quiz-hint";
  hint.textContent = question.kind === "single" ? "Choose one answer." : "Choose every answer that applies.";
  quizContent.append(progress, track, prompt, options, hint);

  const controls = document.createElement("div");
  controls.className = "quiz-controls";
  const checkButton = document.createElement("button");
  checkButton.type = "button";
  checkButton.textContent = "Check my answer";
  checkButton.addEventListener("click", checkAnswer);
  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.disabled = true;
  nextButton.textContent = quizState.index === quizState.questions.length - 1 ? "See my score" : "Next question →";
  nextButton.addEventListener("click", moveNext);
  controls.append(checkButton, nextButton);
  quizContent.append(controls);
}

function checkAnswer() {
  if (quizState.checked) return;
  const question = quizState.questions[quizState.index];
  const selected = selectionsFor(question);
  if (!selected.length) {
    showStatus("Choose an answer before checking your work.");
    return;
  }

  quizState.checked = true;
  const correct = sameAnswers(selected, question.answers);
  if (correct) quizState.score += 1;
  for (const input of quizContent.querySelectorAll('input[name="answer"]')) input.disabled = true;

  const feedback = document.createElement("div");
  feedback.className = `quiz-feedback${correct ? "" : " incorrect"}`;
  const title = document.createElement("strong");
  title.textContent = correct ? "That's right!" : `Not quite. The answer${question.answers.length > 1 ? "s are" : " is"} ${question.answers.join(", ")}.`;
  const explanation = document.createElement("span");
  explanation.textContent = question.explanation;
  feedback.append(title, explanation);
  quizContent.insertBefore(feedback, quizContent.querySelector(".quiz-controls"));
  const checkButton = quizContent.querySelector(".quiz-controls button:first-child");
  checkButton.remove();
  quizContent.querySelector(".quiz-controls button").disabled = false;
}

function moveNext() {
  if (!quizState.checked) return;
  if (quizState.index < quizState.questions.length - 1) {
    quizState.index += 1;
    renderQuestion();
    return;
  }
  renderResult();
}

function renderResult() {
  const score = quizState.score;
  const passed = score >= 11;
  const previous = learnerState.results[String(quizState.week)];
  const result = {
    score,
    passed,
    attempts: (previous?.attempts ?? 0) + 1,
    completedAt: new Date().toISOString(),
  };
  learnerState.results[String(quizState.week)] = result;
  saveLearnerState();
  quizContent.replaceChildren();

  const panel = document.createElement("section");
  panel.className = "quiz-result";
  const badge = document.createElement("div");
  badge.className = "result-badge";
  badge.setAttribute("aria-hidden", "true");
  badge.textContent = passed ? "✦" : "↻";
  const heading = document.createElement("h3");
  heading.textContent = passed ? "You earned your badge!" : "Good practice makes progress.";
  const scoreText = document.createElement("div");
  scoreText.className = "result-score";
  scoreText.textContent = `${score}/12`;
  const message = document.createElement("p");
  message.textContent = passed
    ? `Week ${quizState.week} passed. Your result is saved in this browser. Take a moment to celebrate what you know now.`
    : `You need 11 out of 12 to pass. Your score is saved locally; review the explanations and try again when you're ready.`;
  const actions = document.createElement("div");
  actions.className = "result-actions";
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Back to my journey";
  closeButton.addEventListener("click", () => quizDialog.close());
  actions.append(closeButton);
  if (!passed && result.attempts < 2) {
    const retakeButton = document.createElement("button");
    retakeButton.type = "button";
    retakeButton.textContent = "Retake after review";
    retakeButton.addEventListener("click", () => {
      quizState.index = 0;
      quizState.score = 0;
      renderQuestion();
    });
    actions.append(retakeButton);
  }
  panel.append(badge, heading, scoreText, message, actions);
  quizContent.append(panel);
}

async function openQuiz(weekNumber) {
  const week = weeks.find((item) => item.n === weekNumber);
  if (!week) {
    showStatus("That weekly quiz could not be found.");
    return;
  }
  document.querySelector("#quiz-title").textContent = `Week ${weekNumber}: ${week.title}`;
  const previous = learnerState.results[String(weekNumber)];
  if (previous?.passed || previous?.attempts >= 2) {
    quizContent.textContent = previous.passed
      ? `You already passed this quiz with ${previous.score}/12. Your result is saved in this browser.`
      : "Both attempts are complete. Review the weekly lessons and explanations before moving on.";
    quizDialog.showModal();
    return;
  }
  quizContent.textContent = "Loading the quiz…";
  quizDialog.showModal();
  try {
    const response = await fetch(`../modules/${week.folder}/quiz-week-${weekNumber}.md`);
    if (!response.ok) throw new Error(`The quiz could not be loaded (HTTP ${response.status}).`);
    const questions = parseQuiz(await response.text());
    quizState = { week: weekNumber, questions, index: 0, score: 0, checked: false };
    renderQuestion();
  } catch (error) {
    quizContent.textContent = `Quiz unavailable: ${error.message} Check the local preview instructions and reload the page.`;
    showStatus(`Could not open the Week ${weekNumber} quiz.`);
  }
}

function exportProgress() {
  const report = {
    format: "coraxshift-local-progress",
    version: 1,
    exportedAt: new Date().toISOString(),
    learner: learnerState.name || null,
    results: learnerState.results,
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "coraxshift-progress.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showStatus("Progress exported. Keep the file somewhere private if it includes a nickname.");
}

async function loadSearchIndex() {
  try {
    const response = await fetch("./search-index.json");
    if (!response.ok) throw new Error(`Search index returned HTTP ${response.status}.`);
    searchIndex = await response.json();
  } catch (error) {
    showStatus(`Course search is unavailable: ${error.message}`);
  }
}

renderStaticMarkdownLinks();
renderWeeks();
learnerState = readLearnerState();
renderProgress();
loadSearchIndex();
searchInput.addEventListener("input", renderSearch);
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz-week]");
  if (button) openQuiz(Number(button.dataset.quizWeek));
});
document.querySelector("#close-quiz").addEventListener("click", () => quizDialog.close());
document.querySelector("#profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  learnerState.name = document.querySelector("#learner-name").value.trim().slice(0, 32);
  saveLearnerState();
  showStatus(learnerState.name ? "Nickname saved on this device." : "Nickname cleared from this device.");
});
document.querySelector("#export-progress").addEventListener("click", exportProgress);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    renderSearch();
  }
});
