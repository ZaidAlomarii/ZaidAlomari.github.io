/* ============================================
   ZAID ALOMARI — PORTFOLIO SCRIPTS
   ============================================ */

// ---------- SCROLL REVEAL ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ---------- MOBILE NAV TOGGLE ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });
}

// ---------- ACTIVE NAV LINK ON SCROLL ----------
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--light)'
            : 'var(--muted)';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));

// ---------- SKILL BAR ANIMATION ----------
// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // width is already set via inline style; the CSS transition handles animation
        bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => {
  const targetWidth = bar.style.width;
  bar.style.width = '0%'; // start at 0
  barObserver.observe(bar);
  // Restore target after a tick so the transition fires
  requestAnimationFrame(() => {
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 200);
  });
});

// ---------- SMOOTH ANCHOR SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
