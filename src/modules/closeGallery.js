export function closeGallery(gallery, callback) {
  // Check if the gallery is already closed
  if (!gallery.classList.contains("is-open")) {
    return;
  }

  const id = gallery.dataset.id;
  const controls = document.querySelector(
    `.project-gallery_controls[data-id="${id}"]`
  );

  gsap.to(controls, {
    duration: 1,
    y: "5.5rem",
    ease: "expo.out",
    delay: 0.3,
    onComplete: () => {
      lenis.start();
      gsap.to(".page_indicators, .header", {
        duration: 0.5,
        autoAlpha: 1,
        ease: "expo.out",
      });
    },
  });

  // set all .page_left to width: 100vw using GSAP
  const pageLeft = document.querySelectorAll(".page_left");
  gsap.to(pageLeft, {
    duration: 1,
    delay: 0.3,
    width: "50vw",
    ease: "expo.inOut",
  });

  // set all .page_right to width: 0vw using GSAP
  const pageRight = document.querySelectorAll(".page_right");
  gsap.to(pageRight, {
    duration: 1,
    delay: 0.3,
    width: "calc(50vw - 12px)",
    ease: "expo.inOut",
  });

  gallery.classList.remove("is-open");
  gsap.to(gallery, {
    duration: 1,
    width: "30vw",
    ease: "expo.inOut",
    onComplete: () => {
      gsap.to(gallery.querySelector(".project-gallery_btn"), {
        duration: 0.5,
        height: "2rem",
        ease: "expo.out",
      });    
      if (typeof callback === "function") {
        callback();
      }
    }
  });

}
