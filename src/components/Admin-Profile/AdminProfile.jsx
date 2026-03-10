import React, { useState } from 'react';
import styles from './AdminProfile.module.css';

const AdminProfile = ({ isDarkMode, toggleTheme, onBack }) => {
  const [adminData, setAdminData] = useState({
    name: 'Admin User',
    email: 'admin@codapt.com',
    username: 'admin',
    role: 'Administrator'
  });

  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.profileWrapper}>
      {/* Toast Notification */}
      {showToast && (
        <div className={styles.toast}>
          <span>✓</span> Profile updated successfully!
        </div>
      )}

      <div className={styles.profileCard}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>

        <div className={styles.headerSection}>
          <div className={styles.avatarCircle}>
            <span>A</span>
          </div>
          <div className={styles.adminInfo}>
            <h2>{adminData.name}</h2>
            <p>{adminData.role}</p>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input 
              type="text" 
              className={styles.inputField}
              value={adminData.name}
              onChange={(e) => setAdminData({...adminData, name: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Username</label>
            <input 
              type="text" 
              className={styles.inputField}
              value={adminData.username}
              onChange={(e) => setAdminData({...adminData, username: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email" 
              className={styles.inputField}
              value={adminData.email}
              onChange={(e) => setAdminData({...adminData, email: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Role</label>
            <input 
              type="text" 
              className={styles.inputField}
              value={adminData.role}
              disabled
            />
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

