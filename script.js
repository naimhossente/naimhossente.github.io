/* =========================================================
   MOBILE MENU
========================================================= */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {

  toggle.addEventListener("click", () => {

    const open =
      links.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      open
    );

    toggle.textContent =
      open ? "✕" : "☰";

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

        toggle.textContent = "☰";

      });

    });

}



/* =========================================================
   YEAR
========================================================= */

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}



/* =========================================================
   PROFESSIONAL IMAGE SLIDER
=========================================================

   Gallery images:

   1. naim-2.png
   2. naim-3.png
   3. naim-4.png
   4. naim-5.png

   naim-1.png is NOT part of this slider.

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

const currentSlide =
  document.getElementById(
    "current-slide"
  );

const totalSlides =
  document.getElementById(
    "total-slides"
  );


let currentIndex = 0;


/*
  Change this number if you want
  the images to stay longer.

  7000 = 7 seconds
  8000 = 8 seconds
  10000 = 10 seconds
*/

const slideDuration = 8000;

let sliderTimer;



function showSlide(index) {

  if (!slides.length) {
    return;
  }


  /*
    Keep index inside the
    available slide range.
  */

  if (index >= slides.length) {

    currentIndex = 0;

  } else if (index < 0) {

    currentIndex =
      slides.length - 1;

  } else {

    currentIndex = index;

  }



  /* Hide all slides */

  slides.forEach((slide) => {

    slide.classList.remove("active");

  });



  /* Activate selected slide */

  slides[currentIndex]
    .classList.add("active");



  /* Update dots */

  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentIndex
    );

  });



  /* Update counter */

  if (currentSlide) {

    currentSlide.textContent =
      String(currentIndex + 1)
        .padStart(2, "0");

  }



  if (totalSlides) {

    totalSlides.textContent =
      String(slides.length)
        .padStart(2, "0");

  }

}



/* =========================================================
   NEXT
========================================================= */

function nextSlide() {

  showSlide(
    currentIndex + 1
  );

  restartSlider();

}



/* =========================================================
   PREVIOUS
========================================================= */

function previousSlide() {

  showSlide(
    currentIndex - 1
  );

  restartSlider();

}



/* =========================================================
   BUTTON EVENTS
========================================================= */

if (nextButton) {

  nextButton.addEventListener(
    "click",
    nextSlide
  );

}


if (previousButton) {

  previousButton.addEventListener(
    "click",
    previousSlide
  );

}



/* =========================================================
   DOT EVENTS
========================================================= */

dots.forEach((dot, index) => {

  dot.addEventListener(
    "click",
    () => {

      showSlide(index);

      restartSlider();

    }
  );

});



/* =========================================================
   AUTO SLIDER
========================================================= */

function startSlider() {

  if (slides.length <= 1) {
    return;
  }


  sliderTimer =
    setInterval(() => {

      showSlide(
        currentIndex + 1
      );

    }, slideDuration);

}



function restartSlider() {

  clearInterval(sliderTimer);

  startSlider();

}



/* =========================================================
   PAUSE WHEN MOUSE IS OVER SLIDER
========================================================= */

const slider =
  document.querySelector(
    ".portfolio-slider"
  );


if (slider) {

  slider.addEventListener(
    "mouseenter",
    () => {

      clearInterval(sliderTimer);

    }
  );


  slider.addEventListener(
    "mouseleave",
    () => {

      startSlider();

    }
  );

}



/* =========================================================
   TOUCH / SWIPE SUPPORT
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


if (slider) {


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

}


function handleSwipe() {

  const difference =
    touchStartX - touchEndX;


  /*
    Ignore very small movements.
  */

  if (Math.abs(difference) < 50) {
    return;
  }


  if (difference > 0) {

    nextSlide();

  } else {

    previousSlide();

  }

}



/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /*
      Don't interfere with typing
      inside form fields.
    */

    const tag =
      document.activeElement?.tagName;

    if (
      tag === "INPUT" ||
      tag === "TEXTAREA"
    ) {

      return;

    }


    if (event.key === "ArrowRight") {

      nextSlide();

    }


    if (event.key === "ArrowLeft") {

      previousSlide();

    }

  }
);



/* =========================================================
   START SLIDER
========================================================= */

showSlide(0);

startSlider();
