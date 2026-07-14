/* Mobile nav */
const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("main-nav");

hamburger?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});

// Close nav when a link is clicked
mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* Header scroll effect */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

/* Quote form */
const quoteForm   = document.querySelector("#quote-form");
const formSuccess = document.getElementById("form-success");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data    = new FormData(quoteForm);
  const name    = String(data.get("name")    || "").trim();
  const service = String(data.get("service") || "").trim();
  const details = String(data.get("details") || "").trim();

  const body = [
    "Hi Ken's, I'd like a quote.",
    name    ? `Name: ${name}`       : "",
    service ? `Service: ${service}` : "",
    details ? `Details: ${details}` : ""
  ].filter(Boolean).join("\n");
  const encodedBody = encodeURIComponent(body);

  window.location.href = `sms:+15093852334?body=${encodedBody}`;

  if (formSuccess) {
    formSuccess.hidden = false;
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  }
});

/* Scroll-reveal (lightweight) */
if ("IntersectionObserver" in window) {
  const style = document.createElement("style");
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity .55s ease, transform .55s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    ".service-card, .step, .area-card, .contact-card, .photo-grid figure, .stat"
  );
  targets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
}
