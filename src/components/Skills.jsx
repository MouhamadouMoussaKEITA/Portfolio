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
    { name: "Jira, Trello", icon: "fa-jira" },
    { name: "MS Project", icon: "fa-tasks text-solid" },
    { name: "Scrum (Méthodologie Agile)", icon: "fa-rotate text-solid" },
    { name: "Analyse fonctionnelle", icon: "fa-magnifying-glass-chart text-solid" },
    { name: "Communication & Esprit d'équipe", icon: "fa-users text-solid" },
    { name: "Rigueur & Autonomie", icon: "fa-bullseye text-solid" }
  ];

  return (
    <section id="skills" className="skills section-padding bg-surface">
      <div className="container reveal-up" ref={containerRef}>
        <div className="section-header text-center mb-5">
          <span className="section-subtitle">Expertise Technique & Fonctionnelle</span>
          <h2 className="section-title">Mes <span className="text-gradient">Domaines</span></h2>
        </div>

        <div className="skills-grid">
          {/* Soft Skills & Gestion projet - Takes full width on large screens to anchor the top */}
          <div className="skill-box glass-card hover-glow" style={{ borderTop: '4px solid var(--accent-primary)', gridColumn: '1 / -1' }}>
            <div className="skill-header">
              <div className="icon-wrapper"><i className="fa-solid fa-list-check"></i></div>
              <h3>Gestion Projet & Management SI</h3>
            </div>
            <ul className="skill-list tool-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {projectSkills.map((tool, index) => (
                <li key={index} style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="icon-wrapper-small" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)' }}>
                    <i className={tool.icon.includes('text-solid') ? `fa-solid ${tool.icon.replace(' text-solid','')}` : `fa-brands ${tool.icon}`}></i>
                  </div>
                  <span style={{ fontWeight: '500' }}>{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="skill-layout-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', gridColumn: '1 / -1' }}>
             <div className="skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '0' }}>
               {/* Setup / Data / SI */}
               <div className="skill-box glass-card hover-glow">
                 <div className="skill-header">
                   <div className="icon-wrapper"><i className="fa-solid fa-database"></i></div>
                   <h3>Bases de données & Outils</h3>
                 </div>
                 <ul className="skill-list">
                   {dataToolsSkills.map((skill, index) => (
                     <li key={index}>
                       <div className="skill-name">
                         <i className={skill.icon.includes('text-solid') ? `fa-solid ${skill.icon.replace(' text-solid','')} skill-icon` : `fa-brands ${skill.icon} skill-icon`}></i> {skill.name}
                       </div>
                       <div className="progress-bar">
                         <div 
                           className="progress" 
                           style={{ 
                             width: inView ? skill.progress : '0%',
                             transition: inView ? `width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) ${index * 0.2}s` : 'none'
                           }}
                         ></div>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Développement Web & Frameworks */}
               <div className="skill-box glass-card hover-glow">
                 <div className="skill-header">
                   <div className="icon-wrapper"><i className="fa-solid fa-code"></i></div>
                   <h3>Socle Technique (Dev)</h3>
                 </div>
                 <ul className="skill-list">
                   {devSkills.map((skill, index) => (
                     <li key={index}>
                       <div className="skill-name">
                         <i className={skill.icon.includes('text-solid') ? `fa-solid ${skill.icon.replace(' text-solid','')} skill-icon` : `fa-brands ${skill.icon} skill-icon`}></i> {skill.name}
                       </div>
                       <div className="progress-bar">
                         <div 
                           className="progress" 
                           style={{ 
                             width: inView ? skill.progress : '0%',
                             transition: inView ? `width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) ${index * 0.2}s` : 'none'
                           }}
                         ></div>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
