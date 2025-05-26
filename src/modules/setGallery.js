export function setGallery(gallery) {
  const data = gallery.querySelector(".w-json");
  const parsed = JSON.parse(data.textContent);

  if (!parsed) {
    return;
  }

  const id = gallery.dataset.id;
  const controls = document.querySelector(
    `.project-gallery_controls[data-id="${id}"]`
  );
  const inner = gallery.querySelector(".project-gallery_inner");

  gsap.set(controls, { y: "5.5rem" });

  parsed.items.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("project-gallery_item");
    div.setAttribute("data-id", id);
    let img = document.createElement("img");
    img.src = el.url;
    img.classList.add("project-gallery_img");
    div.append(img);
    inner.append(div);
  });

  const prevBtn = controls.querySelector(".prev");
  const nextBtn = controls.querySelector(".next");
  const numbers = controls.querySelector(".project-gallery_nav-numbers");
  const closeBtn = controls.querySelector(".project-gallery_close");

  let current = 0;
  let previous = 0;
  const total = parsed.items.length;
  numbers.innerHTML = `${current + 1} / ${total}`;

  function goToSlide(index) {
    current = index;
    numbers.innerHTML = `${current + 1} / ${total}`;
    const currentItem = gallery.querySelectorAll(".project-gallery_item")[current];
    const previousItem = gallery.querySelectorAll(".project-gallery_item")[previous];

    gsap.to(previousItem, {
      duration: 0.5,
      opacity: 0,
      zIndex: -1,
      ease: "expo.inOut",
    });
    gsap.to(currentItem, {
      duration: 0.5,
      opacity: 1,
      zIndex: 1,
      ease: "expo.inOut",
    });


    if (currentItem.querySelector("video")) {
      const video = currentItem.querySelector("video");
      video.play();
    }

    if (previousItem.querySelector("video")) {
      const video = previousItem.querySelector("video");
      video.pause();
      video.currentTime = 0;
    }
  }

  if (gallery.querySelector("video")) {
    const video = gallery.querySelector("video");
    video.addEventListener("ended", () => {
      goToSlide((current + 1) % total);
    });
  }

  prevBtn.addEventListener("click", () => {
    previous = current;
    current = (current - 1 + total) % total;
    goToSlide(current, previous);
  });
  nextBtn.addEventListener("click", () => {
    previous = current;
    current = (current + 1) % total;
    goToSlide(current, previous);
  });

  closeBtn.addEventListener("click", () => {
    // reset the current index to 0
    current = 0;
    numbers.innerHTML = `${current + 1} / ${total}`;
  });
}
