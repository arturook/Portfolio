(() => {
  const opening = document.querySelector(".opening");
  const reel = document.querySelector(".highlight-reel");
  if (!opening || !reel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let scheduled = false;
  const updateReel = () => {
    const fadeDistance = Math.max(opening.offsetHeight * 0.9, 1);
    const progress = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
    reel.style.setProperty("--reel-opacity", String(1 - progress));
    reel.style.setProperty("--reel-blur", (progress * 14) + "px");
    scheduled = false;
  };

  const onScroll = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateReel);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateReel();
})();

(() => {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(track.querySelectorAll(".niebla-slide"));
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    const current = carousel.querySelector("[data-carousel-current]");
    if (!track || !slides.length || !previous || !next || !current) return;

    const update = () => {
      const index = Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)));
      current.textContent = String(index + 1).padStart(2, "0");
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    };
    const move = (direction) => {
      track.scrollBy({
        left: direction * track.clientWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    };

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();


(() => {
  const dialog = document.querySelector("[data-lightbox]");
  const openers = Array.from(document.querySelectorAll("[data-lightbox-open]"));
  if (!dialog || !openers.length) return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const count = dialog.querySelector("[data-lightbox-count]");
  const close = dialog.querySelector("[data-lightbox-close]");
  const previous = dialog.querySelector("[data-lightbox-previous]");
  const next = dialog.querySelector("[data-lightbox-next]");
  let index = 0;

  const showPhoto = (nextIndex) => {
    index = (nextIndex + openers.length) % openers.length;
    const source = openers[index].querySelector("img");
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    caption.textContent = source.alt;
    count.textContent = String(index + 1).padStart(2, "0") + " / " + String(openers.length).padStart(2, "0");
  };

  openers.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
      showPhoto(buttonIndex);
      dialog.showModal();
    });
  });
  close.addEventListener("click", () => dialog.close());
  previous.addEventListener("click", () => showPhoto(index - 1));
  next.addEventListener("click", () => showPhoto(index + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPhoto(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(index + 1);
    }
  });
})();


(() => {
  const sectionIds = ["video", "fotografia", "sobre-mi", "contacto"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const links = Array.from(document.querySelectorAll(".site-header nav a[href^='#']"));
  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (!visible.length) return;
    const active = visible.reduce((closest, entry) => {
      const distance = Math.abs((entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2 - window.innerHeight / 2);
      const closestDistance = Math.abs((closest.boundingClientRect.top + closest.boundingClientRect.bottom) / 2 - window.innerHeight / 2);
      return distance < closestDistance ? entry : closest;
    });
    links.forEach((link) => {
      if (link.getAttribute("href") === "#" + active.target.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-25% 0px -55% 0px", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
})();
