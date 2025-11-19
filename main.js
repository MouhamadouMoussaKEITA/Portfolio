const sections = document.querySelectorAll("section");

function showSectionsOnScroll() {
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - 100) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showSectionsOnScroll);
window.addEventListener("load", showSectionsOnScroll);

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (name && email && message) {
      // In a real application, you would send this data to a server.
      // For this demo, we'll just show an alert.
      alert(`Merci pour votre message, ${name} ! Je vous répondrai bientôt.`);
      contactForm.reset();
    } else {
      alert("Veuillez remplir tous les champs du formulaire.");
    }
  });
}
