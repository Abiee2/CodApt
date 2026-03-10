import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AdminUsers.module.css';

const UsersPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Marian R", email: "marian@gmail.com", progress: 74, color: "#76D7A4", enrolledDate: "2024-01-15", lastActive: "2024-03-20", scores: { python: 85, javascript: 78, java: 92 }, completedLessons: 45, certificates: 3, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 10 }, { week: 'Week 2', progress: 20 }, { week: 'Week 3', progress: 35 }, { week: 'Week 4', progress: 45 }, { week: 'Week 5', progress: 55 }, { week: 'Week 6', progress: 65 }, { week: 'Week 7', progress: 74 }] },
    { id: 2, name: "Samantha V", email: "sam@gmail.com", progress: 32, color: "#F1C40F", enrolledDate: "2024-02-01", lastActive: "2024-03-18", scores: { python: 45, javascript: 52, java: 38 }, completedLessons: 18, certificates: 1, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 5 }, { week: 'Week 2', progress: 12 }, { week: 'Week 3', progress: 18 }, { week: 'Week 4', progress: 25 }, { week: 'Week 5', progress: 32 }] },
    { id: 3, name: "Ana L", email: "ana@gmail.com", progress: 61, color: "#76D7A4", enrolledDate: "2024-01-20", lastActive: "2024-03-19", scores: { python: 72, javascript: 68, java: 75 }, completedLessons: 38, certificates: 2, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 8 }, { week: 'Week 2', progress: 18 }, { week: 'Week 3', progress: 28 }, { week: 'Week 4', progress: 40 }, { week: 'Week 5', progress: 50 }, { week: 'Week 6', progress: 61 }] },
    { id: 4, name: "Mark N", email: "mark@gmail.com", progress: 73, color: "#76D7A4", enrolledDate: "2024-01-10", lastActive: "2024-03-20", scores: { python: 88, javascript: 82, java: 79 }, completedLessons: 42, certificates: 3, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 12 }, { week: 'Week 2', progress: 24 }, { week: 'Week 3', progress: 36 }, { week: 'Week 4', progress: 50 }, { week: 'Week 5', progress: 60 }, { week: 'Week 6', progress: 68 }, { week: 'Week 7', progress: 73 }] },
    { id: 5, name: "Wynona K", email: "Wyn@gmail.com", progress: 41, color: "#F1C40F", enrolledDate: "2024-02-05", lastActive: "2024-03-15", scores: { python: 55, javascript: 48, java: 52 }, completedLessons: 22, certificates: 1, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 6 }, { week: 'Week 2', progress: 15 }, { week: 'Week 3', progress: 22 }, { week: 'Week 4', progress: 30 }, { week: 'Week 5', progress: 41 }] },
    { id: 6, name: "Rainier P", email: "rainier@gmail.com", progress: 19, color: "#E74C3C", enrolledDate: "2024-02-10", lastActive: "2024-03-10", scores: { python: 28, javascript: 22, java: 25 }, completedLessons: 8, certificates: 0, isBanned: true, progressHistory: [{ week: 'Week 1', progress: 3 }, { week: 'Week 2', progress: 8 }, { week: 'Week 3', progress: 14 }, { week: 'Week 4', progress: 19 }] },
    { id: 7, name: "Catherine S", email: "cath@gmail.com", progress: 52, color: "#76D7A4", enrolledDate: "2024-01-25", lastActive: "2024-03-17", scores: { python: 65, javascript: 58, java: 62 }, completedLessons: 30, certificates: 2, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 7 }, { week: 'Week 2', progress: 16 }, { week: 'Week 3', progress: 25 }, { week: 'Week 4', progress: 35 }, { week: 'Week 5', progress: 45 }, { week: 'Week 6', progress: 52 }] },
    { id: 8, name: "Donn T", email: "don@gmail.com", progress: 55, color: "#76D7A4", enrolledDate: "2024-01-18", lastActive: "2024-03-19", scores: { python: 68, javascript: 72, java: 58 }, completedLessons: 32, certificates: 2, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 9 }, { week: 'Week 2', progress: 20 }, { week: 'Week 3', progress: 30 }, { week: 'Week 4', progress: 40 }, { week: 'Week 5', progress: 48 }, { week: 'Week 6', progress: 55 }] },
    { id: 9, name: "Javier Q", email: "javier@gmail.com", progress: 30, color: "#F1C40F", enrolledDate: "2024-02-08", lastActive: "2024-03-14", scores: { python: 42, javascript: 35, java: 40 }, completedLessons: 16, certificates: 0, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 4 }, { week: 'Week 2', progress: 10 }, { week: 'Week 3', progress: 18 }, { week: 'Week 4', progress: 24 }, { week: 'Week 5', progress: 30 }] },
    { id: 10, name: "Selena O", email: "selena@gmail.com", progress: 39, color: "#F1C40F", enrolledDate: "2024-02-03", lastActive: "2024-03-16", scores: { python: 48, javascript: 52, java: 45 }, completedLessons: 20, certificates: 1, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 5 }, { week: 'Week 2', progress: 12 }, { week: 'Week 3', progress: 20 }, { week: 'Week 4', progress: 28 }, { week: 'Week 5', progress: 39 }] },
    { id: 11, name: "Hazel M", email: "hazel@gmail.com", progress: 53, color: "#76D7A4", enrolledDate: "2024-01-22", lastActive: "2024-03-18", scores: { python: 62, javascript: 58, java: 65 }, completedLessons: 31, certificates: 2, isBanned: false, progressHistory: [{ week: 'Week 1', progress: 8 }, { week: 'Week 2', progress: 18 }, { week: 'Week 3', progress: 28 }, { week: 'Week 4', progress: 38 }, { week: 'Week 5', progress: 48 }, { week: 'Week 6', progress: 53 }] },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showProgressGraph, setShowProgressGraph] = useState(false);
  const [graphUser, setGraphUser] = useState(null);
  const [actionType, setActionType] = useState('');
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closePanel = () => {
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email });
    setShowEditModal(true);
  };

  const saveEdit = () => {
    setUsers(users.map(u => 
      u.id === selectedUser.id ? { ...u, name: editForm.name, email: editForm.email } : u
    ));
    setSelectedUser({ ...selectedUser, name: editForm.name, email: editForm.email });
    setShowEditModal(false);
  };

  const openActionModal = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (actionType === 'delete') {
      setUsers(users.filter(u => u.id !== selectedUser.id));
    } else if (actionType === 'ban') {
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, isBanned: true } : u
      ));
    } else if (actionType === 'unban') {
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, isBanned: false } : u
      ));
    } else if (actionType === 'reset') {
      alert(`Password reset link sent to ${selectedUser.email}`);
    }
    setShowActionModal(false);
    setSelectedUser(null);
  };

  return (
    <div className={styles.usersPanelWrapper}>
      <h1 className={styles.panelTitle}>Users</h1>

      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search Users......" 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.statsSummary}>
        <div className={styles.statBox}>
          <span>Total Learners</span>
          <h2>{users.length}</h2>
        </div>
        <div className={styles.statBox}>
          <span>Active Learners</span>
          <h2>{Math.round((users.filter(u => !u.isBanned).length / users.length) * 100)}%</h2>
        </div>
      </div>

      <div className={styles.activityCard}>
        <div className={styles.activityHeader}>
          <h3>Recent User Activity</h3>
        </div>

        <div className={styles.tableScrollArea}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index} className={user.isBanned ? styles.bannedRow : ''}>
                    <td className={styles.userCell}>
                      <div className={styles.avatar} style={{ backgroundColor: user.color }}>
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td className={styles.progressCell} onClick={() => { setGraphUser(user); setShowProgressGraph(true); }} style={{ cursor: 'pointer' }}>
                      <div className={styles.progressTrack}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${user.progress}%`, backgroundColor: user.color }}
                        ></div>
                      </div>
                      <span className={styles.progressText}>{user.progress}%</span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${user.isBanned ? styles.bannedStatus : styles.activeStatus}`}>
                        {user.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <button className={styles.viewBtn} onClick={() => setSelectedUser(user)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && !showEditModal && !showActionModal && (
        <div className={styles.detailsPanel}>
          <div className={styles.detailsPanelContent}>
            <div className={styles.detailsPanelHeader}>
              <h2>User Details</h2>
              <button className={styles.closeBtn} onClick={closePanel}>×</button>
            </div>
            
            <div className={styles.userProfileSection}>
              <div className={styles.userAvatarLarge} style={{ backgroundColor: selectedUser.color }}>
                {selectedUser.name.charAt(0)}
              </div>
              <h3>{selectedUser.name}</h3>
              <p>{selectedUser.email}</p>
              <span className={`${styles.statusBadge} ${selectedUser.isBanned ? styles.bannedStatus : styles.activeStatus}`}>
                {selectedUser.isBanned ? 'Banned' : 'Active'}
              </span>
            </div>

            <div className={styles.detailsSection}>
              <h4>Progress</h4>
              <div className={styles.progressBarLarge}>
                <div 
                  className={styles.progressFillLarge} 
                  style={{ width: `${selectedUser.progress}%`, backgroundColor: selectedUser.color }}
                ></div>
              </div>
              <p className={styles.progressPercentage}>{selectedUser.progress}% Complete</p>
            </div>

            <div className={styles.detailsSection}>
              <h4>Scores</h4>
              <div className={styles.scoresGrid}>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Python</span>
                  <span className={styles.scoreValue}>{selectedUser.scores.python}</span>
                </div>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>JavaScript</span>
                  <span className={styles.scoreValue}>{selectedUser.scores.javascript}</span>
                </div>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Java</span>
                  <span className={styles.scoreValue}>{selectedUser.scores.java}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <h4>Statistics</h4>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <span>Joined Date</span>
                  <span>{selectedUser.enrolledDate}</span>
                </div>
                <div className={styles.statItem}>
                  <span>Last Active</span>
                  <span>{selectedUser.lastActive}</span>
                </div>
                <div className={styles.statItem}>
                  <span>Completed Lessons</span>
                  <span>{selectedUser.completedLessons}</span>
                </div>
                <div className={styles.statItem}>
                  <span>Certificates</span>
                  <span>{selectedUser.certificates}</span>
                </div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.editUserBtn} onClick={() => openEditModal(selectedUser)}>
                ✏️ Edit User
              </button>
              <button className={styles.resetPasswordBtn} onClick={() => openActionModal(selectedUser, 'reset')}>
                🔑 Reset Password
              </button>
              {selectedUser.isBanned ? (
                <button className={styles.unbanUserBtn} onClick={() => openActionModal(selectedUser, 'unban')}>
                  ✅ Unban User
                </button>
              ) : (
                <button className={styles.banUserBtn} onClick={() => openActionModal(selectedUser, 'ban')}>
                  🚫 Ban User
                </button>
              )}
              <button className={styles.deleteUserBtn} onClick={() => openActionModal(selectedUser, 'delete')}>
                🗑️ Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Edit User</h2>
              <button className={styles.closeBtn} onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input 
                  type="text" 
                  className={styles.inputField}
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  className={styles.inputField}
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {showActionModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>
                {actionType === 'delete' && 'Delete User'}
                {actionType === 'ban' && 'Ban User'}
                {actionType === 'unban' && 'Unban User'}
                {actionType === 'reset' && 'Reset Password'}
              </h2>
              <button className={styles.closeBtn} onClick={() => setShowActionModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <p>
                {actionType === 'delete' && `Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`}
                {actionType === 'ban' && `Are you sure you want to ban ${selectedUser.name}? They will lose access to the platform.`}
                {actionType === 'unban' && `Are you sure you want to unban ${selectedUser.name}? They will regain access to the platform.`}
                {actionType === 'reset' && `A password reset link will be sent to ${selectedUser.email}.`}
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowActionModal(false)}>Cancel</button>
              <button 
                className={`${styles.confirmBtn} ${actionType === 'delete' ? styles.deleteConfirmBtn : actionType === 'ban' ? styles.banConfirmBtn : actionType === 'unban' ? styles.unbanConfirmBtn : styles.resetConfirmBtn}`}
                onClick={confirmAction}
              >
                {actionType === 'delete' && 'Delete'}
                {actionType === 'ban' && 'Ban'}
                {actionType === 'unban' && 'Unban'}
                {actionType === 'reset' && 'Send Reset Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showProgressGraph && graphUser && (
        <div className={styles.modalOverlay} onClick={() => setShowProgressGraph(false)}>
          <div className={styles.graphModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{graphUser.name}'s Progress</h2>
              <button className={styles.closeBtn} onClick={() => setShowProgressGraph(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.graphSubtitle}>Progress over time</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={graphUser.progressHistory} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    name="Progress %" 
                    stroke={graphUser.color} 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: graphUser.color }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className={styles.graphStats}>
                <div className={styles.graphStatItem}>
                  <span>Current Progress</span>
                  <span className={styles.graphStatValue}>{graphUser.progress}%</span>
                </div>
                <div className={styles.graphStatItem}>
                  <span>Weeks Active</span>
                  <span className={styles.graphStatValue}>{graphUser.progressHistory.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPanel;
