import React, { useState, useEffect } from 'react';
import LanguageCards from './components/Cards/LanguageCards'; 
import ConceptModal from './components/Cards/ConceptModal';
import CodeEditor from './components/CodeEditors/CodeEditor';
import ProfilePage from './components/Profile/ProfilePage';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/LogIn/SignUp';
import Login from './components/LogIn/Login';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  
  // User data with profile photo
  const [userData, setUserData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    photo: null  // Profile photo URL
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSaveProfile = (formData) => {
    setUserData(formData);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Navigation functions
  const goToLanding = () => setCurrentPage('landing');
  const goToSignUp = () => setCurrentPage('signup');
  const goToLogin = () => setCurrentPage('login');
  const goToLanguages = () => setCurrentPage('languages');
  const goToProfile = () => setCurrentPage('profile');

  // Handle Google login - get user photo
  const handleGoogleLogin = (googleUser) => {
    setUserData({
      name: googleUser.name || 'User',
      username: googleUser.email?.split('@')[0] || 'user',
      email: googleUser.email || '',
      password: 'google-oauth',
      photo: googleUser.picture || null
    });
    setCurrentPage('languages');
  };

  // Handle logout - go back to landing page
  const handleLogout = () => {
    setCurrentPage('landing');
    setSelectedLang(null);
    setSelectedConcept(null);
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onGetStarted={goToSignUp}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onSignUp={goToSignUp}
      />
    );
  }

  // Sign Up Page
  if (currentPage === 'signup') {
    return (
      <SignUp 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onSignUp={(userData) => {
          setUserData(userData);
          goToLanguages();
        }}
        onLogin={goToLogin}
        onHome={goToLanding}
      />
    );
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <Login 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onLogin={(userData) => {
          setUserData(userData);
          goToLanguages();
        }}
        onSignUp={goToSignUp}
        onHome={goToLanding}
      />
    );
  }

  // Profile Page
  if (currentPage === 'profile') {
    return (
      <ProfilePage 
        userData={userData}
        onSave={handleSaveProfile}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onHomeClick={goToLanguages}
        onLogout={handleLogout}
      />
    );
  }

  // Language Cards / Concept Modal / Code Editor
  return (
    <div className="App">
      {!selectedLang && !selectedConcept && (
        <LanguageCards 
          onSelect={setSelectedLang}
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme}
          onProfileClick={goToProfile}
          onHomeClick={goToLanding}
          onLogout={handleLogout}
          userData={userData}
        />
      )}

      {selectedLang && !selectedConcept && (
        <ConceptModal 
          language={selectedLang}
          onSelect={setSelectedConcept}
          onClose={() => setSelectedLang(null)} 
        />
      )}


      {selectedConcept && (
        <CodeEditor 
          language={selectedLang}
          concept={selectedConcept}
          onBack={() => setSelectedConcept(null)}
          onProfileClick={goToProfile}
          onHomeClick={goToLanguages}
          onLogout={handleLogout}
          userData={userData}
        />
      )}
    </div>
  );
}

export default App;