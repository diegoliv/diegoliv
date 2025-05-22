export function setScrambleText() {
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

  function setScrambleOut(els) {
    els.forEach((el) => {
      gsap.to(el, {
        duration: 1,
        scrambleText: {
          text: "",
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

  function setButtonsOut(btns) {
    if (!btns) return;
    gsap.to(btns, {
      duration: 0.5,
      stagger: 0.02,
      scale: 0,
      ease: "expo.inOut",
    });
  }

  function setBgIn(bg) {
    if (!bg) return;
    const img = getAll(bg, "img");
    gsap.to(bg, {
      duration: 1,
      clipPath: "inset(0%)",
      ease: "expo.out",
    });

    gsap.fromTo(img, {
      scale: 1.2,
    },
    {
      duration: 1,
      scale: 1,
      ease: "expo.out",
    });
  }

  function setBgOut(bg) {
    if (!bg) return;
    const img = getAll(bg, "img");

    gsap.to(bg, {
      duration: 1,
      clipPath: "inset(50%)",
      ease: "expo.out",
    });

    gsap.to(img, {
      duration: 1,
      scale: 1.2,
      ease: "expo.out",
    });
  }

  function getAll(els, selector) {
    let all = [];

    els.forEach((el) => {
      const list = el.querySelectorAll(selector);
      if (!list) return;

      list.forEach((l) => {
        all.push(l);
      });
    });

    return all;
  }

  gsap.set(document.querySelectorAll("[data-stagger-btn]"), { scale: 0 });

  spacers.forEach((spacer) => {
    const id = spacer.dataset.id || null;
    if (!id) {
      return;
    }
    const section = document.querySelectorAll(`[data-section="${id}"]`);
    if (!section) {
      return;
    }

    const els = getAll(section, "[data-stagger]");
    if (!els) {
      return;
    }

    els.forEach((el) => {
      el.dataset.text = el.textContent;
      el.textContent = "";
    });

    const btns = getAll(section, "[data-stagger-btn]");

    // check if block contains bg img
    const bg = getAll(section, ".image_bg-wrapper");

    // check if block contains gallery
    const gallery = getAll(section, ".project-gallery_wrapper");

    if (gallery) {
      gsap.set(gallery, { rotateX: 90 });
      gsap.set(gallery, { display: "none" });
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: spacer,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setScrambleIn(els);
          setButtonsIn(btns);
          setBgIn(bg);
          gsap.set(gallery, { display: "flex" });
          gsap.to(gallery, {
            rotateX: 0,
            duration: 1,
            ease: "expo.out",
          });
        },
        onLeave: () => {
          setScrambleOut(els);
          setButtonsOut(btns);
          gsap.to(gallery, {
            rotateX: -90,
            duration: 1,
            ease: "expo.out",
            onComplete: () => {
              gsap.set(gallery, { display: "none" });
            }
          });
        },
        onEnterBack: () => {
          setScrambleIn(els);
          setButtonsIn(btns);
          gsap.set(gallery, { display: "flex" });
          gsap.to(gallery, {
            rotateX: 0,
            duration: 1,
            ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          setScrambleOut(els);
          setButtonsOut(btns);
          setBgOut(bg);
          gsap.to(gallery, {
            rotateX: 90,
            duration: 1,
            ease: "expo.out",
            onComplete: () => {
              gsap.set(gallery, { display: "none" });
            },
          });
        },
      },
    });
  });
}
