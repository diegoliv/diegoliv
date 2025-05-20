export function initArrowScroll() {
  const hero = document.getElementById("hero");

  if (!hero) {
    return;
  }

  const arrow = document.querySelector(".indicator_el.arrow");

  if (!arrow) {
    return;
  }

  const icon = arrow.querySelector(".indicator_icon");
  const squares = arrow.querySelectorAll("rect");
  gsap.set(arrow, { scale: 0 });
  gsap.set(squares, { opacity: 0 });
  let hover;

  const arrowTl = gsap.to(icon, {
    duration: 0.5,
    yPercent: 10,
    repeat: 1,
    yoyo: true,
    paused: true,
    onComplete: checkHover,
  });

  function checkHover() {
    if (hover) {
      arrowTl.restart();
    }
  }

  function arrowIn() {
    gsap.to(arrow, {
      scale: 1,
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(squares, {
      opacity: 1,
      duration: 0,
      stagger: {
        each: 0.01,
        from: "random",
      },
    });
  }

  function arrowOut() {
    gsap.to(arrow, {
      scale: 0,
      duration: 0.5,
      ease: "expo.out",
    });
    gsap.to(squares, {
      opacity: 0,
      duration: 0.5,
      stagger: {
        each: 0.01,
        from: "random",
      },
    });
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        arrowIn();
      },
      onLeave: () => {
        arrowOut();
      },
      onEnterBack: () => {
        arrowIn();
      },
      onLeaveBack: () => {
        arrowOut();
      },
    },
  });

  arrow.addEventListener("mouseenter", () => {
    hover = true;
    arrowTl.play();
    if (arrowTl.progress() == 0) {
      arrowTl.restart(); //not sure why play() doesn't work when progress() == 0
    }
  });

  arrow.addEventListener("mouseleave", () => {
    hover = false;
  });
}
