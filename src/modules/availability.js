export function setAvailability() {
  const beacon = document.querySelector(".availability_wrapper .beacon-inner");

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
}
