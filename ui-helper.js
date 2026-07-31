/* ----- Navbar Hover Effect ----- */
document.querySelectorAll("#navbar a").forEach((link) => {
  const original = link.textContent;
  const hover = link.dataset.hover;
  if (hover) {
    link.addEventListener("mouseenter", () => (link.textContent = hover));
    link.addEventListener("mouseleave", () => (link.textContent = original));
  }
});
