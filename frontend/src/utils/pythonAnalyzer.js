// src/utils/pythonAnalyzer.js
import { executePythonCode } from "./pythonExecutor";

export function analyzePythonVariable(code, task) {
  if (!task) {
    return {
      correct: false,
      output: '',
      expected: '',
      feedback: ['No task data available']
    };
  }

  const actualOutput = executePythonCode(code);

  const expectedOutput = (
    task.expectedOutput ||
    task.expected_output ||
    ''
  ).trim();

  const correct = actualOutput === expectedOutput;

  let feedback = [];

  if (!code.includes('=')) {
    feedback.push("Missing variable assignment");
  }

  if (!code.includes('print')) {
    feedback.push("Missing print statement");
  }

  if (!correct) {
    feedback.push(`Expected "${expectedOutput}" but got "${actualOutput}"`);
  }

  return {
    correct,
    output: actualOutput,
    expected: expectedOutput,
    feedback
  };
}