import React, { useState } from 'react';
import styles from './LanguageCards.module.css';
import ThemeToggle from '../shared/ThemeToggle';
import LanguageFlipCard from "./LanguageFlipCard";

const LanguageCards = ({ onSelect, isDarkMode, toggleTheme, onProfileClick, onHomeClick, onLogout, userData }) => {
  const [selectedLang, setSelectedLang] = useState(null);

  const handleCardClick = (lang) => {
    setSelectedLang(lang);
    setShowModal(true);
  };

  const handleLevelSelect = (level) => {
    setShowModal(false);

    // send the selected language to App.jsx
    onSelect(selectedLang);
  };

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

        <LanguageFlipCard
          name="Java"
          hp="120"
          type="Fire"
          color="#FF6700" // orange/red for Java
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
          ability1={{ name:"Flame Compile", damage:40, desc:"Burn through compilation." }}
          ability2={{ name:"JVM Blast", damage:80, desc:"Virtual machine attack." }}
          description="Powerful enterprise language used in large backend systems."
          onClick={() => onSelect("Java")}
        />

        <LanguageFlipCard
          name="Python"
          hp="100"
          type="Grass"
          color="#4B8BBE" // blue for Python
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png"
          ability1={{ name:"Script Coil", damage:30, desc:"Wrap opponents elegantly." }}
          ability2={{ name:"Data Bite", damage:70, desc:"Process massive datasets instantly." }}
          description="Flexible snake language loved by AI and data scientists."
          onClick={() => onSelect("Python")}
        />

        <LanguageFlipCard
          name="JavaScript"
          hp="90"
          type="Electric"
          color="#F7DF1E" // yellow for JS
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          ability1={{ name:"Dynamic Shock", damage:30, desc:"Shock enemies with dynamic typing." }}
          ability2={{ name:"Async Thunder", damage:80, desc:"Async lightning strike." }}
          description="King of the web powering interactive websites."
          onClick={() => onSelect("JavaScript")}
        />



        </div>


      </main>
    </div>
  );
};

export default LanguageCards;