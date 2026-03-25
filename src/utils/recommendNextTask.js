// src/utils/recommendNextTask.js
export function recommendNextTask(attempts, timeSpent, success, currentTaskIndex) {
  const totalTasks = 3;
  
  if (success && attempts <= 2 && timeSpent < 60) {
    // Good performance → Next task
    if (currentTaskIndex < totalTasks - 1) {
      return `Next: Task ${currentTaskIndex + 2}`;
    }
    return "🎉 Variables Mastered!";
  }
  
  if (success && attempts <= 3) {
    return `Practice: Task ${currentTaskIndex + 1}`;
  }
  
  if (!success && attempts < 3) {
    return `Repeat: Task ${currentTaskIndex + 1}`;
  }
  
  return "Review Variables Basics";
}