import { setGalleries } from "./modules/galleries";
import { setScrambleText } from "./modules/scrambleText";
import { setAboutMarquee } from "./modules/aboutMarquee";
import { initArrowScroll } from "./modules/arrowScroll";
import { setWorkScroll } from "./modules/workScroll";
import { setNumbersFlip } from "./modules/numbersFlip";
import { setAvailability } from "./modules/availability";
import { scrambleButtons } from "./modules/scrambleButtons";
import { setMenu } from "./modules/menu";

document.addEventListener("DOMContentLoaded", () => {
  setGalleries();
  setScrambleText();
  setAboutMarquee();
  initArrowScroll();
  setWorkScroll();
  setNumbersFlip();
  setAvailability();
  scrambleButtons();
  setMenu();
});