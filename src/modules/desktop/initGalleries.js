import { setGallery } from "./galleries/setGallery";
import { openGallery } from "./galleries/openGallery";
import { closeGallery } from "./galleries/closeGallery";

export function initDesktopGalleries() {
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

    // logic to make the gallery card rotate on the 3d y axis when the mouse moves over it
    // get parent element of the gallery
    const parent = gallery.parentElement;

    const maxRot = 20;
    // const setRot = gsap.quickSetter(gallery, "rotationY", "deg");

    gsap.set(gallery, { transformOrigin: "center center" });

    let getPercent;

    function resize() {
      const parentRect = parent.getBoundingClientRect();
      const parentWidth = parentRect.width;
      parentStartX = parentRect.left;
      parentEndX = parentRect.right;
      getPercent = gsap.utils.mapRange(parentStartX, parentEndX, -1, 1);
    }    

    window.addEventListener("resize", resize);
    resize();

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
    gallery.addEventListener("mouseenter", () => {
      if (tl && !isOpen) tl.pause();
    });
    gallery.addEventListener("mouseleave", () => {
      if (tl && !isOpen) tl.play();
    });

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

          gsap.to(gallery, {
            duration: 0.5,
            rotationY: 0,
            ease: "expo.out",
          });          
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

    parent.addEventListener("mousemove", (e) => {
      if (isOpen) return;
      const percent = getPercent(e.pageX);
      gsap.to(gallery, {
        duration: 0.5,
        rotationY: percent * maxRot,
        ease: "expo.out",
      });
    });
    parent.addEventListener("mouseleave", () => {
      if (isOpen) return;
      gsap.to(gallery, {
        duration: 0.5,
        rotationY: 0,
        ease: "expo.out",
      });
    });    
  });
}