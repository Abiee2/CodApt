import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import ThemeToggle from '../shared/ThemeToggle';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  calculateLanguageProgress, 
  getLanguageLevel, 
  getConceptLevel 
} from "../../utils/levelUtils";

const MOCK_BADGES = {
  Java: ['Variables', 'Data Types', 'Operators', 'Conditional', 'Loop', 'Functions', 'Input & Output', 'Error Handling'],
  Python: ['Variables', 'Data Types', 'Operators', 'Conditional', 'Loop', 'Functions', 'Input & Output', 'Error Handling'],
  JavaScript: ['Variables', 'Data Types', 'Operators', 'Conditional', 'Loop', 'Functions', 'Input & Output', 'Error Handling']
};

const performanceData = [
  { name: 'Day 1', java: 40, python: 24, js: 10 },
  { name: 'Day 2', java: 30, python: 13, js: 22 },
  { name: 'Day 3', java: 20, python: 98, js: 22 },
  { name: 'Day 4', java: 27, python: 39, js: 20 },
  { name: 'Day 5', java: 18, python: 48, js: 110 },
];






const ProfilePage = ({ userData, onSave, isDarkMode, toggleTheme, onHomeClick, onLogout, progress = {} }) => {
  const [form, setForm] = useState({ ...userData });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('Java');
  const [completedBadges, setCompletedBadges] = useState({});

  const [progressPercent, setProgressPercent] = useState(0);

  const [chartData, setChartData] = useState([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);






  const level = getLanguageLevel(selectedLanguage);




  // BAGO
  const generateOverallAnalysis = () => {
  const languages = ['Java', 'Python', 'JavaScript'];
  let totalTasks = 0;
  let completedTasks = 0;
  let languageStats = {};

  languages.forEach(lang => {
    const data = calculateLanguageProgress(lang);
    languageStats[lang] = data;
    totalTasks += data.totalTasks;
    completedTasks += data.completedTasks;
  });

  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  //ENHANCED SMART RECOMMENDATIONS
  let recommendation = '';
  let actionItems = [];
  
  if (overallPercent < 20) {
    recommendation = '🚀 Start Your Coding Journey!';
    actionItems = ['Complete Variables tasks first', 'Practice 3 tasks daily', 'Focus on Python basics'];
  } else if (overallPercent < 50) {
    recommendation = '📈 Building Momentum!';
    actionItems = ['Review incomplete concepts', `Focus on ${languageStats['Python']?.percentage < 50 ? 'Python' : 'Java'}`];
  } else if (overallPercent < 80) {
    recommendation = '⭐ Almost There!';
    actionItems = ['Finish remaining concepts', 'Try Intermediate challenges'];
  } else {
    recommendation = '🎉 Coding Master!';
    actionItems = ['Explore Advanced topics', 'Build real projects'];
  }

  // Find actual strongest/weakest
  const sortedLanguages = languages.sort((a, b) => 
    languageStats[b]?.percentage - languageStats[a]?.percentage
  );
  
  return {
    totalTasks,
    completedTasks,
    overallPercent,
    strongestLang: sortedLanguages[0],
    weakestLang: sortedLanguages[sortedLanguages.length - 1],
    recommendation,
    actionItems,
    languageStats,
    streakDays: Math.floor(overallPercent / 10), // Bonus metric
    rank: overallPercent > 80 ? 'Gold' : overallPercent > 50 ? 'Silver' : 'Bronze'
  };
};


  // Update generateChartData function (already good, but make it more accurate)
  const generateChartData = () => {
    const languages = ['Java', 'Python', 'JavaScript'];
    const days = 5;
    const chartData = [];
    
    for (let day = 1; day <= days; day++) {
      const dayData = { name: `Day ${day}` };
      languages.forEach(lang => {
        const langProgress = calculateLanguageProgress(lang);
        // More realistic progression simulation
        const baseScore = (langProgress.percentage / 100) * 120;
        dayData[lang.toLowerCase()] = Math.max(0, baseScore + (Math.sin(day) * 15));
      });
      chartData.push(dayData);
    }
    return chartData;
  };

  useEffect(() => {
    setChartData(generateChartData());
  }, [progress]);

  useEffect(() => {
    const currentBadges = MOCK_BADGES[selectedLanguage] || [];
    const completedCount = currentBadges.filter(badge => 
      progress[selectedLanguage]?.[badge]  // ✅ Safe access
    ).length;
    const percentage = currentBadges.length > 0 ? Math.round((completedCount / currentBadges.length) * 100) : 0;
    setProgressPercent(percentage);
  }, [selectedLanguage, progress]);  // ✅ Remove undefined 'progress' dependency


  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (showAnalysis) {
      setIsAnalyzing(true);
      setAnalysisStep(0);
      
      // Simulate step progression
      const stepInterval = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev >= 3) {
            clearInterval(stepInterval);
            setTimeout(() => setIsAnalyzing(false), 500);
            return 3;
          }
          return prev + 1;
        });
      }, 600);
      
      return () => clearInterval(stepInterval);
    }
  }, [showAnalysis]);

  const getConceptLevel = (data) => {
    const completion = (data.tasksCompleted / data.totalTasks) * 100;
    const success = data.successRate || 0;

    const score = (completion * 0.6) + (success * 0.4);

    if (score >= 80) return { label: "Adv", color: "#22c55e" };
    if (score >= 50) return { label: "Int", color: "#facc15" };
    return { label: "Beg", color: "#ef4444" };
  };

  const getGraphInterpretation = () => {
    const analysis = generateOverallAnalysis();
    const trend = analysis.overallPercent > 70 ? "consistently rising" : 
                  analysis.overallPercent > 40 ? "showing improvement" : 
                  "just beginning to climb";
    
    const consistency = analysis.overallPercent > 80 ? "rock-solid consistency" :
                      analysis.overallPercent > 60 ? "good consistency" :
                      "some ups and downs";
    
    return {
      trend,
      consistency,
      interpretation: `Your graph shows a ${trend} pattern with ${consistency}. This means you're ${analysis.overallPercent > 70 ? "mastering concepts quickly" : analysis.overallPercent > 40 ? "building momentum" : "gaining valuable experience"}!`
    };
  };


  const validate = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (!form.username?.trim()) newErrors.username = 'Username is required';
    if (!form.email?.trim()) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(form);
    setShowToast(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const toggleBadge = (badgeName) => {
    setCompletedBadges(prev => ({ ...prev, [badgeName]: !prev[badgeName] }));
  };

  const currentProgress = calculateLanguageProgress(selectedLanguage);
  const currentBadges = MOCK_BADGES[selectedLanguage];
  const completedCount = Object.values(completedBadges).filter(Boolean).length;
  const progressPercentage = currentProgress.percentage;

  return (
    <div className={styles.container}>
      {showToast && <div className={styles.toast}>Save successfully!</div>}

      <nav className={styles.navbar}>
        <img src="/CODAPT_LOGO.png" alt="Codapt" className={styles.logo} onClick={onHomeClick} />
        <div className={styles.navActions}>
          <div className={styles.nameBadge}>{userData?.name || 'Name'}</div>
          <ThemeToggle isDarkMode={isDarkMode} onClick={toggleTheme} />

          {/* Profile Icon */}
          <div className={styles.profileWrapper}>
            <div className={styles.profileIcon} onClick={() => {}}>
              {form.photo ? (
                <img src={form.photo} alt="Profile" className={styles.profilePhoto} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            {/* DropDown */}
            <div className="unifiedDropdown">
              <div className="dropdownArrow"></div>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li><div className="dropdownItem" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</div></li>
                <li><div className="dropdownItem" onClick={(e) => { e.preventDefault(); onLogout(); }}>Log Out</div></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main className={styles.mainWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Profile</h1>
          <div className={styles.headerSection}>
            <div className={styles.avatarCircleLarge} onClick={() => fileInputRef.current.click()}>
              {form.photo ? <img src={form.photo} alt="Profile" className={styles.profilePhotoLarge} /> : <span>👤</span>}
              <div className={styles.cameraIcon}>📷</div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} />
            <div className={styles.infoLabels}>
              <div className={styles.labelYellow}>Name : <span>{userData?.name}</span></div>
              <div className={styles.labelYellow}>User Name : <span>{userData?.username}</span></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Name</label>
              <input type="text" className={styles.inputField} value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>User Name</label>
              <input type="text" className={styles.inputField} value={form.username || ''} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Email</label>
              <input type="email" className={styles.inputField} value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Password</label>
              <input type="password" className={styles.inputField} value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className={styles.saveBtn}>Save</button>
            </div>
          </form>
        </div>

        <div className={styles.statsSidebar}>
          <div className={styles.miniCard}>
            <h3 className={styles.miniTitle}>Performance Progress</h3>
            <div className={styles.chartPlaceholder}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide domain={[0, 'auto']} />
                  <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="java" stroke="#FF6700" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="python" stroke="#4B8BBE" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="js" stroke="#F7DF1E" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Mini Card */}
          <div className={styles.miniCard}>

            {/* MINI CARD HEADER STYLE (like your analysis card) */}
            <div className={styles.miniCardHeader}>
              <h3>Accomplishments</h3>

              {/* LANGUAGE LEVEL BADGE */}
              <div
                className={styles.levelBadge}
                style={{
                  backgroundColor: `${level.color}22`, // soft background tint
                  color: level.color,
                  border: `1px solid ${level.color}`
                }}
              >
               {level.label}
              </div>
            </div>
            <select className={styles.langSelect} value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option>Java</option>
              <option>Python</option>
              <option>JavaScript</option>
            </select>
            
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${currentProgress.percentage}%` }}></div>
              </div>

            <span 
              className={styles.progressText}
              onClick={() => setShowAnalysis(true)}
              style={{ 
                cursor: 'pointer', 
                textDecoration: 'underline',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffcc00'}
              onMouseLeave={(e) => e.target.style.color = ''}
            >
              {currentProgress.completedTasks}/{currentProgress.totalTasks} tasks 
              ({currentProgress.percentage}%)
              <span style={{ fontSize: '10px', marginLeft: '4px' }}></span>
            </span>

            </div>

              {/* Accomplish Card */}
          <div className={styles.accomplishList}>
          {currentBadges.map((concept) => {
            const data = progress?.[selectedLanguage]?.[concept] || {
              tasksCompleted: 0,
              totalTasks: 3,
              successRate: 0
            };
  
            const isCompleted = data.tasksCompleted >= data.totalTasks;
            const completionRate = (data.tasksCompleted / data.totalTasks) * 100;

            return (
              <div key={concept} className={styles.accomplishItem}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className={styles.accomplishTitle}>
                  {concept}
                </p>

                {/* LEVEL BADGE PER CONCEPT */}
                {(() => {
                  const level = getConceptLevel(data);
                  return (
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "999px",
                      fontSize: "10px",
                      fontWeight: "700",
                      backgroundColor: `${level.color}22`,
                      color: level.color,
                      border: `1px solid ${level.color}`
                    }}>
                      {level.label}
                    </span>
                  );
                })()}
              </div>

                <div className={styles.accomplishBar}>
                  <div
                    className={styles.accomplishFill}
                    style={{ 
                      width: `${completionRate}%`,
                      background: isCompleted ? '#4ade80' : data.tasksCompleted > 0 ? '#60a5fa' : '#94a3b8'
                    }}
                  ></div>
                </div>

                <p className={styles.accomplishRate}>
                  {data.tasksCompleted}/{data.totalTasks} Tasks • {Math.round(data.successRate)}%
                </p>
              </div>
            );
          })}
          </div>


          </div>
        </div>
        {showAnalysis && (
          <div className={styles.compactAnalysis}>
            {/* Loading State */}
            {isAnalyzing ? (
              <div className={styles.compactLoader}>
                <div className={styles.miniLoadingBars}>
                  {[0,1,2].map(i => (
                    <div key={i} className={`${styles.miniBar} ${styles[`miniPulse${i}`]}`} />
                  ))}
                </div>
                <div className={styles.miniProgress}>Analyzing...</div>
              </div>
            ) : (
              /* Main Compact Card */
              <div className={styles.analysisCard}>
                {/* Header */}
                <div className={styles.cardHeader}>
                  <h3>📊 Your Progress Story</h3>
                  <button 
                    onClick={() => setShowAnalysis(false)}
                    className={styles.cardClose}
                  >✕</button>
                </div>

                {/* Achievement */}
                <div className={styles.achievementSummary}>
                  <div className={styles.percentBig}>
                    {generateOverallAnalysis().overallPercent}<span>%</span>
                  </div>
                  <div className={styles.tasksCompleted}>
                    {generateOverallAnalysis().completedTasks}/{generateOverallAnalysis().totalTasks} tasks
                  </div>
                  <div className={styles.rankBadge}>
                    {generateOverallAnalysis().rank} Rank
                  </div>
                </div>

                {/* Graph Insight */}
                <div className={styles.graphInsight}>
                  <div className={styles.insightIcon}>📈</div>
                  <p>{getGraphInterpretation().interpretation}</p>
                </div>

                {/* Quick Language Status */}
                <div className={styles.langQuick}>
                  <h4>Language Status:</h4>
                  <div className={styles.langRow}>
                    {Object.entries(generateOverallAnalysis().languageStats).map(([lang, stats]) => (
                      <div key={lang} className={styles.langQuickItem}>
                        <span>{lang.slice(0,3)}</span>
                        <strong>{stats.percentage}%</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Steps */}
                <div className={styles.nextSteps}>
                  <h4>🎯 Next:</h4>
                  <div className={styles.stepList}>
                    {generateOverallAnalysis().actionItems.slice(0,2).map((step, i) => (
                      <div key={i} className={styles.stepItem}>
                        {i+1}. {step}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className={styles.continueBtn}
                  onClick={() => setShowAnalysis(false)}
                >
                  Continue Learning →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;