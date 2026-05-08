const parallaxLayers = document.querySelectorAll(".parallax-layer");
const revealElements = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const shopButton = document.querySelector("#shop-btn");
const closeDashboardButton = document.querySelector("#dashboard-close");
const dashboardScreen = document.querySelector("#shop-dashboard");
const landingMain = document.querySelector("main");
const siteHeader = document.querySelector(".site-header");
const siteFooter = document.querySelector(".site-footer");

function applyParallax() {
  const y = window.scrollY;
  parallaxLayers.forEach((layer) => {
    const speed = Number(layer.dataset.speed || 0);
    const offset = y * speed;
    layer.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function setupTiltEffects() {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((localX - centerX) / centerX) * 8;
      const rotateX = -((localY - centerY) / centerY) * 8;

      card.style.transform =
        `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
}

function openShopDashboard() {
  if (!dashboardScreen || !landingMain || !siteHeader || !siteFooter) return;
  dashboardScreen.classList.remove("hidden");
  dashboardScreen.setAttribute("aria-hidden", "false");
  landingMain.classList.add("hidden");
  siteHeader.classList.add("hidden");
  siteFooter.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeShopDashboard() {
  if (!dashboardScreen || !landingMain || !siteHeader || !siteFooter) return;
  dashboardScreen.classList.add("hidden");
  dashboardScreen.setAttribute("aria-hidden", "true");
  landingMain.classList.remove("hidden");
  siteHeader.classList.remove("hidden");
  siteFooter.classList.remove("hidden");
}

window.addEventListener("scroll", applyParallax, { passive: true });
window.addEventListener("load", () => {
  applyParallax();
  setupRevealAnimations();
  setupTiltEffects();

  if (shopButton) {
    shopButton.addEventListener("click", openShopDashboard);
  }

  if (closeDashboardButton) {
    closeDashboardButton.addEventListener("click", closeShopDashboard);
  }
});
