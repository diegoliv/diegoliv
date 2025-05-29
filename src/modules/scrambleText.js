import { setDesktopScrambleText } from "./desktop/setScrambleText";
import { setMobileScrambleText } from "./mobile/setScrambleText";

export function setScrambleText() {
  // use GSAP's matchMedia to detect if the screen is mobile or desktop
  const mm = gsap.matchMedia();

  mm.add("(min-width: 992px)", () => {
    setDesktopScrambleText();
  });
  mm.add("(max-width: 991px)", () => {
    setMobileScrambleText();
  });
}
