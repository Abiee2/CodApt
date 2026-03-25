import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import './Split.css';
import { PYTHON_EASY_TASKS } from '../../data/pythonEasyTasks';
import { analyzePythonVariable } from "../../utils/pythonAnalyzer";
import { recommendNextTask } from "../../utils/recommendNextTask";

  const CodeEditor = ({ 
    language, 
    concept, 
    level,
    onBack, 
    onProfileClick, 
    onHomeClick, 
    onLogout, 
    onCompleteTask,
    userData,
    currentTaskIndex,
  onNextTask
  }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [code, setCode] = useState('# Write your code here\nprint("Hello CodApt!")');
    const [output, setOutput] = useState('');
    const [showAssessment, setShowAssessment] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [startTime] = useState(Date.now());
    const [timeSpent, setTimeSpent] = useState(0);           
    const [recommendation, setRecommendation] = useState(''); 
    const [assessmentResult, setAssessmentResult] = useState({ 
      correct: false,
      attempts: 0,
      timeSpent: 0,
      feedback: [],
      recommendation: ''
    });

  const executePythonCode = (code) => {
    const lines = code.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));

    let output = '';
    const context = {};

    for (let line of lines) {
      // Variable assignments
      if (line.includes('=') && !line.includes('print')) {
        const match = line.match(/(.+?)\s*=\s*(.+)/);
        if (match) {
          const varName = match[1].trim();
          let expr = match[2].trim();
          try {
            // Safely parse numbers, booleans, and strings
            if (/^['"].*['"]$/.test(expr)) {
              context[varName] = expr.slice(1, -1); // string
            } else if (!isNaN(Number(expr))) {
              context[varName] = Number(expr); // number
            } else if (expr === 'True' || expr === 'False') {
              context[varName] = expr === 'True'; // boolean
            } else if (context[expr] !== undefined) {
              context[varName] = context[expr]; // existing variable
            } else {
              context[varName] = expr; // fallback
            }
          } catch (e) {
            console.log('Assignment error:', e);
          }
        }
      }
      // Print statements
      else if (line.includes('print(')) {
        const printMatch = line.match(/print\s*\(\s*(.+?)\s*\)/);
        if (printMatch) {
          let expr = printMatch[1].trim();
          let result = expr;

          // Replace variable names with their values safely
          result = result.replace(/\b[a-zA-Z_]\w*\b/g, (name) => {
            if (context[name] !== undefined) {
              const val = context[name];
              return typeof val === 'string' ? `"${val}"` : val;
            }
            return name;
          });

          try {
            output += eval(result) + '\n';
          } catch (e) {
            output += 'ERROR\n';
          }
        }
      }
    }

    return output.trim() || 'No output';
  };
  // end

  // Update handleRun:
  const handleRun = () => {
    const result = executePythonCode(code);
    setOutput(result);
  };


  const task = PYTHON_EASY_TASKS[currentTaskIndex] || PYTHON_EASY_TASKS[0];


