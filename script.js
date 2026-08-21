/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const toggle =
  document.querySelector(".menu-toggle");

const links =
  document.querySelector(".nav-links");


if (toggle && links) {

  toggle.addEventListener("click", () => {

    const isOpen =
      links.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

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
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
  document.querySelector(".theme-toggle");


const savedTheme =
  localStorage.getItem("naim-theme");


if (savedTheme === "dark") {

  document.body.classList.add(
    "dark-mode"
  );

}


function updateThemeButton() {

  if (!themeToggle) return;


  const dark =
    document.body.classList.contains(
      "dark-mode"
    );


  themeToggle.textContent =
    dark ? "☀" : "◐";

  themeToggle.setAttribute(
    "aria-label",
    dark
      ? "Switch to light mode"
      : "Switch to dark mode"
  );

}


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      const dark =
        document.body.classList.toggle(
          "dark-mode"
        );


      localStorage.setItem(
        "naim-theme",
        dark ? "dark" : "light"
      );


      updateThemeButton();

    }
  );

}


updateThemeButton();


/* =========================================================
   PORTFOLIO SLIDER
   NAIM-2 → NAIM-5
========================================================= */

const slides =
  document.querySelectorAll(
    ".portfolio-slide"
  );


const dots =
  document.querySelectorAll(
    ".slider-dot"
  );


const previousButton =
  document.querySelector(
    ".slider-prev"
  );


const nextButton =
  document.querySelector(
    ".slider-next"
  );


const counter =
  document.querySelector(
    ".slider-counter"
  );


const slider =
  document.querySelector(
    ".portfolio-slider"
  );


let currentSlide = 0;


/*
   8 seconds per image.
   Change 8000 to 10000 if you want
   10 seconds per image.
*/

const SLIDE_TIME = 8000;

let sliderTimer;


/* =========================================================
   SHOW SLIDE
========================================================= */

function showSlide(index) {

  if (!slides.length) {
    return;
  }


  if (index >= slides.length) {

    currentSlide = 0;

  }

  else if (index < 0) {

    currentSlide =
      slides.length - 1;

  }

  else {

    currentSlide = index;

  }


  slides.forEach(
    (slide, index) => {

      slide.classList.toggle(
        "active",
        index === currentSlide
      );

    }
  );


  dots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === currentSlide
      );

    }
  );


  if (counter) {

    const number =
      String(currentSlide + 1)
        .padStart(2, "0");


    const total =
      String(slides.length)
        .padStart(2, "0");


    counter.textContent =
      `${number} / ${total}`;

  }

}


/* =========================================================
   NEXT / PREVIOUS
========================================================= */

function nextSlide() {

  showSlide(
    currentSlide + 1
  );

}


function previousSlide() {

  showSlide(
    currentSlide - 1
  );

}


/* =========================================================
   START AUTOMATIC SLIDER
========================================================= */

function startSlider() {

  clearInterval(
    sliderTimer
  );


  if (!slides.length) {
    return;
  }


  sliderTimer =
    setInterval(
      nextSlide,
      SLIDE_TIME
    );

}


/* =========================================================
   RESTART TIMER
========================================================= */

function restartSlider() {

  startSlider();

}


/* =========================================================
   NEXT BUTTON
========================================================= */

if (nextButton) {

  nextButton.addEventListener(
    "click",
    () => {

      nextSlide();

      restartSlider();

    }
  );

}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (previousButton) {

  previousButton.addEventListener(
    "click",
    () => {

      previousSlide();

      restartSlider();

    }
  );

}


/* =========================================================
   DOT BUTTONS
========================================================= */

dots.forEach(
  (dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showSlide(index);

        restartSlider();

      }
    );

  }
);


/* =========================================================
   PAUSE WHEN MOUSE IS OVER GALLERY
========================================================= */

if (slider) {

  slider.addEventListener(
    "mouseenter",
    () => {

      clearInterval(
        sliderTimer
      );

    }
  );


  slider.addEventListener(
    "mouseleave",
    () => {

      startSlider();

    }
  );


  slider.addEventListener(
    "touchstart",
    () => {

      clearInterval(
        sliderTimer
      );

    },
    {
      passive: true
    }
  );


  slider.addEventListener(
    "touchend",
    () => {

      startSlider();

    },
    {
      passive: true
    }
  );

}


/* =========================================================
   INITIALIZE SLIDER
========================================================= */

showSlide(0);

startSlider();


/* =========================================================
   CURRENT YEAR
========================================================= */

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}
