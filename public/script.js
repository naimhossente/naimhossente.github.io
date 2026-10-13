/* =========================================
   MOBILE MENU
========================================= */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");

    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}


/* =========================================
   DARK MODE
========================================= */

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeButton();
  });
}

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-mode");

  if (themeToggle) {
    themeToggle.textContent = isDark ? "☀" : "◐";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}


/* =========================================
   PROFESSIONAL IMAGE SLIDER
   NAIM-2 → NAIM-5
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".portfolio-slider");

  if (!slider) return;

  const slides = Array.from(
    slider.querySelectorAll(".portfolio-slide")
  );

  const dots = Array.from(
    slider.querySelectorAll(".slider-dot")
  );

  const previousButton = slider.querySelector(".slider-prev");
  const nextButton = slider.querySelector(".slider-next");
  const counter = slider.querySelector(".slider-counter");

  if (!slides.length) return;

  let currentSlide = 0;
  let autoSlide;


/* -----------------------------------------
   SHOW SLIDE
----------------------------------------- */

  function showSlide(index) {

    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    currentSlide = index;


    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentSlide
      );

      slide.setAttribute(
        "aria-hidden",
        i === currentSlide ? "false" : "true"
      );

    });


    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlide
      );

      dot.setAttribute(
        "aria-current",
        i === currentSlide ? "true" : "false"
      );

    });


    if (counter) {

      counter.textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");

    }

  }


/* -----------------------------------------
   NEXT
----------------------------------------- */

  function nextSlide() {
    showSlide(currentSlide + 1);
  }


/* -----------------------------------------
   PREVIOUS
----------------------------------------- */

  function previousSlide() {
    showSlide(currentSlide - 1);
  }


/* -----------------------------------------
   BUTTONS
----------------------------------------- */

  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        nextSlide();

        restartAutoSlide();

      }
    );

  }


  if (previousButton) {

    previousButton.addEventListener(
      "click",
      () => {

        previousSlide();

        restartAutoSlide();

      }
    );

  }


/* -----------------------------------------
   DOTS
----------------------------------------- */

  dots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showSlide(index);

        restartAutoSlide();

      }
    );

  });


/* -----------------------------------------
   AUTOMATIC SLIDE
   7 SECONDS PER IMAGE
----------------------------------------- */

  function startAutoSlide() {

    autoSlide = setInterval(
      () => {

        nextSlide();

      },
      7000
    );

  }


  function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

  }


/* -----------------------------------------
   PAUSE WHEN MOUSE IS OVER SLIDER
----------------------------------------- */

  slider.addEventListener(
    "mouseenter",
    () => {

      clearInterval(autoSlide);

    }
  );


  slider.addEventListener(
    "mouseleave",
    () => {

      startAutoSlide();

    }
  );


/* -----------------------------------------
   TOUCH / SWIPE SUPPORT
----------------------------------------- */

  let touchStartX = 0;
  let touchEndX = 0;


  slider.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  slider.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      handleSwipe();

    },
    { passive: true }
  );


  function handleSwipe() {

    const distance =
      touchStartX - touchEndX;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {

      nextSlide();

    } else {

      previousSlide();

    }

    restartAutoSlide();

  }


/* -----------------------------------------
   KEYBOARD SUPPORT
----------------------------------------- */

  slider.setAttribute("tabindex", "0");


  slider.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "ArrowRight") {

        nextSlide();

        restartAutoSlide();

      }

      if (event.key === "ArrowLeft") {

        previousSlide();

        restartAutoSlide();

      }

    }
  );


/* -----------------------------------------
   INITIAL SLIDE
----------------------------------------- */

  showSlide(0);

  startAutoSlide();

});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
