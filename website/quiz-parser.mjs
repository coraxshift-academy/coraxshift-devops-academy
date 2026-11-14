const QUESTION_HEADER = /^Q(\d+)\s+-\s+Choose (ONE|ALL that apply)\s*$/gm;
const OPTION_LINE = /^([A-D])\.\s+(.+)$/gm;
const ANSWER_LINE = /^Answers?:\s*([A-D](?:,\s*[A-D])*)\.\s*Explanation:\s*(.+)$/m;

export function parseQuiz(markdown) {
  const headers = [...markdown.matchAll(QUESTION_HEADER)];
  if (headers.length !== 12) {
    throw new Error(`Expected 12 quiz questions; found ${headers.length}.`);
  }

  return headers.map((header, index) => {
    const start = header.index + header[0].length;
    const end = headers[index + 1]?.index ?? markdown.length;
    const section = markdown.slice(start, end);
    const lines = section.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const prompt = lines.find((line) => !/^[A-D]\.\s/.test(line) && !/^Answers?:/.test(line));
    const options = [...section.matchAll(OPTION_LINE)].map((match) => ({
      value: match[1],
      text: match[2].trim(),
    }));
    const answer = section.match(ANSWER_LINE);
    const answers = answer ? answer[1].split(/,\s*/) : [];

    if (!prompt || options.length !== 4 || !answer || !answers.length) {
      throw new Error(`Question ${header[1]} is missing its prompt, four options, or answer explanation.`);
    }
    if (new Set(answers).size !== answers.length || answers.some((value) => !options.some((option) => option.value === value))) {
      throw new Error(`Question ${header[1]} has an invalid answer key.`);
    }
    if ((header[2] === "ONE") !== (answers.length === 1)) {
      throw new Error(`Question ${header[1]} answer count does not match its question type.`);
    }

    return {
      number: Number(header[1]),
      kind: header[2] === "ONE" ? "single" : "multiple",
      prompt,
      options,
      answers,
      explanation: answer[2].trim(),
    };
  });
}
