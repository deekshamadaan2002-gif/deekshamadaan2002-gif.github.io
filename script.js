// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      window.history.pushState(null, null, href);
    } else {
      console.warn(`Target section ${href} not found`);
    }
  });
});

// Highlight active nav link on scroll and update navbar style
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');
  let currentSection = '';

  // Update navbar background on scroll
  if (window.pageYOffset > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.clientHeight;
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
      currentSection = section.getAttribute('id');
    } else if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
      currentSection = sections[sections.length - 1].getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollPosition = window.pageYOffset;
  hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Enhanced pop-out effect for sections, images, and cards
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('hero-img')) {
          entry.target.querySelector('img').classList.add('pop-out');
        } else if (entry.target.classList.contains('exp-card') || entry.target.classList.contains('project-card')) {
          entry.target.classList.add('pop-out');
        }
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('section, .hero-img, .exp-card, .project-card').forEach((element) => {
  element.classList.add('fade-in');
  observer.observe(element);
});