const handleSubmit = () => {
  const newAttempts = attempts + 1;
  setAttempts(newAttempts);

  const result = analyzePythonVariable(code, task);
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  setTimeSpent(seconds);

  const rec = recommendNextTask(newAttempts, seconds, result.correct, currentTaskIndex);
  setRecommendation(rec);

  // Update assessment display with real data
  setAssessmentResult({
    correct: result.correct,
    attempts: newAttempts,
    timeSpent: seconds,
    feedback: result.feedback,
    output: result.output,
    expected: task.expectedOutput,
    recommendation: rec,
    nextTaskIndex: result.correct
  ? (currentTaskIndex < PYTHON_EASY_TASKS.length - 1
      ? currentTaskIndex + 1
      : 'Complete!')
  : currentTaskIndex
  });

  setAttempts(newAttempts);
  setTimeSpent(seconds);
  setRecommendation(rec);
  
  if (result.correct) {
    onCompleteTask(language, concept, currentTaskIndex + 1);
  }

    setShowAssessment(true);
  };

  useEffect(() => {
    const currentTask = PYTHON_EASY_TASKS[currentTaskIndex];
    if (currentTask) {
      // ✅ CLEAN STARTER CODE - ONLY line numbers
      setCode(`# Task ${currentTask.id}: ${currentTask.title}\n\n# Write your code here:\n\nprint("Replace this line!")`);
      
      setOutput('');
      setAttempts(0);
      setTimeSpent(0);
      setRecommendation('');
    }
  }, [currentTaskIndex]);


  const buttonStyle = {
    padding: "8px 20px",
    borderRadius: "8px",
    fontWeight: "900",
    fontSize: "12px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  const buttonHover = (e, color) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.opacity = "0.9";
  };

  const buttonLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.opacity = "1";
  };

  const getLanguage = (lang) => {
    switch(lang) {
      case 'python': return 'python';
      case 'java': return 'java';
      case 'javascript': return 'javascript';
      default: return 'plaintext';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d1117', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 50px',
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb', 
        flexShrink: 0,
        minHeight: '45px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/CODAPT_LOGO.png" 
            alt="CodApt Logo" 
            style={{ 
              height: '45px',
              width: 'auto', 
              cursor: 'pointer' 
            }}
            onClick={onHomeClick}
          />
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a' }}>
            {language?.toUpperCase()} / {concept}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* User Name Badge */}
          <div style={{ backgroundColor: '#48a859', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
            {userData?.name || 'Student'}
          </div>
          
          {/* Profile Icon - No Dropdown */}
          <div style={{ position: 'relative' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            border: '2px solid #333',
            padding: '2px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}>
            {userData?.photo ? (
              <img 
                src={userData.photo} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>

          {/* Dropdown */}
          <div className="editorDropdown">
            {/* <div onClick={onHomeClick}>Home</div> */}
            <div onClick={onProfileClick}>Profile</div>
            <div onClick={onLogout} style={{ color: '#f87171' }}>Logout</div>
          </div>
        </div>

        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Split
          style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}
          sizes={[45, 55]}
          minSize={200}
          gutterSize={12}
          direction="horizontal"
          gutterStyle={() => ({
            backgroundColor: '#1e3a8a',
            cursor: 'col-resize',
          })}
        >
          {/* Left Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <Split
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              sizes={[85, 15]}
              minSize={50}
              gutterSize={12}
              direction="vertical"
              gutterStyle={() => ({
                backgroundColor: '#1e3a8a',
                cursor: 'row-resize',
              })}
            >
              {/* Instructions */}
              <aside style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#161b22', borderRight: '1px solid black', height: '100%', overflow: 'hidden' }}>
                <div style={{ padding: '12px', backgroundColor: '#0d1117', fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', borderBottom: '1px solid black', flexShrink: 0 }}>
                  {language?.toUpperCase()} / {concept}
                </div>
                <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Instructions</h2>
                  <div style={{ width: '100%', minHeight: '100%', backgroundColor: 'rgba(13, 17, 23, 0.5)', borderRadius: '8px', border: '1px solid #374151', padding: '16px' }}>
                  <div style={{
                  margin: '8px 0',
                  whiteSpace: 'pre-line',
                  lineHeight: '1.7',
                  fontSize: '15px',      
                  fontFamily: '"SF Mono", Monaco, "Cascadia Code", Consolas, monospace', // ✅ Developer font
                  color: '#f1f5f9',        
                  letterSpacing: '0.3px' 
                  }}>
                    {task?.instruction || 'Write code to practice ' + concept}
                  </div>
                  </div>
                </div>
              </aside>

              {/* Hint Panel */}
              <div style={{ backgroundColor: '#0d1117', borderRight: '1px solid black', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px', fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid black', flexShrink: 0 }}>Help</div>
                <div style={{ flex: 1, padding: '8px', overflow: 'auto' }}>
                  <button style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', backgroundColor: 'rgba(30, 58, 138, 0.3)', border: '1px solid #3b82f6', borderRadius: '8px', color: '#60a5fa', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                    Hint
                    <span style={{ fontSize: '12px' }}>▼</span>
                  </button>
                </div>
              </div>
            </Split>
          </div>

          {/* Right Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <Split
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              sizes={[65, 35]}
              minSize={100}
              gutterSize={12}
              direction="vertical"
              gutterStyle={() => ({
                backgroundColor: '#1e3a8a',
                cursor: 'row-resize',
              })}
            >
              {/* Code Editor */}
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', minHeight: 0, backgroundColor: 'white' }}>
                <div style={{ backgroundColor: '#1e3a8a', padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', 
                            color: '#dbeafe', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                  <span>{concept}.{language?.toLowerCase() === 'python' ? 'py' : language?.toLowerCase() === 'java' ? 'java' : 'js'}</span>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Editor
                    key={currentTaskIndex} 
                    height="100%"
                    language={getLanguage(language)}
                    theme="light"
                    value={code}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                    }}
                    onChange={(val) => setCode(val)}
                  />
                  
                  <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '12px', zIndex: 10 }}>
                    <button
                        onClick={handleRun}
                        onMouseEnter={(e) => buttonHover(e)}
                        onMouseLeave={buttonLeave}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#facc15",
                          color: "black"
                        }}
                      >
                      ▶ RUN
                    </button>
                    <button
                      onClick={handleSubmit}
                      onMouseEnter={(e) => buttonHover(e)}
                      onMouseLeave={buttonLeave}
                      style={{
                        ...buttonStyle,
                        backgroundColor: "#3b82f6",
                        color: "white"
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#010409', borderTop: '4px solid #161b22', minHeight: 0 }}>
                <div style={{ backgroundColor: '#0d1117', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#9ca3af', flexShrink: 0 }}>
                    Terminal
                </div>
                <div style={{ flex: 1, padding: '16px', fontFamily: 'monospace', fontSize: '14px', overflow: 'auto', color: '#d1d5db' }}>
                   {output || "> Terminal output will appear here..."}
                </div>
              </div>
            </Split>
          </div>
        </Split>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', padding: '8px 24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid black', flexShrink: 0 }}>
        <button
          onClick={onBack}
          onMouseEnter={buttonHover}
          onMouseLeave={buttonLeave}
          style={{
            padding: '4px 32px',
            backgroundColor: '#0d1117',
            color: 'white',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
            border: '1px solid #4b5563',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Back
        </button>
        <button
          onMouseEnter={buttonHover}
          onMouseLeave={buttonLeave}
          style={{
            padding: '4px 32px',
            backgroundColor: '#0d1117',
            color: 'white',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
            border: '1px solid #4b5563',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          Next
        </button>
      </footer>
      {/* start of assessment */}
      {showAssessment && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", 
          alignItems: "center", zIndex: 1000
        }}>
          <div style={{
            width: "520px", backgroundColor: "#15366d", borderRadius: "14px",
            border: "2px solid #3b82f6", boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            color: "white", fontFamily: "sans-serif"
          }}>
            {/* Header */}
            <div style={{
              display: "flex", justifyContent: "space-between", padding: "12px 20px",
              backgroundColor: "#1e3a8a", borderTopLeftRadius: "14px", borderTopRightRadius: "14px",
              fontWeight: "bold"
            }}>
              <span>Task: {concept}</span>
              <span>Difficulty: {level}</span>
            </div>

            {/* Status - DYNAMIC */}
            <div style={{ padding: "10px 20px", backgroundColor: "#111827", fontWeight: "bold" }}>
              Task Status
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ marginBottom: "12px", fontWeight: "bold" }}>Score:</p>
              
              {/* Correct/Incorrect Status */}
              <p style={{ 
                color: assessmentResult.correct ? "#4ade80" : "#ef4444",
                fontSize: "16px", fontWeight: "bold"
              }}>
                {assessmentResult.correct ? '✔ CORRECT' : '✘ INCORRECT'}
              </p>

              {/* Feedback */}
              {assessmentResult.feedback?.map((msg, i) => (
                <p key={i} style={{ 
                  color: "#facc15", marginTop: "6px", fontSize: "14px"
                }}>
                  ⚠ {msg}
                </p>
              ))}
            </div>

            {/* Performance - DYNAMIC */}
            <div style={{ padding: "10px 20px", backgroundColor: "#111827", fontWeight: "bold" }}>
              Performance Metrics
            </div>
            <div style={{ display: "flex", borderTop: "1px solid #334155" }}>
              <div style={{ flex: 1, padding: "14px", borderRight: "1px solid #334155" }}>
                Attempts: <span style={{ fontWeight: "bold", color: "#4ade80" }}>
                  {assessmentResult.attempts}
                </span>
              </div>
              <div style={{ flex: 1, padding: "14px" }}>
                Time: <span style={{ fontWeight: "bold", color: "#4ade80" }}>
                  {assessmentResult.timeSpent}s
                </span>
              </div>
            </div>

            {/* Recommendation - DYNAMIC */}
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
                Recommended Next Task:
              </p>
              <p style={{ color: "#4ade80", fontSize: "16px" }}>
                {assessmentResult.recommendation || 'Practice more!'}
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <button
                  onClick={() => {
                  setShowAssessment(false);

                      if (assessmentResult.nextTaskIndex === 'Complete!') {
                        // Let parent handle the full reset
                        onNextTask?.('Complete!');
                        return;
                      }

                      if (onNextTask && typeof assessmentResult.nextTaskIndex === 'number') {
                        onNextTask(assessmentResult.nextTaskIndex);
                      }
                    }}
                  
                  style={{
                    padding: "10px 32px", backgroundColor: "#3b82f6", border: "none",
                    borderRadius: "10px", color: "white", fontWeight: "bold",
                    cursor: "pointer", fontSize: "14px"
                  }}
                >
                  {!assessmentResult.correct
                    ? 'Retake Task'
                    : assessmentResult.nextTaskIndex === 'Complete!'
                      ? 'Finish!'
                      : 'Continue to Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* end of assessment */}
    </div>
  );
};

export default CodeEditor;