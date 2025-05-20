// numbers scroll
export function setNumbersFlip() {
  const spacers = document.querySelectorAll("#work .page-spacer");
  const numbers = document.querySelectorAll(".indicator_icon.number");

  if (!spacers || !numbers) {
    return;
  }

  function scrambleIn(els) {
    gsap.to(els, {
      opacity: 1,
      duration: 0,
      stagger: {
        each: 0.01,
        from: "random",
      },
    });
  }

  function scrambleOut(els) {
    gsap.to(els, {
      opacity: 0,
      duration: 0,
      stagger: {
        each: 0.01,
        from: "random",
      },
    });
  }

  spacers.forEach((spacer, i) => {
    const number = numbers[i],
      squares = number.querySelectorAll("rect");

    gsap.set(squares, { opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: spacer,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          scrambleIn(squares);
        },
        onLeave: () => {
          scrambleOut(squares);
        },
        onEnterBack: () => {
          scrambleIn(squares);
        },
        onLeaveBack: () => {
          scrambleOut(squares);
        },
      },
    });
  });
}
