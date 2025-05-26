import { setGallery } from "./setGallery";
import { openGallery } from "./openGallery";
import { closeGallery } from "./closeGallery";

export function setGalleries() {
  const galleries = document.querySelectorAll(".project-gallery_wrapper");

  galleries.forEach((gallery) => {
    // Check if the gallery has already been set
    if (gallery.classList.contains("project-gallery_set")) {
      return;
    }
    // Mark the gallery as set to prevent re-initialization
    gallery.classList.add("project-gallery_set");
    // Set the gallery items
    setGallery(gallery);

    // Set the gallery images
    const imgs = gallery.querySelectorAll(".project-gallery_item");
    const tl = gsap.timeline({ repeat: -1, paused: false });
    let isOpen = false;
    // Hide all images initially
    gsap.set(imgs, { opacity: 0 });
    gsap.set(imgs[1], { opacity: 1 });

    // Build timeline with instant transitions and 1s delay between steps
    for (let i = 1; i <= imgs.length; i++) {
      const prev = (i - 1) % imgs.length;
      const next = i % imgs.length;

      if (!imgs[prev].querySelector("video")) {
        tl.set(imgs[prev], { opacity: 0 }, `+=1`) // wait 1s
          .set(imgs[next], { opacity: 1 });
      }
    }

    // Pause/resume on hover
    gallery.addEventListener("mouseenter", () => { if (tl && !isOpen) tl.pause() });
    gallery.addEventListener("mouseleave", () => { if (tl && !isOpen) tl.play() });

    // set the gallery button to open the gallery
    const button = gallery.querySelector(".project-gallery_btn");
    const id = gallery.dataset.id;
    const close = document.querySelector(
      `.project-gallery_controls[data-id="${id}"] .project-gallery_close`
    );

    if (gallery) {
      gallery.addEventListener("click", () => {
        openGallery(gallery, () => {
          gsap.set(imgs, { opacity: 0, zIndex: -1 });
          gsap.set(imgs[0], { opacity: 1, zIndex: 1 });
          if (imgs[0].querySelector("video")) {
            const video = imgs[0].querySelector("video");
            video.setAttribute("preload", "metadata");
            video.play();
          }
          isOpen = true;
          tl.pause();
          tl.progress(0);
        });
      });
    }

    if (close) {
      close.addEventListener("click", () => {
        closeGallery(gallery, () => {
          isOpen = false;
          gsap.set(imgs, { opacity: 0, zIndex: -1 });
          gsap.set(imgs[1], { opacity: 1, zIndex: 1 });
          tl.progress(0);
          tl.play();
          if (imgs[0].querySelector("video")) {
            const video = imgs[0].querySelector("video");
            video.pause();
            video.currentTime = 0;
          }
        });
      });
    }
  });
}