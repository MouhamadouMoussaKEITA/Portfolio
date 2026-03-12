import React, { useEffect, useRef, useState } from 'react';

const Contact = () => {
  const revealRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "84c9e3ff-1493-4c9f-80f8-ea8d11d51d4c", 
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });

        const json = await response.json();

        if (response.status === 200) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSubmitStatus('error');
          console.error(json);
        }
      } catch (error) {
        setSubmitStatus('error');
        console.error("Error submitting form", error);
      } finally {
        setIsSubmitting(false);
        // Hide success/error message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } else {
      alert("Veuillez remplir tous les champs obligatoires du formulaire.");
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container reveal-up" ref={revealRef}>
        <div className="contact-wrapper glass-card">
          <div className="contact-info">
            <span className="section-subtitle text-start">Restons en contact</span>
            <h2 className="section-title text-start mb-4">Un projet en tête ? <br/><span className="text-gradient">Discutons-en.</span></h2>
            <p className="text-muted mb-4">
              Je suis actuellement à la recherche d'une opportunité d'alternance. N'hésitez pas à me contacter pour échanger sur vos besoins ou opportunités.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="icon-box"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h4 className="contact-label">Email</h4>
                  <a href="mailto:Mouhakeita23@gmail.com" className="contact-link">Mouhakeita23@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <h4 className="contact-label">Téléphone</h4>
                  <a href="tel:+33758102907" className="contact-link text-muted">+33 7 58 10 29 07</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h4 className="contact-label">Localisation</h4>
                  <span className="contact-link text-muted">64100, Bayonne</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form id="contactForm" className="contact-form" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="sr-only">Votre Nom</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="Votre nom complet *" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Votre Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Adresse email *" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="sr-only">Sujet</label>
                <input type="text" id="subject" name="subject" className="form-control" placeholder="Sujet de votre message" value={formData.subject} onChange={handleChange} disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="sr-only">Votre Message</label>
                <textarea id="message" name="message" className="form-control" placeholder="Comment puis-je vous aider ? *" rows="5" value={formData.message} onChange={handleChange} required disabled={isSubmitting}></textarea>
              </div>
              
              {submitStatus === 'success' && (
                <div className="alert alert-success" style={{ color: '#10b981', marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <i className="fa-solid fa-circle-check me-2"></i> Message envoyé avec succès !
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="alert alert-danger" style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <i className="fa-solid fa-circle-exclamation me-2"></i> Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block p-relative overflow-hidden group" disabled={isSubmitting}>
                <span className="button-text">
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'} 
                  {!isSubmitting && <i className="fa-regular fa-paper-plane ms-2"></i>}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
