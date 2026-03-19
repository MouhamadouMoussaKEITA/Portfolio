import React, { useEffect, useRef } from 'react';

const About = () => {
  const revealRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (revealRef.current) observer.observe(revealRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about section-padding bg-surface">
      <div className="container about-container reveal-up" ref={revealRef}>
        <div className="section-header text-center">
          <span className="section-subtitle">Découvrez mon parcours</span>
          <h2 className="section-title">À propos de <span className="text-gradient">moi</span></h2>
        </div>
        
        <div className="about-grid mt-5">
          <div className="about-image-wrapper">
            <div className="about-image-inner">
              <img src="images/about.jpg" alt="Illustration de présentation" className="rounded-image" loading="lazy" />
              <div className="experience-card glass-card">
                <span className="number">3+</span>
                <span className="text">Années<br/>d'études</span>
              </div>
            </div>
            
            <div className="mt-5">
              <h3 className="about-heading mb-3">Profil</h3>
              <p className="text-muted mb-4" style={{ textAlign: "justify" }}>
                Curieux et rigoureux, ce qui me passionne avant tout c'est la <strong>partie fonctionnelle</strong> : l'analyse des besoins, la conception, le <strong>management des systèmes d'information (SI)</strong>, ainsi que la <strong>gestion de projet</strong>. Mon objectif est d'intégrer un Master orienté Management des SI afin d'allier mon bagage technique à une vision stratégique et métier, garantissant l'alignement parfait entre les solutions IT et les objectifs de l'entreprise.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}>
                <a href="#contact" className="btn btn-primary" style={{marginTop: 0}}>Me contacter</a>
              </div>
            </div>
          </div>
          
          <div className="about-content">
            {/* Formations */}
            <h3 className="about-heading mb-4 text-gradient"><i className="fa-solid fa-graduation-cap"></i> Formations</h3>
            
            <div className="timeline-item mb-4 glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-primary)' }}>
              <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>BUT Informatique</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>IUT de Bayonne et du Pays Basque | 2024-2025</p>
              <ul className="text-muted" style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', marginBottom: '0' }}>
                <li>Conception et pilotage de systèmes d'information</li>
                <li>Développement d'applications web</li>
                <li>Modélisation de bases de données (SQL/NoSQL)</li>
                <li>Data visualisation et indicateurs décisionnels (Power BI)</li>
                <li>Gestion de projet agile</li>
              </ul>
            </div>

            <div className="timeline-item mb-5 glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-primary)' }}>
              <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Diplôme Supérieur de technologie en Informatique</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Ecole Supérieure polytechnique de DAKAR | 2022-2024</p>
              <ul className="text-muted" style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', marginBottom: '0' }}>
                <li>Développement d'applications web et mobiles</li>
                <li>Optimisation et automatisation via scripting</li>
                <li>Gestion de projet (méthodes traditionnelles et agiles)</li>
              </ul>
            </div>

            {/* Expériences */}
            <h3 className="about-heading mb-4 text-gradient"><i className="fa-solid fa-briefcase"></i> Expériences</h3>
            
            <div className="timeline-item mb-4 glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-secondary)' }}>
              <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Développement web et Management de SI</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>BysMaquillage, Bayonne | 2025-2026</p>
              <ul className="text-muted" style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', marginBottom: '0' }}>
                <li>Développement et amélioration de modules Magento</li>
                <li>Conception de nouveaux modules du système d'information</li>
                <li>Participation au pilotage de projet</li>
              </ul>
            </div>

            <div className="timeline-item mb-4 glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-secondary)' }}>
              <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Développement web</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Dimione Systems, Bidart | 2025</p>
              <ul className="text-muted" style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', marginBottom: '0' }}>
                <li>Développement d'une application web (Angular / Laravel)</li>
                <li>Conception et gestion de bases de données</li>
                <li>Gestion de projet agile</li>
              </ul>
            </div>

            <div className="timeline-item glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-secondary)' }}>
              <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>Développement web et Gestion de données</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Défar SCI, Dakar | 2024</p>
              <ul className="text-muted" style={{ fontSize: '0.9rem', paddingLeft: '1.2rem', marginBottom: '0' }}>
                <li>Développement d'une application web interne</li>
                <li>Collecte et structuration de données</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
