export function setAvailability() {
  const wrapper = document.querySelector(".availability_wrapper");
  const beacon = wrapper.querySelector(".beacon-inner");
  const lines = wrapper.querySelectorAll(".availability_lines");

  const beaconTl = gsap.timeline({ repeat: -1 });
  beaconTl.set(beacon, {
    scale: 0,
    opacity: 1,
  });

  beaconTl.to(beacon, {
    scale: 2,
    opacity: 0,
    duration: 2,
    ease: "expo.out",
  });

  wrapper.addEventListener("mouseenter", () => {
    gsap.to(lines, {
      duration: 0.5,
      yPercent: -100,
      ease: "expo.out",
    });
  });

  wrapper.addEventListener("mouseleave", () => {
    gsap.to(lines, {
      duration: 0.5,
      yPercent: 0,
      ease: "expo.out",
    });
  });
}
