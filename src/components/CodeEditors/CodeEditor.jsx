import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import './Split.css';

const CodeEditor = ({ language, concept, onBack, onProfileClick, userData }) => {
  const [code, setCode] = useState('# Write your code here\nprint("Hello CodApt!")');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    try {
      const result = eval(code);  
      setOutput(String(result));
    } catch (err) {
      setOutput(err.message);
    }
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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 24px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/CODAPT_LOGO.png" 
            alt="CodApt Logo" 
            style={{ height: '50px', width: 'auto', cursor: 'pointer' }}
            onClick={onBack}
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
          
          {/* Profile Icon with Photo */}
          <div style={{ position: 'relative', paddingBottom: '10px' }}>
            <div 
              onClick={onProfileClick}
              style={{ 
                width: '40px', 
                height: '40px', 
                border: '2px solid #9ca3af', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: '#f3f4f6'
              }}
            >
              {userData?.photo ? (
                <img 
                  src={userData.photo} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <span style={{ fontSize: '20px' }}>👤</span>
              )}
            </div>
            
            {/* Dropdown Menu */}
            <div style={{ 
              visibility: 'hidden', 
              opacity: 0, 
              position: 'absolute', 
              top: '100%', 
              right: '-10px',
              backgroundColor: '#1e4baf', 
              borderRadius: '12px', 
              minWidth: '100px', 
              transition: 'all 0.3s ease', 
              transform: 'translateY(10px)', 
              zIndex: 10,
              marginTop: '5px'
            }}
            className="profile-dropdown"
            >
              <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid #1e4baf', position: 'absolute', top: '-10px', right: '18px' }}></div>
              <ul style={{ listStyle: 'none', padding: '10px 0', margin: 0, textAlign: 'center' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onProfileClick(); }} style={{ display: 'block', padding: '8px 15px', color: 'white', textDecoration: 'none', fontSize: '0.85rem' }}>Profile</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ display: 'block', padding: '8px 15px', color: 'white', textDecoration: 'none', fontSize: '0.85rem' }}>Home</a></li>
                <li><a href="#" style={{ display: 'block', padding: '8px 15px', color: 'white', textDecoration: 'none', fontSize: '0.85rem' }}>Log Out</a></li>
              </ul>
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
                        style={{ backgroundColor: '#facc15', color: 'black', padding: '8px 20px', borderRadius: '8px', fontWeight: '900', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    >
                      <span style={{ fontSize: '10px' }}>▶</span> RUN
                    </button>
                    <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 20px', borderRadius: '8px', fontWeight: '900', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
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
        <button onClick={onBack} style={{ padding: '4px 32px', backgroundColor: '#0d1117', color: 'white', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', border: '1px solid #4b5563', cursor: 'pointer' }}>
            Back
        </button>
        <button style={{ padding: '4px 32px', backgroundColor: '#0d1117', color: 'white', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', border: '1px solid #4b5563', cursor: 'pointer' }}>
            Next
        </button>
      </footer>
    </div>
  );
};

export default CodeEditor;