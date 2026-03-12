import React, { useState, useEffect } from 'react';

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/Show Header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);

      // Active Navigation Link
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className="header glass-nav" 
      id="header"
      style={{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)', transition: 'transform 0.3s ease' }}
    >
      <div className="container header-container">
        <a href="#home" className="logo" aria-label="Retour à l'accueil">
          <span className="logo-highlight">M</span>. KEITA
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            aria-label="Basculer le thème clair/sombre"
          >
            {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Ouvrir le menu" 
            aria-expanded={isMenuOpen} 
            onClick={toggleMenu}
          >
            <span className="hamburger"></span>
          </button>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li>
              <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Accueil</a>
            </li>
            <li>
              <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>À propos</a>
            </li>
            <li>
              <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Projets</a>
            </li>
            <li>
              <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Compétences</a>
            </li>
            <li>
              <a href="#contact" className={`nav-link btn-ghost ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
