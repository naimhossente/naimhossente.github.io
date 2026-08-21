/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {

  toggle.addEventListener("click", () => {

    const open = links.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(open)
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
   PORTFOLIO IMAGE SLIDER
   Naim-2 → Naim-5
========================================================= */

const slides = document.querySelectorAll(".portfolio-slide");
const dots = document.querySelectorAll(".slider-dot");

const previousButton =
  document.querySelector(".slider-prev");

const nextButton =
  document.querySelector(".slider-next");

let currentSlide = 0;

let sliderTimer;


/* Show selected slide */

function showSlide(index) {

  if (!slides.length) return;


  if (index >= slides.length) {
    currentSlide = 0;
  }

  else if (index < 0) {
    currentSlide = slides.length - 1;
  }

  else {
    currentSlide = index;
  }


  slides.forEach((slide, index) => {

    slide.classList.toggle(
      "active",
      index === currentSlide
    );

  });


  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentSlide
    );

  });

}


/* Next image */

function nextSlide() {

  showSlide(currentSlide + 1);

}


/* Previous image */

function previousSlide() {

  showSlide(currentSlide - 1);

}


/* =========================================================
   BUTTONS
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
   DOT NAVIGATION
========================================================= */

dots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    showSlide(index);

    restartSlider();

  });

});


/* =========================================================
   AUTOMATIC SLIDER
   7 SECONDS PER IMAGE
========================================================= */

function startSlider() {

  clearInterval(sliderTimer);

  sliderTimer = setInterval(
    nextSlide,
    7000
  );

}


function restartSlider() {

  startSlider();

}


/* =========================================================
   PAUSE SLIDER WHEN USER IS LOOKING AT IT
========================================================= */

const slider =
  document.querySelector(".portfolio-slider");


if (slider) {

  slider.addEventListener(
    "mouseenter",
    () => clearInterval(sliderTimer)
  );


  slider.addEventListener(
    "mouseleave",
    () => startSlider()
  );


  slider.addEventListener(
    "touchstart",
    () => clearInterval(sliderTimer),
    { passive: true }
  );


  slider.addEventListener(
    "touchend",
    () => startSlider(),
    { passive: true }
  );

}


/* Start */

showSlide(0);

startSlider();


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
