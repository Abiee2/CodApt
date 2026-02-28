import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = ({ onGetStarted, isDarkMode, toggleTheme, onSignUp }) => {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <img 
          src="/CODAPT_LOGO.png" 
          alt="CodApt" 
          className={styles.logoImg}
        />
        
        <div className={styles.navRight}>
          <button 
            onClick={toggleTheme}
            className={styles.themeToggle}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <button 
            onClick={onSignUp}
            className={styles.signUpBtn}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className={styles.hero}>
        <h1 className={styles.title}>
          Adaptive Programming <span className={styles.titleAccent}>Practice Platform</span>
        </h1>
        
        <p className={styles.subtitle}>
          Personalize Coding Challenges
        </p>

        <button 
          onClick={onGetStarted}
          className={styles.getStartedBtn}
        >
          Get Started
        </button>
      </main>
    </div>
  );
};

export default LandingPage;