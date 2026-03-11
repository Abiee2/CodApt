import React, { useState, useEffect } from 'react';
import LanguageCards from './components/Cards/LanguageCards'; 
import ConceptModal from './components/Cards/ConceptModal';
import CodeEditor from './components/CodeEditors/CodeEditor';
import ProfilePage from './components/Profile/ProfilePage';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/LogIn/SignUp';
import Login from './components/LogIn/Login';
import ChooseLevelModal from './components/Cards/ChooseLevelModal';
import AdminDashboard from './components/Admin-Dashboard/AdminDashboard';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [userData, setUserData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    photo: null
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  
  const handleSaveProfile = (formData) => setUserData(formData);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    setIsAdmin(false);
    setUserData({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      photo: null
    });
    setSelectedLang(null);
    setSelectedLevel(null);
    setSelectedConcept(null);
    goToLanding();
  };

  const goToAdmin = () => setCurrentPage('admin');
  const goToLanding = () => setCurrentPage('landing');
  const goToSignUp = () => setCurrentPage('signup');
  const goToLogin = () => setCurrentPage('login');
  const goToLanguages = () => setCurrentPage('languages');
  const goToProfile = () => setCurrentPage('profile');

  // Landing, SignUp, Login, Admin, Profile pages remain the same
  if (currentPage === 'landing') return <LandingPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} onSignUp={goToSignUp} onLogin={goToLogin} onGetStarted={goToSignUp} />;
  if (currentPage === 'signup') return <SignUp isDarkMode={isDarkMode} toggleTheme={toggleTheme} onSignUp={(data)=>{setUserData(data); goToLanguages()}} onLogin={goToLogin} onHome={goToLanding} />;
  if (currentPage === 'login') return <Login isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogin={(loginData)=>{loginData?.isAdmin ? (setIsAdmin(true), goToAdmin()) : (setUserData(loginData || userData), goToLanguages())}} onSignUp={goToSignUp} onHome={goToLanding} />;
  if (currentPage === 'admin') return <AdminDashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
  if (currentPage === 'profile') return <ProfilePage userData={userData} onSave={handleSaveProfile} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onHomeClick={goToLanguages} onLogout={handleLogout} />;

  // MAIN FLOW
return (
  <div className="App">

    {!selectedConcept && (
      <>
        <LanguageCards
          onSelect={(lang)=>{ 
            setSelectedLang(lang); 
            setSelectedLevel(null); 
            setSelectedConcept(null); 
          }}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onProfileClick={goToProfile}
          onHomeClick={goToLanguages}
          onLogout={handleLogout}
          userData={userData}
        />

        {selectedLang && selectedLevel === null && (
          <ChooseLevelModal
            language={selectedLang}
            onSelectLevel={(level)=>setSelectedLevel(level)}
            onClose={()=>setSelectedLang(null)}
          />
        )}

        {selectedLang && selectedLevel !== null && (
          <ConceptModal
            language={selectedLang}
            level={selectedLevel}
            onSelect={(concept)=>setSelectedConcept(concept)}
            onClose={()=>setSelectedLevel(null)}
          />
        )}
      </>
    )}

    {selectedConcept && (
      <CodeEditor
        language={selectedLang}
        concept={selectedConcept}
        level={selectedLevel}
        onBack={()=>setSelectedConcept(null)}
        onProfileClick={goToProfile}
        onHomeClick={goToLanguages}
        onLogout={handleLogout}
        userData={userData}
        isDarkMode={isDarkMode}
      />
    )}

  </div>
);
}

export default App;