// Import Lucide icons library
import lucide from "lucide"

// Initialize Lucide icons and main functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Countdown timer functionality with digital clock animation
  let timeLeft = 72 // 72 hours (fixed)
  const countdownElement = document.getElementById("countdown")
  let animationCounter = 0

  function updateCountdown() {
    // Create digital clock animation effect
    const hours = Math.floor(timeLeft)
    const minutes = Math.floor((timeLeft % 1) * 60)
    const seconds = Math.floor(((timeLeft % 1) * 60 % 1) * 60)
    
    // Add flickering animation to simulate digital countdown
    animationCounter++
    const flicker = animationCounter % 3 === 0 ? '.' : ':';
    
    countdownElement.innerHTML = `残り <span class="time-digits">${hours.toString().padStart(2, '0')}${flicker}${minutes.toString().padStart(2, '0')}${flicker}${seconds.toString().padStart(2, '0')}</span> 時間`
    
    // Add subtle number change animation
    countdownElement.classList.add('countdown-update')
    setTimeout(() => {
      countdownElement.classList.remove('countdown-update')
    }, 200)
  }

  // Update countdown more frequently for animation effect
  setInterval(updateCountdown, 1000)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Button click handlers
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Handle CTA buttons
      if (this.classList.contains("btn-primary") || this.classList.contains("btn-cta")) {
        // Here you would typically redirect to a checkout page
        // For demo purposes, show an alert
        alert("注文ページに移動します（デモ版のため実際の注文はできません）")
      }
    })
  })

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".card, .feature-item, .benefit-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Add hover effects for cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
    })
  })

  // Track button clicks for analytics
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.trim()
      trackEvent("button_click", {
        button_text: buttonText,
        section: this.closest("section")?.className || "unknown",
      })
    })
  })

  // Add testimonial icon hover effects
  document.querySelectorAll(".testimonial-icon-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)"
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.25)"
    })

    wrapper.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
    })
  })

  // Add feature highlight animations
  document.querySelectorAll(".feature-highlight").forEach((highlight) => {
    highlight.style.animation = "pulse 2s infinite"
  })

  // Add CSS animation for pulse effect and countdown
  const style = document.createElement("style")
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out;
    }
    
    .time-digits {
      font-family: 'Courier New', monospace;
      font-weight: 700;
      color: #fbbf24;
      text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
    }
    
    .countdown-update {
      animation: digitFlicker 0.2s ease-in-out;
    }
  `
  document.head.appendChild(style)

  // Add fade-in animation to sections on scroll
  const sections = document.querySelectorAll("section")
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((section) => {
    sectionObserver.observe(section)
  })

  // Mobile menu functionality (if needed later)
  function toggleMobileMenu() {
    const mobileMenu = document.querySelector(".mobile-menu")
    if (mobileMenu) {
      mobileMenu.classList.toggle("active")
    }
  }

  // Cookie consent (placeholder)
  function initializeCookieConsent() {
    // Add cookie consent logic here if needed
    console.log("Cookie consent initialized")
  }

  // Initialize cookie consent after DOM load
  setTimeout(initializeCookieConsent, 2000)
})

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(price)
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
  // Here you would integrate with your analytics service
  console.log("Event tracked:", eventName, properties)
}

// Resize handler
window.addEventListener(
  "resize",
  debounce(() => {
    // Handle responsive adjustments if needed
    if (typeof lucide !== "undefined") {
      lucide.createIcons() // Reinitialize icons after resize
    }
  }, 250),
)

// Performance optimization
if ("loading" in HTMLImageElement.prototype) {
  // Browser supports lazy loading
  document.querySelectorAll("img").forEach((img) => {
    img.loading = "lazy"
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // You could send this to an error tracking service
})

// Add loading state management
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Initialize any additional features after page load
  initializeAdvancedFeatures()
})

function initializeAdvancedFeatures() {
  // Add parallax effect to hero section
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    window.addEventListener(
      "scroll",
      debounce(() => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        heroSection.style.transform = `translateY(${rate}px)`
      }, 10),
    )
  }

  // Add typing effect to hero title (optional)
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    // You can add a typing animation here if desired
  }

  // Initialize form validation if forms are added later
  initializeFormValidation()
}

function initializeFormValidation() {
  // Placeholder for form validation logic
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      // Add form validation logic here
      console.log("Form submitted:", form)
    })
  })
}
