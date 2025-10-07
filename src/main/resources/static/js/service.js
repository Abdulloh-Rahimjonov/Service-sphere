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

// Periodic service block animation (every 8 seconds, simultaneous)
function animateServiceBlocks() {
  const blocks = document.querySelectorAll('.service-block');
  blocks.forEach(block => {
    block.classList.add('pulse');
    setTimeout(() => block.classList.remove('pulse'), 800);
  });
}

// Run service block animation initially and every 8 seconds
animateServiceBlocks();
setInterval(animateServiceBlocks, 8000);

// Service block click handlers for interactivity
document.querySelectorAll('.service-block').forEach(block => {
  block.setAttribute('role', 'button');
  block.setAttribute('aria-label', block.querySelector('h2')?.textContent || 'Service section');

  // Click animation
  block.addEventListener('click', () => {
    block.style.transition = 'transform 0.1s ease';
    block.style.transform = 'scale(0.98)';
    setTimeout(() => {
      block.style.transform = 'scale(1)';
    }, 100);
  });

  // Keyboard accessibility
  block.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      block.click();
    }
  });
});