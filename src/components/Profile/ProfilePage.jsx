import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import ThemeToggle from '../shared/ThemeToggle';

const ProfilePage = ({ userData, onSave, isDarkMode, toggleTheme, onHomeClick, onLogout }) => {
  const [form, setForm] = useState({ ...userData });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
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
    setErrors({});
    setShowToast(true);
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {showToast && (
        <div className={styles.toast}>
          <span className={styles.toastIcon}>✅</span>
          Save successfully!
        </div>
      )}

      {/* Navbar */}
      <nav className={styles.navbar}>
        <img 
          src="/CODAPT_LOGO.png" 
          alt="Codapt" 
          className={styles.logo}
          onClick={onHomeClick}
        />
        
        <div className={styles.navRight}>
          <div className={styles.nameBadge} onClick={onHomeClick}>
            {userData?.name || 'Name'}
          </div>
          
          <ThemeToggle 
            isDarkMode={isDarkMode} 
            onClick={toggleTheme}
          />
          
          <div className={styles.profileWrapper}>
            <div className={styles.avatarCircleSmall}>
              {form.photo ? (
                <img src={form.photo} alt="Profile" className={styles.profilePhoto} />
              ) : (
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
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

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Profile</h1>
          
          {/* Header Section with Avatar */}
          <div className={styles.headerSection}>
            <div className={styles.avatarCircleLarge} onClick={triggerFileInput}>
              {form.photo ? (
                <img src={form.photo} alt="Profile" className={styles.profilePhotoLarge} />
              ) : (
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ color: '#333' }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
              <div className={styles.cameraIcon}>📷</div>
            </div>
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            
            <div className={styles.infoLabels}>
              <div className={styles.labelYellow}>Name : <span>{userData?.name}</span></div>
              <div className={styles.labelYellow}>User Name : <span>{userData?.username}</span></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Name</label>
              <input 
                type="text" 
                className={styles.inputField}
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>User Name</label>
              <input 
                type="text" 
                className={styles.inputField}
                value={form.username || ''}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              {errors.username && <span className={styles.errorText}>{errors.username}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Email</label>
              <input 
                type="email" 
                className={styles.inputField}
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Password</label>
              <input 
                type="password" 
                className={styles.inputField}
                value={form.password || ''}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className={styles.saveBtnWrapper}>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;