import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import './Split.css';

const CodeEditor = ({ 
  language, 
  concept, 
  level,
  onBack, 
  onProfileClick, 
  onHomeClick, 
  onLogout, 
  userData 
}) => {
  const [code, setCode] = useState('# Write your code here\nprint("Hello CodApt!")');
  const [output, setOutput] = useState('');

  const [showAssessment, setShowAssessment] = useState(false);

  const handleRun = () => {
    try {
      const result = eval(code);  
      setOutput(String(result));
    } catch (err) {
      setOutput(err.message);
    }
  };

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
          <div 
            style={{ 
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
            }}
          >
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
                    <p style={{ color: '#d1d5db' }}>
                      Welcome to {concept}! Learn how to use {concept.toLowerCase()} in {language}.
                      Write your code in the editor on the right.
                    </p>
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
                <div style={{ backgroundColor: '#1e3a8a', padding: '8px 16px', fontSize: '14px', fontWeight: 'bold', color: '#dbeafe', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                  <span>{concept}.{language === 'python' ? 'py' : language === 'java' ? 'java' : 'js'}</span>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Editor
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
                      onClick={() => setShowAssessment(true)}
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

      {showAssessment && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>

          <div style={{
            width: "520px",
            backgroundColor: "#15366d",
            borderRadius: "14px",
            border: "2px solid #3b82f6",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            color: "white",
            fontFamily: "sans-serif"
          }}>

            {/* Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 20px",
              backgroundColor: "#1e3a8a",
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              fontWeight: "bold"
            }}>
              <span>Task Name: {concept}</span>
              <span>Difficulty: {level}</span>
            </div>

            {/* Status */}
            <div style={{
              padding: "10px 20px",
              backgroundColor: "#111827",
              fontWeight: "bold"
            }}>
              Task Status
            </div>

            <div style={{ padding: "20px" }}>

              <p style={{ marginBottom: "12px", fontWeight: "bold" }}>
                Score:
              </p>

              <p style={{ color: "#4ade80" }}>
                ✔ Output Correct
              </p>

              <p style={{ color: "#facc15", marginTop: "6px" }}>
                ⚠ CFG Warning: Missing loop structure
              </p>

            </div>

            {/* Performance */}
            <div style={{
              padding: "10px 20px",
              backgroundColor: "#111827",
              fontWeight: "bold"
            }}>
              Performance Metrics
            </div>

            <div style={{
              display: "flex",
              borderTop: "1px solid #334155"
            }}>

              <div style={{
                flex: 1,
                padding: "14px",
                borderRight: "1px solid #334155"
              }}>
                Attempts: 1
              </div>

              <div style={{
                flex: 1,
                padding: "14px"
              }}>
                Time Spent: 35s
              </div>


            </div>
              <div style={{
                borderTop: "1px solid #334155",
                marginTop: "10px"
              }}></div>

            {/* Recommendation */}
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ fontWeight: "bold", marginBottom: "12px", textAlign: "left" }}>
                Next Recommendation:
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setShowAssessment(false)}
                onMouseEnter={(e) => buttonHover(e)}
                onMouseLeave={buttonLeave}
                style={{
                  padding: "10px 32px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Continue
              </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;