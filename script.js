/* =========================================================
   MD. NAIM HOSSEN PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

    menuToggle.textContent =
      isOpen ? "×" : "☰";
  });


  document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "☰";
      });

    });

}


/* =========================================================
   DARK MODE
   ========================================================= */

const themeToggle =
  document.getElementById("themeToggle");

const themeIcon =
  document.getElementById("themeIcon");


/*
   Load saved theme.
   If the visitor previously selected dark mode,
   keep dark mode after refreshing.
*/

const savedTheme =
  localStorage.getItem("naim-theme");


if (savedTheme === "dark") {

  document.body.classList.add("dark");

  if (themeIcon) {
    themeIcon.textContent = "☀";
  }

}


/* Toggle */

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");


    localStorage.setItem(
      "naim-theme",
      isDark ? "dark" : "light"
    );


    if (themeIcon) {

      themeIcon.textContent =
        isDark ? "☀" : "☾";

    }

  });

}


/* =========================================================
   IMAGE SLIDER
   ========================================================= */


/*
   IMAGE SLIDER SETTINGS

   Change this number if you want the images
   to stay longer.

   7000 = 7 seconds
   8000 = 8 seconds
   10000 = 10 seconds

   I have set it to 7 seconds.
*/

const SLIDE_TIME = 7000;


const slides =
  document.querySelectorAll(".slide");

const slider =
  document.getElementById("imageSlider");

const nextButton =
  document.getElementById("nextSlide");

const prevButton =
  document.getElementById("prevSlide");

const dotsContainer =
  document.getElementById("sliderDots");

const currentSlideText =
  document.getElementById("currentSlide");

const totalSlidesText =
  document.getElementById("totalSlides");


let currentIndex = 0;

let slideTimer;


/* =========================================================
   CREATE DOTS
   ========================================================= */

if (slides.length > 0 && dotsContainer) {

  slides.forEach((slide, index) => {

    const dot =
      document.createElement("button");

    dot.className = "slider-dot";

    dot.setAttribute(
      "aria-label",
      `Go to image ${index + 1}`
    );


    dot.addEventListener("click", () => {

      showSlide(index);

      restartSlider();

    });


    dotsContainer.appendChild(dot);

  });

}


const dots =
  document.querySelectorAll(".slider-dot");


/* =========================================================
   SHOW SLIDE
   ========================================================= */

function showSlide(index) {

  if (slides.length === 0) {
    return;
  }


  /*
     Loop around automatically.
  */

  if (index >= slides.length) {

    index = 0;

  }

  if (index < 0) {

    index = slides.length - 1;

  }


  currentIndex = index;


  /* Remove active */

  slides.forEach(slide => {

    slide.classList.remove("active");

  });


  dots.forEach(dot => {

    dot.classList.remove("active");

  });


  /* Activate selected */

  slides[currentIndex]
    .classList.add("active");


  if (dots[currentIndex]) {

    dots[currentIndex]
      .classList.add("active");

  }


  /* Counter */

  if (currentSlideText) {

    currentSlideText.textContent =
      String(currentIndex + 1)
        .padStart(2, "0");

  }


  if (totalSlidesText) {

    totalSlidesText.textContent =
      String(slides.length)
        .padStart(2, "0");

  }

}


/* =========================================================
   NEXT
   ========================================================= */

function nextSlide() {

  showSlide(currentIndex + 1);

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function previousSlide() {

  showSlide(currentIndex - 1);

}


/* =========================================================
   BUTTON EVENTS
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


if (prevButton) {

  prevButton.addEventListener(
    "click",
    () => {

      previousSlide();

      restartSlider();

    }
  );

}


/* =========================================================
   AUTOMATIC SLIDER
   ========================================================= */

function startSlider() {

  /*
     7 seconds per image.
  */

  slideTimer =
    setInterval(
      nextSlide,
      SLIDE_TIME
    );

}


function stopSlider() {

  clearInterval(slideTimer);

}


function restartSlider() {

  stopSlider();

  startSlider();

}


/* =========================================================
   PAUSE WHEN MOUSE IS OVER IMAGE
   ========================================================= */

if (slider) {

  slider.addEventListener(
    "mouseenter",
    stopSlider
  );


  slider.addEventListener(
    "mouseleave",
    startSlider
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
    event => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  slider.addEventListener(
    "touchend",
    event => {

      touchEndX =
        event.changedTouches[0].screenX;


      handleSwipe();

    },
    { passive: true }
  );

}


function handleSwipe() {

  const distance =
    touchStartX - touchEndX;


  /*
     Swipe left = next
     Swipe right = previous
  */

  if (Math.abs(distance) < 50) {

    return;

  }


  if (distance > 0) {

    nextSlide();

  } else {

    previousSlide();

  }


  restartSlider();

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "ArrowRight"
    ) {

      nextSlide();

      restartSlider();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      previousSlide();

      restartSlider();

    }

  }
);


/* =========================================================
   INITIALIZE SLIDER
   ========================================================= */

if (slides.length > 0) {

  showSlide(0);

  startSlider();

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}
