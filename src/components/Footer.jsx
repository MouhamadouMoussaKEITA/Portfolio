import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="logo-footer">
              <span className="logo-highlight">M</span>. KEITA
            </a>
            <p className="text-muted mt-2 max-w-sm">Étudiant en BUT Informatique, passionné par la conception et le pilotage de systèmes d'information ainsi que la gestion de projets.</p>
          </div>
          <div className="footer-links-group">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Accueil</a></li>
              <li><a href="#about">À propos</a></li>
              <li><a href="#projects">Projets</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Réseaux</h4>
            <div className="social-links-footer">
              <a href="https://github.com/MouhamadouMoussaKEITA" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/mouhamadou-moussa-keita-ba73b02b8/?originalSubdomain=fr" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">&copy; <span id="currentYear">{currentYear}</span> Mouhamadou Moussa KEITA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
