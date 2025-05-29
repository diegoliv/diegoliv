export function setMobileScrambleText() {
  const spacers = document.querySelectorAll(".page-spacer");

  if (!spacers) {
    return;
  }

  const _CHARS = "!1€5@#][6&$(=)£AF/&(234$$2N€O=(!@[ ";

  function setScrambleIn(els) {
    els.forEach((el) => {
      gsap.to(el, {
        duration: 1,
        scrambleText: {
          text: el.dataset.text,
          chars: _CHARS,
          delimiter: " ",
        },
      });
    });
  }

  function setButtonsIn(btns) {
    if (!btns) return;
    gsap.to(btns, {
      duration: 0.5,
      stagger: 0.02,
      scale: 1,
      ease: "expo.inOut",
    });
  }

  // function setBgIn(bg) {
  //   if (!bg) return;
  //   const img = getAll(bg, "img");
  //   gsap.to(bg, {
  //     duration: 1,
  //     clipPath: "inset(0%)",
  //     ease: "expo.out",
  //   });

  //   gsap.fromTo(img, {
  //     scale: 1.2,
  //   },
  //   {
  //     duration: 1,
  //     scale: 1,
  //     ease: "expo.out",
  //   });
  // }

  // function getAll(els, selector) {
  //   return Array.from(els).reduce((acc, el) => {
  //     const found = el.querySelectorAll(selector);
  //     return acc.concat(Array.from(found));
  //   }, []);
  // }

  gsap.set(document.querySelectorAll("[data-stagger-btn]"), { scale: 0 });

  const els = document.querySelectorAll("[data-stagger]");
  const btns = document.querySelectorAll("[data-stagger-btn]");
  // const bgs = document.querySelector(".project-gallery_bg");

  els.forEach((el) => {
    // create a wrapper for the element, and then set a copy of the node element with aria-hidden="true"
    const wrapper = document.createElement("span");
    wrapper.classList.add("scramble-wrapper");
    const copy = el.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    wrapper.appendChild(copy);
    el.parentNode.appendChild(wrapper);
    wrapper.appendChild(el);

    el.dataset.text = el.textContent;
    el.textContent = "";

    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "bottom bottom",
        once: true,
        onEnter: () => {
          setScrambleIn([el]);
        },
      },
    });
  });

  btns.forEach((button) => {
    console.log("button", button);
    gsap.timeline({
      scrollTrigger: {
        trigger: button,
        start: "bottom bottom",
        once: true,
        onEnter: () => {
          setButtonsIn([button]);
        },
      },
    });
  });

  // bgs.forEach((bg) => {
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: bg,
  //       start: "top center",
  //       once: true,
  //       onEnter: () => {
  //         setBgIn([bg]);
  //       },
  //     },
  //   });
  // });
}
