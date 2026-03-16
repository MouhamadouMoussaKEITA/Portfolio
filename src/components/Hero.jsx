import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [stringIndex, setStringIndex] = useState(0);
  
  const strings = ["étudiant en BUT3 Informatique", "passionné par le Management des SI", "futur Chef de Projet IT", "à la recherche d'une alternance (Sept. 2026)"];
  const typingDelay = isDeleting ? 50 : 100 + Math.random() * 50;

  useEffect(() => {
    let timeout;
    const currentString = strings[stringIndex];

    const type = () => {
      if (isDeleting) {
        setDisplayText((prev) => currentString.substring(0, prev.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }
      } else {
        setDisplayText((prev) => currentString.substring(0, prev.length + 1));
        if (displayText === currentString) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }
    };

    timeout = setTimeout(type, typingDelay);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, stringIndex, strings, typingDelay]);

  // Use Intersection Observer for reveal animation
  const revealRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (revealRef.current) observer.observe(revealRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero section-padding">
      <div className="container hero-container">
        <div className="hero-content reveal-left" ref={revealRef}>
          <span className="subtitle-badge">Étudiant en Informatique</span>
          <h1 className="hero-title">
            Bonjour, je suis <br />
            <span className="text-gradient">Mouhamadou Moussa KEITA</span>
          </h1>
          <h2 className="hero-subtitle typing-wrapper">
            Je suis <span className="typing-effect">{displayText}</span><span className="cursor">|</span>
          </h2><br />
          <p className="hero-description text-muted">
            Étudiant en 3e année de BUT Informatique à l'IUT de Bayonne. Je suis passionné par la gestion de projet, l'analyse fonctionnelle et le management des systèmes d'information (SI). J'envisage d'intégrer un Master orienté SI pour allier compétences techniques et pilotage stratégique des enjeux métiers.
          </p>
          <div className="hero-actions">
            <a href="#about" className="btn btn-primary">Mon Parcours <i className="fa-solid fa-arrow-right"></i></a>
            <a href="/cv.pdf" download="CV_Mouhamadou_Moussa_KEITA.pdf" className="btn btn-secondary">
              <i className="fa-solid fa-download"></i> Télécharger CV
            </a>
          </div>
          <div className="social-links mt-4">
            <a href="https://github.com/MouhamadouMoussaKEITA" target="_blank" rel="noreferrer" aria-label="Mon profil GitHub" className="social-icon"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/mouhamadou-moussa-keita-ba73b02b8/?originalSubdomain=fr" target="_blank" rel="noreferrer" aria-label="Mon profil LinkedIn" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="hero-image-wrapper reveal-right" ref={imageRef}>
          <div className="image-border">
            <img src="/images/profil.jpg" alt="Portrait de Mouhamadou Moussa KEITA" className="hero-image" loading="lazy" />
          </div>
          <div className="floating-badge badge-1">
            <i className="fa-solid fa-list-check"></i>
            <span>Gestion Projet</span>
          </div>
          <div className="floating-badge badge-2">
            <i className="fa-solid fa-sitemap"></i>
            <span>Management SI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
