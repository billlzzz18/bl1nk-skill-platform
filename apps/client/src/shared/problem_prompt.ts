import type { ProblemReport } from "../ipc/ipc_types";

/**
 * Create a prompt for the AI to fix TypeScript/JavaScript problems
 * @param problemReport - The report containing problems to fix
 * @returns A formatted prompt string
 */
export function createProblemFixPrompt(problemReport: ProblemReport): string {
  if (problemReport.problems.length === 0) {
    return "No TypeScript problems detected.";
  }

  const problems = problemReport.problems;
  const problemCount = problems.length;

  let prompt = `Fix these ${problemCount} TypeScript compile-time error${problemCount === 1 ? '' : 's'}:\n\n`;

  for (let i = 0; i < problems.length; i++) {
    const problem = problems[i];
    prompt += `${i + 1}. ${problem.file}:${problem.line}:${problem.column} - ${problem.message} (TS${problem.code})\n`;
    if (problem.snippet && problem.snippet.trim()) {
      prompt += `\`\`\`\n${problem.snippet}\n\`\`\`\n`;
    }
  }

  prompt += `\nPlease fix all errors in a concise way.`;

  return prompt;
}