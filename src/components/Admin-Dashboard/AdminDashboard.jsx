import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import UsersPanel from '../Admin-Users/AdminUsers';
import AdminReports from '../Admin-Reports/AdminReports';
import AdminSettings from '../Admin-Settings/AdminSettings';
import AdminCourses from '../Admin-Courses/AdminCourses';

const AdminDashboard = ({ isDarkMode, toggleTheme }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavClick = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const users = [
    { name: 'Marian R', progress: 74, color: '#66CC99' },
    { name: 'Samantha V', progress: 32, color: '#D4AF37' },
    { name: 'Ana L', progress: 61, color: '#66CC99' },
    { name: 'Mark N', progress: 73, color: '#66CC99' },
  ];

  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
            <img src="/CODAPT_LOGO.png" alt="CodAPT" />
        </div>
        <nav className={styles.sideNav}>
          <div 
            className={`${styles.navItem} ${currentView === 'dashboard' ? styles.active : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <span>🏠</span> Dashboard
          </div>
          <div 
            className={`${styles.navItem} ${currentView === 'users' ? styles.active : ''}`}
            onClick={() => handleNavClick('users')}
          >
            <span>👤</span> Users
          </div>
          <div 
            className={`${styles.navItem} ${currentView === 'reports' ? styles.active : ''}`}
            onClick={() => handleNavClick('reports')}
          >
            <span>📊</span> Reports
          </div>
          <div 
            className={`${styles.navItem} ${currentView === 'content' ? styles.active : ''}`}
            onClick={() => handleNavClick('content')}
          >
            <span>📚</span> Content
          </div>
          <div 
            className={`${styles.navItem} ${currentView === 'settings' ? styles.active : ''}`}
            onClick={() => handleNavClick('settings')}
          >
            <span>⚙️</span> Settings
          </div>
        </nav>
      </aside>

      <main className={styles.mainWrapper}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerRight}>
            <span className={styles.adminBadge}>Admin</span>
            <span className={styles.iconBtn} onClick={toggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
            </span>
            <div className={styles.profileCircle}>👤</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className={styles.content}>
          {currentView === 'dashboard' && (
            <>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statContent}>
                    <span className={styles.statEmoji}>📚</span>
                    <p>Total Learners</p>
                    <h3>1,562</h3>
                  </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statContent}>
                        <span className={styles.statEmoji}>📈</span>
                        <p>Avg Score</p>
                        <h3>30%</h3>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statContent}>
                        <span className={styles.statEmoji}>✅</span>
                        <p>Average Progress</p>
                        <h3>74%</h3>
                    </div>
                </div>
              </div>

              <div className={styles.activityCard}>
                <h2 className={styles.activityTitle}>Recent User Activity</h2>
                <div className={styles.activityTable}>
                  <div className={styles.tableHeader}>
                    <span>User</span>
                    <span>Progress</span>
                  </div>

                  {users.map((user, index) => (
                    <div key={index} className={styles.userRow}>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar} style={{backgroundColor: user.color}}>
                            {user.name[0]}
                        </div>
                        <span className={styles.userName}>{user.name}</span>
                      </div>
                      <div className={styles.progressWrapper}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill} 
                            style={{ width: `${user.progress}%`, backgroundColor: user.color }}
                          ></div>
                        </div>
                        <span className={styles.progressVal}>{user.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.actionArea}>
                    <button className={styles.viewAllBtn} onClick={() => handleNavClick('users')}>View All Users</button>
                </div>
              </div>
            </>
          )}

          {currentView === 'users' && <UsersPanel />}
          {currentView === 'reports' && <AdminReports />}
          {currentView === 'content' && <AdminCourses />}
          {currentView === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
