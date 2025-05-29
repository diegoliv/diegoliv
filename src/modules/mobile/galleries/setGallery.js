export function setGallery(gallery) {
  const video = gallery.querySelector("video");
  const swiperEl = gallery.querySelector(".swiper-wrapper");
  const slides = gallery.querySelectorAll(".swiper-slide");

  if (video) {
    // clone the first slide, and append the video to it
    const firstSlide = slides[0].cloneNode(true);
    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("video_wrapper");

    // replace content of the first slide with the video
    firstSlide.innerHTML = ""; // Clear existing content
    videoWrapper.appendChild(video);
    firstSlide.appendChild(videoWrapper);
    swiperEl.prepend(firstSlide);
    video.setAttribute("preload", "metadata");

    //initialize swiper
    const swiper = new Swiper(gallery.querySelector(".swiper"), {
      slidesPerView: "auto",
      spaceBetween: 24,
      // loop: true,
      speed: 500,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      // },
      // pagination: {
      //   el: gallery.querySelector(".swiper-pagination"),
      //   clickable: true,
      // },
      // navigation: {
      //   nextEl: gallery.querySelector(".swiper-button-next"),
      //   prevEl: gallery.querySelector(".swiper-button-prev"),
      // },
    });
  }
}