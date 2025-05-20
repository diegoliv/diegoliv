import { setGalleries } from "./modules/galleries";
import { setScrambleText } from "./modules/scrambleText";
import { setAboutMarquee } from "./modules/aboutMarquee";
import { initArrowScroll } from "./modules/arrowScroll";
import { setWorkScroll } from "./modules/workScroll";
import { setNumbersFlip } from "./modules/numbersFlip";
import { setAvailability } from "./modules/availability";

document.addEventListener("DOMContentLoaded", () => {
  setGalleries();
  setScrambleText();
  setAboutMarquee();
  initArrowScroll();
  setWorkScroll();
  setNumbersFlip();
  setAvailability();
});