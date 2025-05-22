export function setMenu() {
  const menu = document.querySelector(".menu");
  const menuItems = document.querySelectorAll(".menu_item");
  const menuInners = document.querySelectorAll(".menu_item-inner");
  const trigger = document.querySelector(".menu-trigger");
  let currentTriggerLabel = trigger.textContent;

  // Set the initial state of the menu
  gsap.set(menu, { autoAlpha: 0 });
  gsap.set(menuItems, { scale: 0 });
  gsap.set(menuInners, { opacity: 0 });

  const tl = gsap.timeline({ paused: true });

  tl.set(menu, { autoAlpha: 1 })
    .to(
      menuItems,
      {
        duration: 0.5,
        scale: 1,
        ease: "expo.inOut",
        stagger: 0.1,
      },
      "<"
    )
    .to(
      menuInners,
      {
        duration: 0.5,
        opacity: 1,
        ease: "expo.inOut",
        stagger: 0.1,
      },
      "<"
    );

  trigger.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      currentTriggerLabel = "Menu";
      // Change the trigger label
      gsap.to(trigger, {
        duration: 0.5,
        scrambleText: {
          text: currentTriggerLabel,
        },
        ease: "expo.out",
      });

      tl.reverse();
      menu.classList.remove("is-open");
    } else {
      // Change the trigger label
      currentTriggerLabel = "Close";
      gsap.to(trigger, {
        duration: 0.5,
        scrambleText: {
          text: currentTriggerLabel,
        },
        ease: "expo.out",
      });

      tl.play();
      menu.classList.add("is-open");
    }
  });

  trigger.addEventListener("mouseenter", () => {
    gsap.to(trigger, {
      duration: 0.5,
      scrambleText: {
        text: currentTriggerLabel,
      },
      ease: "expo.out",
    });
  });
}