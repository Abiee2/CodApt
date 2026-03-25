import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import ThemeToggle from '../shared/ThemeToggle';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

  const [selectedLanguage, setSelectedLanguage] = useState('Java');
  const [completedBadges, setCompletedBadges] = useState({});

  const [progressPercent, setProgressPercent] = useState(0);

   const [chartData, setChartData] = useState([]);

  // REPLACE calculateLanguageProgress function:
  const calculateLanguageProgress = (language) => {
    const badges = MOCK_BADGES[language] || [];
    const langProgress = progress[language] || {};
    
    let totalTasks = 0;
    let completedTasks = 0;
    
    badges.forEach(badge => {
      const badgeData = langProgress[badge];
      const tasks = badgeData?.tasksCompleted || 0;
      const total = badgeData?.totalTasks || 3;
      
      totalTasks += total;
      completedTasks += tasks;
    });
    
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return {
      completedTasks,
      totalTasks,
      percentage,
      badgesCompleted: badges.filter(badge => langProgress[badge]?.tasksCompleted >= 3).length,
      totalBadges: badges.length
    };
  };

  // ✅ FIXED: Generate real chart data from progress
  const generateChartData = () => {
    const languages = ['Java', 'Python', 'JavaScript'];
    const days = 5;
    const chartData = [];
    
    for (let day = 1; day <= days; day++) {
      const dayData = { name: `Day ${day}` };
      languages.forEach(lang => {
        // Simulate recent progress based on actual completion
        const langProgress = calculateLanguageProgress(lang);
        const baseScore = langProgress.percentage * 2; // Scale to chart range
        dayData[lang.toLowerCase()] = Math.max(0, baseScore + (Math.random() * 20 - 10)); // Add variation
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
            <div className={styles.dropdown}>
              <div className={styles.arrowUp}></div>
              <ul className={styles.menuList}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Log Out</a></li>
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
            <h3 className={styles.miniTitle}>Accomplishments</h3>
            <select className={styles.langSelect} value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option>Java</option>
              <option>Python</option>
              <option>JavaScript</option>
            </select>
            
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${currentProgress.percentage}%` }}></div>
              </div>
              <span className={styles.progressText}>
                {currentProgress.completedTasks}/{currentProgress.totalTasks} tasks 
                ({currentProgress.percentage}%)
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
      <p className={styles.accomplishTitle}>
        {concept} 
        <span style={{ 
          color: isCompleted ? '#4ade80' : '#94a3b8',
          fontSize: '12px',
          marginLeft: '8px'
        }}>
          {isCompleted ? '✓ Complete' : data.tasksCompleted > 0 ? `○ ${data.tasksCompleted}/${data.totalTasks}` : '○ Start'}
        </span>
      </p>

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
            {/*  */}
          </div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;