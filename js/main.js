document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     YEAR UPDATE
  ========================= */
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================
     HERO SWIPER
  ========================= */
  if (document.querySelector(".heroSwiper")) {
    new Swiper(".heroSwiper", {
      loop: true,
      speed: 1200,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  /* =========================
     DARK / LIGHT THEME
  ========================= */
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const body = document.body;

  if (toggle && icon) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }

    toggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");

      if (body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* =========================
     REVEAL ON SCROLL
  ========================= */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length > 0) {
    window.addEventListener("scroll", () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
          el.classList.add("active");
        }
      });
    });

    // Trigger once on load in case some are already visible
    window.dispatchEvent(new Event("scroll"));
  }

  /* =========================
     TESTIMONIAL SLIDER
  ========================= */
  if (document.querySelector(".testimonialSwiper")) {
    new Swiper(".testimonialSwiper", {
      loop: true,
      spaceBetween: 30,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  /* =========================
     FOUNDER SECTION ANIMATION
  ========================= */
  const founderSection = document.querySelector(".founder-section");

  if (founderSection) {
    const founderObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("founder-visible");
            founderObserver.unobserve(entry.target); // one-time animation
          }
        });
      },
      { threshold: 0.3 },
    );

    founderObserver.observe(founderSection);
  }

  /* =========================
     STATS COUNTER ANIMATION
  ========================= */
  const stats = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats-section");

  function startCounter() {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target")) || 0;
      let count = 0;
      const duration = 1800; // ms
      const increment = target / (duration / 16); // ~60fps

      function updateCounter() {
        count += increment;
        if (count < target) {
          stat.textContent = Math.floor(count);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      }

      updateCounter();
    });
  }

  if (stats.length > 0) {
    if (statsSection) {
      setTimeout(() => {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          startCounter();
          return;
        }

        const observer = new IntersectionObserver(
          (entries, obs) => {
            if (entries[0].isIntersecting) {
              startCounter();
              obs.disconnect();
            }
          },
          { threshold: 0.35 },
        );

        observer.observe(statsSection);
      }, 400);
    } else {
      // Fallback: if stats section is missing, just show final numbers
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target")) || 0;
        stat.textContent = target;
      });
    }
  }

  /* =========================
     GALLERY FILTER
  ========================= */
  const filterButtons = document.querySelectorAll(".gallery-filter button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const currentActive = document.querySelector(".gallery-filter .active");
        if (currentActive) {
          currentActive.classList.remove("active");
        }
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  /* =========================
   GALLERY LIGHTBOX (FIXED)
========================= */
  const galleryImages = document.querySelectorAll(".gallery-card img");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");

  if (galleryImages.length > 0 && lightbox && lightboxImg) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }

    // close on outside click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

  /* =========================
   FLOATING CONTACT BUTTON
========================= */
  const contactWidget = document.querySelector(".contact-widget");
  const contactToggle = document.getElementById("contactToggle");

  if (contactToggle && contactWidget) {
    contactToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // ✅ FIX
      contactWidget.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".contact-widget")) {
        contactWidget.classList.remove("active");
      }
    });
  }

  /* =========================
   GALLERY SWIPER
========================= */
  if (document.querySelector(".gallerySwiper")) {
    new Swiper(".gallerySwiper", {
      loop: true,
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1.2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
});
