// --- Intersection Observer for section animations ---
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  observer.observe(section);
});

// --- Typing Effect ---
const typingElement = document.querySelector(".typing-effect");
if (typingElement) {
  const text = "Étudiant en BUT Informatique";
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  // Clear existing text and start typing
  typingElement.textContent = "";
  type();
}


// --- Handle contact form submission ---
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
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

// --- Scroll-to-top button ---
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.classList.add("scroll-to-top");
document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// --- Header hide on scroll down, show on scroll up ---
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY && window.scrollY > 100) {
    header.style.top = "-150px"; // Hide header
  } else {
    header.style.top = "0"; // Show header
  }
  lastScrollY = window.scrollY;
});
