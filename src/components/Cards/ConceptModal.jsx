import React from 'react';
import styles from './ConceptModal.module.css';

const concepts = [
  "Variable", "Data Types", "Operators", "Conditional Statements",
  "Loops", "Functions", "Input & Output", "Error Handling"
];

const ConceptModal = ({ language, onSelect, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
         {/* Close Button */} 
        <button className={styles.closeBtn} onClick={onClose}> ✕ </button>
        <h2 className={styles.modalTitle}>
          Choose a Concept - {language?.toUpperCase()}
        </h2>
        
        <div className={styles.conceptGrid}>
          {concepts.map((item) => (
            <div 
              key={item} 
              className={styles.conceptCard} 
              onClick={() => onSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConceptModal;