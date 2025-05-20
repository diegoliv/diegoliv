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
    gsap.set(imgs[0], { opacity: 1 });

    // Build timeline with instant transitions and 1s delay between steps
    for (let i = 1; i <= imgs.length; i++) {
      const prev = (i - 1) % imgs.length;
      const next = i % imgs.length;

      tl.set(imgs[prev], { opacity: 0 }, `+=1`) // wait 1s
        .set(imgs[next], { opacity: 1 });
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

    if (button) {
      button.addEventListener("click", () => {
        isOpen = true;
        tl.kill();
        openGallery(gallery);
      });
    }

    if (close) {
      close.addEventListener("click", () => {
        isOpen = false;
        closeGallery(gallery);
      });
    }
  });
}

function setGallery(gallery) {
  const data = gallery.querySelector(".w-json");
  const parsed = JSON.parse(data.textContent);

  if (!parsed) {
    return;
  }

  const id = gallery.dataset.id;
  const controls = document.querySelector(`.project-gallery_controls[data-id="${id}"]`);

  gsap.set(controls, { y: "5.5rem" });

  parsed.items.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("project-gallery_item");
    div.setAttribute("data-id", id);
    let img = document.createElement("img");
    img.src = el.url;
    img.classList.add("project-gallery_img");
    div.append(img);
    gallery.append(div);
  });

  const prevBtn = controls.querySelector(".prev");
  const nextBtn = controls.querySelector(".next");
  const numbers = controls.querySelector(".project-gallery_nav-numbers");
  const closeBtn = controls.querySelector(".project-gallery_close");

  let current = 0;
  const total = parsed.items.length;
  numbers.innerHTML = `${current + 1} / ${total}`;
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + total) % total;
    numbers.innerHTML = `${current + 1} / ${total}`;
    gsap.to(gallery.querySelectorAll(".project-gallery_item"), {
      duration: 0.5,
      opacity: 0,
      ease: "expo.inOut",
    });
    gsap.to(gallery.querySelectorAll(".project-gallery_item")[current], {
      duration: 0.5,
      opacity: 1,
      ease: "expo.inOut",
    });
  });
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % total;
    numbers.innerHTML = `${current + 1} / ${total}`;
    gsap.to(gallery.querySelectorAll(".project-gallery_item"), {
      duration: 0.5,
      opacity: 0,
      ease: "expo.inOut",
    });
    gsap.to(gallery.querySelectorAll(".project-gallery_item")[current], {
      duration: 0.5,
      opacity: 1,
      ease: "expo.inOut",
    });
  });

  // Close button functionality
  closeBtn.addEventListener("mouseover", () => {
    // scramble text inside close button using GSAP's ScrambleText plugin
    const originalText = closeBtn.textContent;
    gsap.to(closeBtn, {
      duration: 0.5,
      scrambleText: {
        text: originalText,
        chars: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        // speed: 0.1,
        // revealDelay: 0.5,
      },
    });

  });
  // nav buttons functionality
  controls.querySelectorAll(".project-gallery_nav").forEach((el) => {
    el.addEventListener("mouseover", () => {
      const rect = el.querySelectorAll("rect");
      gsap.set(rect, { opacity: 0 });
      gsap.to(rect, {
        duration: 0,
        opacity: 1,
        stagger: {
          each: 0.05,
          from: "random",
        },
      });
    });
  });
}

// Uses GSAP's Flip plugin to flip the gallery
function openGallery(gallery) {
  // Check if the gallery is already open
  if (gallery.classList.contains("is-open")) {
    return;
  }

  lenis.stop();

  gsap.to(".page_indicators, .header, .project-gallery_btn", {
    duration: 0.5,
    autoAlpha: 0,
    ease: "expo.out",
    // onComplete: () => {
    // }
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
    }
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
}

function closeGallery(gallery) {
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
      gsap.to(".page_indicators, .header, .project-gallery_btn", {
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
  });
}