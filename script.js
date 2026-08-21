/* =========================================================
   MOBILE MENU
   ========================================================= */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {

  toggle.addEventListener("click", () => {

    const open = links.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

  });


  document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

      links.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================================
   DARK MODE
   ========================================================= */

const themeToggle =
  document.querySelector(".theme-toggle");

if (themeToggle) {

  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }


  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
      document.body.classList.contains("dark-mode");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

  });

}


/* =========================================================
   PORTFOLIO IMAGE SLIDER
   NAIM-2 → NAIM-5
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slider =
    document.querySelector(".portfolio-slider");

  if (!slider) return;


  const slides =
    slider.querySelectorAll(".portfolio-slide");

  const track =
    slider.querySelector(".portfolio-slides");

  const previousButton =
    slider.querySelector(".slider-prev");

  const nextButton =
    slider.querySelector(".slider-next");

  const dots =
    slider.querySelectorAll(".slider-dot");


  if (
    !track ||
    slides.length === 0
  ) {
    return;
  }


  let currentSlide = 0;

  let autoSlide;


  /* -------------------------------------------------------
     SHOW SLIDE
  ------------------------------------------------------- */

  function showSlide(index) {

    if (index < 0) {

      index = slides.length - 1;

    }


    if (index >= slides.length) {

      index = 0;

    }


    currentSlide = index;


    track.style.transform =
      `translateX(-${currentSlide * 100}%)`;


    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentSlide
      );

    });


    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlide
      );

    });

  }


  /* -------------------------------------------------------
     NEXT
  ------------------------------------------------------- */

  function nextSlide() {

    showSlide(
      currentSlide + 1
    );

  }


  /* -------------------------------------------------------
     PREVIOUS
  ------------------------------------------------------- */

  function previousSlide() {

    showSlide(
      currentSlide - 1
    );

  }


  /* -------------------------------------------------------
     BUTTONS
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     DOTS
  ------------------------------------------------------- */

  dots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showSlide(index);

        restartAutoSlide();

      }
    );

  });


  /* -------------------------------------------------------
     AUTOMATIC SLIDE
     
     8 SECONDS PER IMAGE
  ------------------------------------------------------- */

  function startAutoSlide() {

    autoSlide = setInterval(
      () => {

        nextSlide();

      },
      8000
    );

  }


  function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

  }


  /* -------------------------------------------------------
     PAUSE WHILE MOUSE IS OVER SLIDER
  ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     TOUCH / SWIPE
  ------------------------------------------------------- */

  let touchStartX = 0;

  let touchEndX = 0;


  slider.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

      clearInterval(autoSlide);

    },
    {
      passive: true
    }
  );


  slider.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;


      const distance =
        touchEndX - touchStartX;


      if (Math.abs(distance) > 50) {

        if (distance < 0) {

          nextSlide();

        } else {

          previousSlide();

        }

      }


      restartAutoSlide();

    },
    {
      passive: true
    }
  );


  /* -------------------------------------------------------
     INITIALIZE
  ------------------------------------------------------- */

  showSlide(0);

  startAutoSlide();

});


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}
