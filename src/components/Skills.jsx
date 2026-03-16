import React, { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const devSkills = [
    { name: "HTML, CSS, Bootstrap", icon: "fa-html5", progress: "90%" },
    { name: "JavaScript, TypeScript", icon: "fa-js", progress: "85%" },
    { name: "PHP", icon: "fa-php", progress: "80%" },
    { name: "React, Angular, Laravel, SpringBoot", icon: "fa-react", progress: "80%" }
  ];

  const dataToolsSkills = [
    { name: "MySQL, Oracle, MongoDB", icon: "fa-database text-solid", progress: "85%" },
    { name: "Excel, Power BI", icon: "fa-chart-pie text-solid", progress: "80%" },
    { name: "Odoo, Wordpress", icon: "fa-wordpress", progress: "75%" },
    { name: "Git & Versioning", icon: "fa-git-alt", progress: "85%" }
  ];

  const projectSkills = [
    { name: "Jira, Trello",                          icon: "fa-jira" },
    { name: "MS Project",                            icon: "fa-tasks text-solid" },
    { name: "Scrum (Méthodologie Agile)",            icon: "fa-rotate text-solid" },
    { name: "Analyse fonctionnelle",                 icon: "fa-magnifying-glass-chart text-solid" },
    { name: "Rédaction cahier des charges",          icon: "fa-file-lines text-solid" },
    { name: "Veille technologique & Innovation",     icon: "fa-lightbulb text-solid" },
    { name: "Communication & Esprit d'équipe",       icon: "fa-users text-solid" },
    { name: "Rigueur & Autonomie",                   icon: "fa-bullseye text-solid" },
  ];

  const getIconClass = (icon) =>
    icon.includes('text-solid')
      ? `fa-solid ${icon.replace(' text-solid', '')}`
      : `fa-brands ${icon}`;

  return (
    <section id="skills" className="skills section-padding bg-surface">
      <div className="container reveal-up" ref={containerRef}>
        <div className="section-header text-center mb-5">
          <span className="section-subtitle">Expertise Technique & Fonctionnelle</span>
          <h2 className="section-title">Mes <span className="text-gradient">Domaines</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* ── Gestion Projet — pleine largeur ── */}
          <div
            className="skill-box glass-card hover-glow"
            style={{ gridColumn: '1 / -1' }}
          >
            <div className="skill-header">
              <div className="icon-wrapper"><i className="fa-solid fa-list-check"></i></div>
              <h3>Gestion Projet & Management SI</h3>
            </div>

            <ul style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {projectSkills.map((tool, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(201,123,58,0.03)',
                    border: '1px solid rgba(201,123,58,0.07)',
                    borderRadius: '4px',
                    transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(201,123,58,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(201,123,58,0.22)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(201,123,58,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(201,123,58,0.07)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    background: index % 2 === 0
                      ? 'rgba(201,123,58,0.1)'
                      : 'rgba(45,156,170,0.1)',
                    color: index % 2 === 0
                      ? 'var(--accent-primary, #c97b3a)'
                      : 'var(--accent-teal, #2d9caa)',
                    fontSize: '0.95rem',
                  }}>
                    <i className={getIconClass(tool.icon)}></i>
                  </div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem',
                    fontWeight: '500',
                    color: 'var(--text-primary, #f5efe8)',
                    lineHeight: 1.3,
                  }}>
                    {tool.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── BD + Socle Dev — directement dans la grille ── */}
          <div className="skill-box glass-card hover-glow">
              <div className="skill-header">
                <div className="icon-wrapper"><i className="fa-solid fa-database"></i></div>
                <h3>Bases de données & Outils</h3>
              </div>
              <ul className="skill-list">
                {dataToolsSkills.map((skill, index) => (
                  <li key={index}>
                    <div className="skill-name">
                      <i className={`${getIconClass(skill.icon)} skill-icon`}></i>
                      {skill.name}
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: inView ? skill.progress : '0%',
                          transition: inView
                            ? `width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) ${index * 0.2}s`
                            : 'none'
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="skill-box glass-card hover-glow">
              <div className="skill-header">
                <div className="icon-wrapper"><i className="fa-solid fa-code"></i></div>
                <h3>Socle Technique (Dev)</h3>
              </div>
              <ul className="skill-list">
                {devSkills.map((skill, index) => (
                  <li key={index}>
                    <div className="skill-name">
                      <i className={`${getIconClass(skill.icon)} skill-icon`}></i>
                      {skill.name}
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: inView ? skill.progress : '0%',
                          transition: inView
                            ? `width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) ${index * 0.2}s`
                            : 'none'
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;