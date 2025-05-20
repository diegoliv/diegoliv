export function setAboutMarquee() {
  const marquees = document.querySelectorAll(".about_marquee-row");

  marquees.forEach((marquee) => {
    const translate = marquee.classList.contains("right") ? 100 : -100;
    const els = marquee.querySelectorAll(".about-marquee-el");

    gsap.to(els, {
      xPercent: translate,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  });
}
