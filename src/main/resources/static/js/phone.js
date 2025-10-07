// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Create subtle particle effect for background
function createParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'absolute';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100%';
  particleContainer.style.height = '100%';
  particleContainer.style.zIndex = '-1';
  particleContainer.style.pointerEvents = 'none'; // Performance boost
  document.body.appendChild(particleContainer);

  const particleCount = window.innerWidth < 768 ? 10 : 20; // Reduced count for performance
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    Object.assign(particle.style, {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100 + 100}vh`, // Start below viewport
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      animationDuration: `${Math.random() * 20 + 10}s`, // Slower for less CPU
      animationDelay: `${Math.random() * 5}s`
    });
    particleContainer.appendChild(particle);
  }
}

// Create particles initially
createParticles();

// Recreate particles on resize with debounce
window.addEventListener('resize', debounce(() => {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(p => p.remove());
  createParticles();
}, 300));

// Periodic button animation (every 8 seconds, simultaneous)
function animateButtons() {
  const buttons = document.querySelectorAll('.link-btn');
  buttons.forEach(btn => {
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 800);
  });
}

// Run button animation initially and every 8 seconds
animateButtons();
setInterval(animateButtons, 8000);

// Button click handlers
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.setAttribute('role', 'button');
  btn.setAttribute('aria-label', btn.querySelector('.title')?.textContent || 'Call phone number');

  // Click animation
  btn.addEventListener('click', (e) => {
    // Scale animation
    btn.style.transition = 'transform 0.1s ease';
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 100);
  });

  // Keyboard accessibility
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});