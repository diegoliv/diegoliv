export function setWorkScroll() {
  const workWrapper = document.getElementById("work");
  const numbersEl = document.querySelector(".indicator_el.numbers");
  const numbersWrapper = document.querySelector(".projects-indicator_wrapper");

  if (!workWrapper || !numbersEl || !numbersWrapper) {
    return;
  }

  gsap.set(numbersWrapper, { yPercent: -100 });

  gsap.to(numbersWrapper, {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: workWrapper,
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.set(numbersEl, { scale: 0 });
  gsap.timeline({
    scrollTrigger: {
      trigger: workWrapper,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.to(numbersEl, { scale: 1, duration: 0.5, ease: "expo.out" });
      },
      onLeave: () => {
        gsap.to(numbersEl, { scale: 0, duration: 0.5, ease: "expo.out" });
      },
      onEnterBack: () => {
        gsap.to(numbersEl, { scale: 1, duration: 0.5, ease: "expo.out" });
      },
      onLeaveBack: () => {
        gsap.to(numbersEl, { scale: 0, duration: 0.5, ease: "expo.out" });
      },
    },
  });
}
