export function scrambleButtons() {
  const buttons = document.querySelectorAll("[data-scramble-btn]");

  if (!buttons) {
    return;
  }

  buttons.forEach((button) => {
    const text = button.querySelector("[data-scramble-text]");
    const icon = button.querySelector("[data-scramble-icon]");
    let originalText;
    if (text) {
      originalText = text.textContent;
    }

    button.addEventListener("mouseover", () => {
      if (text) {
        gsap.to(text, {
          duration: 0.5,
          scrambleText: {
            text: originalText,
            chars: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ",
            // speed: 0.1,
            // revealDelay: 0.5,
          },
        });
      }

      if (icon) {
        const rect = icon.querySelectorAll("rect");
        gsap.set(rect, { opacity: 0 });
        gsap.to(rect, {
          duration: 0,
          opacity: 1,
          stagger: {
            each: 0.05,
            from: "random",
          },
        });
      }
    });
  });
}