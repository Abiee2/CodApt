import React from 'react';
import styles from './LandingPage.module.css';
import ThemeToggle from '../shared/ThemeToggle';

const LandingPage = ({ onGetStarted, isDarkMode, toggleTheme, onSignUp, onLogin }) => {
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
            <ThemeToggle 
              isDarkMode={isDarkMode} 
              onClick={toggleTheme}
            />
          
          <button 
            onClick={onLogin}
            className={styles.signInBtn}
          >
            Log In
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
