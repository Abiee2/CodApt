import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';

const SignUp = ({ isDarkMode, toggleTheme, onSignUp, onLogin, onHome }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google OAuth
      if (window.google) {
        window.google.accounts.oauth2.initTokenClient({
          client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your Client ID
          scope: 'email profile openid',
          callback: (response) => {
            if (response.access_token) {
              // Get user info
              fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: { Authorization: `Bearer ${response.access_token}` }
              })
              .then(res => res.json())
              .then(userInfo => {
                console.log('Google User:', userInfo);
                // Auto-fill form with Google info
                setFormData({
                  email: userInfo.email || '',
                  password: 'google-oauth' // Placeholder
                });
                // Continue to LanguageCards
                onSignUp();
              });
            }
          }
        });
      }
    };
  }, []);

  const handleGoogleClick = () => {
    // Trigger Google OAuth picker
    const client = window.google?.accounts?.oauth2?.initTokenClient({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      scope: 'email profile openid',
      callback: (response) => {
        if (response.access_token) {
          fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` }
          })
          .then(res => res.json())
          .then(userInfo => {
            console.log('Google User:', userInfo);
            setFormData({
              email: userInfo.email || '',
              password: 'google-oauth'
            });
            onSignUp();
          });
        }
      }
    });
    if (client) {
      client.requestAccessToken();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up with:', formData);
    onSignUp();
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <img 
          src="/CODAPT_LOGO.png" 
          alt="CodApt" 
          className={styles.logo}
          onClick={onHome}
        />
        
        <div className={styles.navRight}>
          <button 
            onClick={onLogin}
            className={styles.signUpBtn}
          >
            Login
          </button>
          <button 
            onClick={toggleTheme}
            className={styles.themeToggle}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Auth Card */}
      <main className={styles.main}>
        <div className={styles.authCard}>
          <img 
            src="/Welcome.png" 
            alt="Welcome!" 
            className={styles.welcomeImage} 
          />
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              className={styles.inputField}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className={styles.inputField}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            
            <button type="submit" className={styles.submitBtn}>
              Sign Up
            </button>
          </form>

          <p className={styles.footerText}>
            By signing up, I agree to CodApt <a href="#" className={styles.link}>Terms</a>
          </p>
          
          <p className={styles.footerText}>
            Need an account? <span className={styles.link} onClick={onLogin}>Login</span>
          </p>

          {/* Google Button */}
          <button className={styles.googleBtn} onClick={handleGoogleClick}>
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              width="18" 
              alt="G" 
            />
            Google
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
