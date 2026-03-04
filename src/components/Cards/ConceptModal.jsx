import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import styles from './ConceptModal.module.css';

const concepts = [
  "Variable", "Data Types", "Operators", "Conditional Statements",
  "Loops", "Functions", "Input & Output", "Error Handling"
];

// Concept descriptions data
const conceptDescriptions = {
  "Variable": "A container for storing data values. Variables are like boxes that hold information you can use and manipulate in your program.",
  "Data Types": "The classification of data that determines the type of operations that can be performed on it. Common types include numbers, strings, and booleans.",
  "Operators": "Symbols that perform operations on values or variables. Examples include arithmetic (+, -, *, /), comparison (==, >, <), and logical (&&, ||) operators.",
  "Conditional Statements": "Code blocks that execute different actions based on whether a condition is true or false. Common examples include if, else, and switch statements.",
  "Loops": "Control structures that repeat a block of code multiple times. Common types include for loops, while loops, and do-while loops.",
  "Functions": "Reusable blocks of code that perform specific tasks. Functions help organize code and make it more modular and maintainable.",
  "Input & Output": "Methods for interacting with users and external systems. Input receives data from users, while output displays results or information.",
  "Error Handling": "Techniques for managing and responding to errors that occur during program execution. Helps prevent crashes and provides better user experience."
};

const ConceptModal = ({ language, onSelect, onClose }) => {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleConceptClick = (index) => {
    setSelectedConcept(concepts[index]);
    setActiveIndex(index);
  };

  const handleStart = () => {
    if (selectedConcept) {
      onSelect(selectedConcept);
      setSelectedConcept(null);
    }
  };

  const handleCloseCard = () => {
    setSelectedConcept(null);
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}> ✕ </button>
        <h2 className={styles.modalTitle}>
          Choose a Concept - {language?.toUpperCase()}
        </h2>

        {/* Show Concept Card if selected */}
        {selectedConcept ? (
          <div className={styles.conceptCardDetail}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{selectedConcept}</h3>
              <button className={styles.backBtn} onClick={handleCloseCard}>
                ← Back
              </button>
            </div>
            
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>
                <span>📚</span>
              </div>
              <p className={styles.cardDescription}>
                {conceptDescriptions[selectedConcept]}
              </p>
            </div>

            <button className={styles.startBtn} onClick={handleStart}>
              <span>▶</span> Start Learning
            </button>
          </div>
        ) : (
          <div className={styles.conceptCarousel}>
            {/* Left Navigation Arrow */}
            <button 
              className={styles.navArrow} 
              onClick={() => swiperRef.current.swiper.slidePrev()}
              disabled={activeIndex === 0}
            >
              ←
            </button>

            {/* Swiper Carousel */}
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
              }}
              pagination={{
                el: `.${styles.dotsContainer}`,
                clickable: true,
              }}
              navigation={{
                nextEl: `.${styles.navArrowRight}`,
                prevEl: `.${styles.navArrowLeft}`,
              }}
              onSlideChange={handleSlideChange}
              className={styles.swiperContainer}
            >
              {concepts.map((item, index) => (
                <SwiperSlide key={item} className={styles.swiperSlide}>
                  <div
                    className={`${styles.conceptCard} ${activeIndex === index ? styles.activeCard : ''}`}
                    onClick={() => handleConceptClick(index)}
                  >
                    <div className={styles.cardIcon}>
                      <span>📖</span>
                    </div>
                    <span className={styles.cardText}>{item}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Navigation Arrow */}
            <button 
              className={`${styles.navArrow} ${styles.navArrowRight}`} 
              onClick={() => swiperRef.current.swiper.slideNext()}
              disabled={activeIndex === concepts.length - 1}
            >
              →
            </button>

            {/* Dots Indicator */}
            <div className={styles.dotsContainer}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptModal;