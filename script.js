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

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================================================
   IMAGE SLIDER
   Naim-2 → Naim-3 → Naim-4 → Naim-5
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slider =
    document.querySelector(".slider") ||
    document.querySelector(".gallery-slider");

  if (!slider) return;

  const track =
    slider.querySelector(".slides") ||
    slider.querySelector(".gallery-slides");

  const slides =
    slider.querySelectorAll(".slide").length
      ? slider.querySelectorAll(".slide")
      : slider.querySelectorAll(".gallery-slide");

  if (!track || slides.length === 0) return;

  const prev =
    slider.querySelector(".prev") ||
    slider.querySelector(".gallery-prev");

  const next =
    slider.querySelector(".next") ||
    slider.querySelector(".gallery-next");

  const dotsContainer =
    slider.querySelector(".slider-dots") ||
    slider.querySelector(".gallery-dots");

  let current = 0;

  /* -------------------------------------------------------
     Create dots
     ------------------------------------------------------- */

  let dots = [];

  if (dotsContainer) {

    dotsContainer.innerHTML = "";

    slides.forEach((_, index) => {

      const dot = document.createElement("button");

      dot.type = "button";

      dot.setAttribute(
        "aria-label",
        `Show image ${index + 1}`
      );

      dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoSlide();
      });

      dotsContainer.appendChild(dot);

      dots.push(dot);
    });
  }


  /* -------------------------------------------------------
     Change slide
     ------------------------------------------------------- */

  function goToSlide(index) {

    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    current = index;

    track.style.transform =
      `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === current
      );

    });
  }


  /* -------------------------------------------------------
     Previous
     ------------------------------------------------------- */

  if (prev) {

    prev.addEventListener("click", () => {

      goToSlide(current - 1);

      restartAutoSlide();

    });

  }


  /* -------------------------------------------------------
     Next
     ------------------------------------------------------- */

  if (next) {

    next.addEventListener("click", () => {

      goToSlide(current + 1);

      restartAutoSlide();

    });

  }


  /* -------------------------------------------------------
     Automatic slideshow
     
     7 seconds per image
     ------------------------------------------------------- */

  let autoSlide = setInterval(() => {

    goToSlide(current + 1);

  }, 7000);


  function restartAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(() => {

      goToSlide(current + 1);

    }, 7000);

  }


  /* -------------------------------------------------------
     Pause when mouse is over gallery
     ------------------------------------------------------- */

  slider.addEventListener("mouseenter", () => {

    clearInterval(autoSlide);

  });


  slider.addEventListener("mouseleave", () => {

    restartAutoSlide();

  });


  /* -------------------------------------------------------
     Touch/swipe support for phones
     ------------------------------------------------------- */

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

      const distance =
        touchEndX - touchStartX;

      if (Math.abs(distance) < 50) return;

      if (distance < 0) {

        goToSlide(current + 1);

      } else {

        goToSlide(current - 1);

      }

      restartAutoSlide();

    },
    { passive: true }
  );


  /* -------------------------------------------------------
     Start at first image
     ------------------------------------------------------- */

  goToSlide(0);

});


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
