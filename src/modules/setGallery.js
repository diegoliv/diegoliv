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

  closeBtn.addEventListener("click", () => {
    // reset the current index to 0
    current = 0;
    numbers.innerHTML = `${current + 1} / ${total}`;
  });
}
