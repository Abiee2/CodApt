import React, { useState, useEffect } from 'react';
import LanguageCards from './components/Cards/LanguageCards'; 
import ConceptModal from './components/Cards/ConceptModal';
import CodeEditor from './components/CodeEditors/CodeEditor';
import ProfilePage from './components/Profile/ProfilePage';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/LogIn/SignUp';
import Login from './components/LogIn/Login';
import AdminDashboard from './components/Admin-Dashboard/AdminDashboard';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
  const goToAdmin = () => setCurrentPage('admin');

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onGetStarted={goToSignUp}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onSignUp={goToSignUp}
        onLogin={goToLogin}
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
        onLogin={(loginData) => {
          if (loginData && loginData.isAdmin) {
            setIsAdmin(true);
            goToAdmin();
          } else {
            setUserData(loginData || userData);
            goToLanguages();
          }
        }}
        onSignUp={goToSignUp}
        onHome={goToLanding}
      />
    );
  }

  // Admin Dashboard Page
  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
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
        userData={userData}
      />
    )}
    </div>
  );
}

export default App;
