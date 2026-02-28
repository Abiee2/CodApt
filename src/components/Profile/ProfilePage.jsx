import React, { useState, useRef } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ userData, onSave, isDarkMode, toggleTheme, onHomeClick }) => {
  // Use local state for editing
  const [form, setForm] = useState({ ...userData });
  const [errors, setErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState('');
  const fileInputRef = useRef(null);

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
      setSaveMessage('');
      return;
    }
    
    onSave(form);
    setErrors({});
    setSaveMessage('✅ Save successfully!');
    
    setTimeout(() => setSaveMessage(''), 3000);
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
          
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          
          <div className={styles.profileWrapper}>
            <div className={styles.avatarCircleSmall}>
              {form.photo ? (
                <img src={form.photo} alt="Profile" className={styles.profilePhoto} />
              ) : (
                <span>👤</span>
              )}
            </div>
            
            <div className={styles.dropdown}>
              <div className={styles.arrowUp}></div>
              <ul className={styles.menuList}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a></li>
                <li><a href="#">Log Out</a></li>
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
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
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

            {/* Success Message */}
            {saveMessage && (
              <div className={styles.successMessage}>{saveMessage}</div>
            )}
            
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