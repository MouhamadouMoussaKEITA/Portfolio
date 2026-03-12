import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      id="scrollToTop" 
      className={`scroll-top-btn ${isVisible ? 'visible' : ''}`} 
      aria-label="Retour en haut de page"
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop;
