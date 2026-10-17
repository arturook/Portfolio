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
