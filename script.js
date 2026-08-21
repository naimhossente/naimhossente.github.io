/* ========================================
   MOBILE NAVIGATION
   ======================================== */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    if (links) {
      links.classList.remove("open");
    }

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});


/* ========================================
   PHOTO SLIDER
   ======================================== */

const galleryTrack = document.querySelector(".gallery-track");
const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryNext = document.querySelector(".gallery-next");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryDots = document.querySelectorAll(".gallery-dot");
const galleryCurrent = document.getElementById("galleryCurrent");

let galleryIndex = 0;
let galleryTimer;


/* Show selected image */

function showGallerySlide(index) {

  if (!galleryTrack || gallerySlides.length === 0) {
    return;
  }

  /* Keep index inside range */

  if (index >= gallerySlides.length) {
    galleryIndex = 0;
  } else if (index < 0) {
    galleryIndex = gallerySlides.length - 1;
  } else {
    galleryIndex = index;
  }


  /* Move slider */

  galleryTrack.style.transform =
    `translateX(-${galleryIndex * 100}%)`;


  /* Update dots */

  galleryDots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === galleryIndex
    );

  });


  /* Update counter */

  if (galleryCurrent) {

    galleryCurrent.textContent =
      String(galleryIndex + 1).padStart(2, "0");

  }

}


/* Next image */

if (galleryNext) {

  galleryNext.addEventListener("click", () => {

    showGallerySlide(galleryIndex + 1);

    restartGalleryTimer();

  });

}


/* Previous image */

if (galleryPrev) {

  galleryPrev.addEventListener("click", () => {

    showGallerySlide(galleryIndex - 1);

    restartGalleryTimer();

  });

}


/* Dot navigation */

galleryDots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    showGallerySlide(index);

    restartGalleryTimer();

  });

});


/* ========================================
   AUTOMATIC SLIDESHOW
   ======================================== */

function startGalleryTimer() {

  galleryTimer = setInterval(() => {

    showGallerySlide(galleryIndex + 1);

  }, 5000);

}


function restartGalleryTimer() {

  clearInterval(galleryTimer);

  startGalleryTimer();

}


/* Start slider */

if (gallerySlides.length > 1) {

  showGallerySlide(0);

  startGalleryTimer();

}


/* ========================================
   SWIPE SUPPORT FOR MOBILE
   ======================================== */

let touchStartX = 0;
let touchEndX = 0;

if (galleryTrack) {

  galleryTrack.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  galleryTrack.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      handleGallerySwipe();

    },
    { passive: true }
  );

}


function handleGallerySwipe() {

  const swipeDistance =
    touchEndX - touchStartX;


  /* Swipe left = next */

  if (swipeDistance < -50) {

    showGallerySlide(galleryIndex + 1);

    restartGalleryTimer();

  }


  /* Swipe right = previous */

  if (swipeDistance > 50) {

    showGallerySlide(galleryIndex - 1);

    restartGalleryTimer();

  }

}


/* ========================================
   CURRENT YEAR
   ======================================== */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
