// Uses GSAP's Flip plugin to flip the gallery
export function openGallery(gallery, callback) {
  // Check if the gallery is already open
  if (gallery.classList.contains("is-open")) {
    return;
  }

  lenis.stop();

  gsap.to(".page_indicators, .header", {
    duration: 0.5,
    autoAlpha: 0,
    ease: "expo.out",
    // onComplete: () => {
    // }
  });

  gsap.to(gallery.querySelector(".project-gallery_btn"), {
    duration: 0.5,
    height: "0rem",
    ease: "expo.out",
  });

  const id = gallery.dataset.id;
  const controls = document.querySelector(
    `.project-gallery_controls[data-id="${id}"]`
  );

  // set all .page_left to width: 0vw using GSAP
  const pageLeft = document.querySelectorAll(".page_left");
  gsap.to(pageLeft, {
    duration: 1,
    width: "0vw",
    ease: "expo.inOut",
  });

  // set all .page_right to width: 100vw using GSAP
  const pageRight = document.querySelectorAll(".page_right");
  gsap.to(pageRight, {
    duration: 1,
    width: "100vw",
    ease: "expo.inOut",
    onComplete: () => {
      //use Flip to animate the gallery opening
      // const galleryFlip = Flip.getState(gallery);
      if (controls) {
        gsap.to(controls, {
          duration: 1,
          y: "0rem",
          ease: "expo.out",
        });
      }

      // Flip.from(galleryFlip, {
      //   duration: 0.5,
      //   ease: "expo.out",
      //   nested: true,
      // });
    },
  });

  gsap.to(gallery, {
    width: "70vw",
    duration: 1,
    ease: "expo.inOut",
    delay: 0.3,
    onComplete: () => {
      gallery.classList.add("is-open");
    },
  });

  if (typeof callback === "function") {
    callback();
  }
}
