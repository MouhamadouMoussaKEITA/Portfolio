import React, { useEffect, useRef } from 'react';

const Projects = () => {
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

  const projects = [
    {
      id: 1,
      title: "Dimione Systems - App Web",
      image: "images/project1.jpg",
      tags: ["Angular", "Laravel", "SQL"],
      desc: "Création d’une application web performante et gestion optimisée de bases de données relationnelles et NoSQL via une architecture Agile.",
      github: "#",
      demo: "https://www.dimione.com/home"
    },
    {
      id: 2,
      title: "Défar SCI - Portail de Stage",
      image: "images/project2.jpg",
      tags: ["Web", "BDD", "Data"],
      desc: "Développement d'une plateforme sécurisée pour la gestion des demandes de stage, intégrant des flux de collecte et de traitement de données.",
      github: "#",
      demo: "https://www.defarsci.fr/"
    },
    {
      id: 3,
      title: "Time Harmony",
      image: "images/project3.jpg",
      tags: ["Algorithmie", "Planification"],
      desc: "Conception d'un outil collaboratif intelligent visant à synchroniser et trouver automatiquement des créneaux de disponibilité communs pour des groupes.",
      github: "https://github.com/masson-rafael/TimeHarmony",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="projects section-padding">
      <div className="container reveal-up" ref={revealRef}>
        <div className="section-header text-center mb-5">
          <span className="section-subtitle">Mon Portfolio</span>
          <h2 className="section-title">Mes <span className="text-gradient">Réalisations</span></h2>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <article key={project.id} className="portfolio-card glass-card">
              <div className="portfolio-img-container">
                <img src={project.image} alt={`Aperçu du projet ${project.title}`} loading="lazy" />
                <div className="portfolio-overlay">
                  <div className="portfolio-links">
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label="Voir le code source" className="icon-link tooltip" data-tooltip="Code Source">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" aria-label="Voir la démo en direct" className="icon-link tooltip" data-tooltip="Démo Live">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <div className="tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc text-muted">{project.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
