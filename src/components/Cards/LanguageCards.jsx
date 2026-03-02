import React from 'react';
import styles from './LanguageCards.module.css';
import ThemeToggle from '../shared/ThemeToggle';

const LanguageCards = ({ onSelect, isDarkMode, toggleTheme, onProfileClick, onHomeClick, onLogout, userData }) => {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <img 
          src="/CODAPT_LOGO.png" 
          alt="Codapt" 
          className={styles.logo}
          onClick={onHomeClick}
        />
        
        <div className={styles.navActions}>
          {/* Name Badge */}
          <div className={styles.nameBadge}>
            {userData?.name || 'Name'}
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle 
            isDarkMode={isDarkMode} 
            onClick={toggleTheme}
          />
          
          {/* Profile Icon with Photo */}
          <div className={styles.profileWrapper}>
            <div className={styles.profileIcon} onClick={onProfileClick}>
              {userData?.photo ? (
                <img 
                  src={userData.photo} 
                  alt="Profile" 
                  className={styles.profilePhoto}
                />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            
            {/* Dropdown */}
            <div className={styles.dropdown}>
              <div className={styles.arrowUp}></div>
              <ul className={styles.menuList}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onProfileClick(); }}>Profile</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Log Out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.content}>
        <h1 className={styles.title}>Programming Languages</h1>
        
        <div className={styles.cardGrid}>
          <div className={styles.card} onClick={() => onSelect('java')}>
            <img src="/JAVA_CARD.png" alt="Java" />
          </div>
          
          <div className={styles.card} onClick={() => onSelect('python')}>
            <img src="/PYTHON_CARD.png" alt="Python" />
          </div>
          
          <div className={styles.card} onClick={() => onSelect('javascript')}>
            <img src="/JAVA_SCRIPT_CARD.png" alt="JavaScript" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LanguageCards;