import { setGallery } from "./galleries/setGallery";

export function initMobileGalleries() {
  const galleries = document.querySelectorAll(".project-slider_wrapper");

  if (!galleries) {
    return;
  }

  galleries.forEach((gallery) => {
    if (gallery.classList.contains("project-slider_set")) {
      return;
    }
    // Mark the gallery as set to prevent re-initialization
    gallery.classList.add("project-slider_set");

    // Set the gallery items
    setGallery(gallery);
  });

}