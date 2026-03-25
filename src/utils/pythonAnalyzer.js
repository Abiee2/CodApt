// src/utils/pythonAnalyzer.js
export function analyzePythonVariable(code, task) {
  const lines = code.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  // Check required elements
  const hasAssignment = lines.some(line => line.includes('='));
  const hasPrint = lines.some(line => line.includes('print'));
  
  // Simple execution simulation
  let output = '';
  let variables = {};
  
  lines.forEach(line => {
    if (line.includes('=') && !line.includes('print')) {
      const match = line.match(/(.+?)\s*=\s*(.+)/);
      if (match) {
        try {
          const varName = match[1].trim();
          const value = match[2].trim().replace(/'/g, '"');
          variables[varName] = eval(value);
        } catch(e) {}
      }
    }
  });
  
  // Simulate print output
  lines.forEach(line => {
    if (line.includes('print')) {
      const printMatch = line.match(/print\s*\(\s*(.+?)\s*\)/);
      if (printMatch) {
        let expr = printMatch[1].trim();

        // Replace variables with actual values
        expr = expr.replace(/\b[a-zA-Z_]\w*\b/g, (name) => {
          if (variables[name] !== undefined) {
            return typeof variables[name] === 'string'
              ? `"${variables[name]}"`
              : variables[name];
          }
          return name;
        });

        try {
          output += eval(expr) + '\n'; 
        } catch (e) {
          output += 'ERROR\n';
        }
      }
    }
  });
   
   const correct = output.trim() === task.expectedOutput.trim(); 
  
  let feedback = [];
  if (!hasAssignment) feedback.push(" Missing variable assignment (use =)");
  if (!hasPrint) feedback.push(" Missing print statement");
  if (!correct) feedback.push(" Output doesn't match expected result");
  
  return {
    correct,
    output,
    expected: task.expectedOutput,
    feedback,
    hasVariables: hasAssignment,
    hasPrint
  };
}