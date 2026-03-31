export function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
  // Remove the hash from the URL without triggering a navigation
  history.replaceState(null, "", window.location.pathname);
}
