// src/utils/pythonExecutor.js
export function executePythonCode(code) {
  const lines = code
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  let output = '';
  const context = {};

  lines.forEach(line => {

    // VARIABLE ASSIGNMENT
    if (line.includes('=') && !line.includes('print')) {
      const parts = line.split('=');
      if (parts.length === 2) {
        const varName = parts[0].trim();
        let value = parts[1].trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          context[varName] = value.slice(1, -1);
        } else if (!isNaN(value)) {
          context[varName] = Number(value);
        }
      }
    }

    // PRINT
    else if (line.includes('print(')) {
      const match = line.match(/print\s*\(\s*(.+?)\s*\)/);

      if (match) {
        let expr = match[1];

        Object.keys(context).forEach(v => {
          expr = expr.replace(
            new RegExp(`\\b${v}\\b`, 'g'),
            JSON.stringify(context[v])
          );
        });

        try {
          output += eval(expr) + '\n';
        } catch {
          output += 'ERROR\n';
        }
      }
    }
  });

  return output.trim();
}