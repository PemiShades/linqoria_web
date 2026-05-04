const nav = document.querySelector("[data-nav]");
const revealTargets = document.querySelectorAll(".reveal");
const highlightLines = document.querySelectorAll(".line-highlight");
const storyCards = document.querySelectorAll(".story-card");
const featureScreen = document.getElementById("featureScreen");
const parallaxTargets = document.querySelectorAll("[data-parallax]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateNav = () => {
  nav?.classList.toggle("scrolled", window.scrollY > 18);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 },
);

revealTargets.forEach((target) => revealObserver.observe(target));

const highlightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  },
  { rootMargin: "-28% 0px -50% 0px", threshold: 0.2 },
);

highlightLines.forEach((line) => highlightObserver.observe(line));

const setFeatureScreen = (card) => {
  const nextScreen = card?.dataset.screen;
  if (!nextScreen || !featureScreen || featureScreen.getAttribute("src") === nextScreen) return;

  storyCards.forEach((item) => item.classList.remove("active"));
  card.classList.add("active");
  featureScreen.classList.add("is-changing");
  window.setTimeout(() => {
    featureScreen.setAttribute("src", nextScreen);
    featureScreen.classList.remove("is-changing");
  }, 140);
};

storyCards.forEach((card) => {
  card.addEventListener("mouseenter", () => setFeatureScreen(card));
  card.addEventListener("focusin", () => setFeatureScreen(card));
  card.addEventListener("click", () => setFeatureScreen(card));
});

const storyObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setFeatureScreen(visible.target);
  },
  { rootMargin: "-20% 0px -35% 0px", threshold: [0.25, 0.5, 0.75] },
);

storyCards.forEach((card) => storyObserver.observe(card));

let ticking = false;
const updateParallax = () => {
  if (reduceMotion) return;
  parallaxTargets.forEach((target) => {
    const speed = Number(target.dataset.parallax || 0);
    const rect = target.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
    target.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
  ticking = false;
};

window.addEventListener("scroll", () => {
  updateNav();
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

updateNav();
updateParallax();
