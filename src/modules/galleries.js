import { initDesktopGalleries } from "./desktop/initGalleries";
import { initMobileGalleries } from "./mobile/initGalleries";

export function setGalleries() {
  // use GSAP's matchMedia to detect if the screen is mobile or desktop
  const mm = gsap.matchMedia();

  mm.add("(min-width: 992px)", () => {
    initDesktopGalleries();
  });
  mm.add("(max-width: 991px)", () => {
    initMobileGalleries();
  });
}