// Eggy Car Unblocked - Optimized JavaScript
class EggyCarApp {
  constructor() {
    this.navbar = null;
    this.mobileMenuToggle = null;
    this.gameFrame = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.bindElements();
    this.setupEventListeners();
    this.setupMobileMenu();
    this.setupGameOptimization();
  }

  bindElements() {
    this.navbar = document.getElementById('navbar');
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.gameFrame = document.getElementById('game-frame');
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleSmoothScroll(e));
    });

    // ESC key closes mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on window resize (passive for better performance)
    window.addEventListener('resize', this.debounce(() => this.handleResize(), 250), { passive: true });
  }

  setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!this.mobileMenuToggle || !navLinks) return;

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  setupGameOptimization() {
    if (!this.gameFrame) return;

    // Lazy load game frame
    const gameSection = document.getElementById('game');
    if (gameSection) {
      const gameObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ensureGameLoaded();
            gameObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      gameObserver.observe(gameSection);
    }

    // Handle game frame load events
    this.gameFrame.addEventListener('load', () => {
      this.gameFrame.classList.add('loaded');
    });

    // Error handling for game frame
    this.gameFrame.addEventListener('error', () => {
      this.showGameError();
    });

    // Optimize iframe for performance
    this.gameFrame.setAttribute('loading', 'lazy');
  }

  toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const isOpen = navLinks.classList.contains('mobile-open');
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      navLinks.classList.add('mobile-open');
      this.mobileMenuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.remove('mobile-open');
      this.mobileMenuToggle?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  ensureGameLoaded() {
    if (this.gameFrame && !this.gameFrame.src.includes('coolmathgames')) {
      const currentSrc = this.gameFrame.src;
      this.gameFrame.src = currentSrc;
    }
  }

  showGameError() {
    const gameWrapper = this.gameFrame?.parentElement;
    if (gameWrapper) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'game-error';
      errorDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">😕</div>
          <h3>Oyun yüklenemedi</h3>
          <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
          <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Tekrar Dene</button>
        </div>
      `;
      gameWrapper.appendChild(errorDiv);
    }
  }

  handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Global functions for HTML onclick handlers
function scrollToGame() {
  const gameSection = document.getElementById('game');
  if (gameSection) {
    gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToFeatures() {
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize the app
const app = new EggyCarApp();