const nav = document.querySelector("[data-nav]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrubTargets = [
  ...new Set([
    ...document.querySelectorAll(".reveal"),
    ...document.querySelectorAll(".line-highlight"),
    ...document.querySelectorAll(".arc-step"),
    ...document.querySelectorAll(".hero-stage"),
    ...document.querySelectorAll("[data-scrub]"),
  ]),
];

const storyCards = [...document.querySelectorAll(".story-card")];
const featureScreens = [...document.querySelectorAll(".feature-screen")];
const marqueeTrack = document.querySelector("[data-marquee]");

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const progressFromRect = (rect, startRatio = 0.9, endRatio = 0.28) => {
  const start = window.innerHeight * startRatio;
  const end = window.innerHeight * endRatio;
  return clamp((start - rect.top) / (start - end));
};

const proximityProgress = (rect, targetRatio = 0.45, spreadRatio = 0.38) => {
  const target = window.innerHeight * targetRatio;
  const spread = window.innerHeight * spreadRatio;
  const center = rect.top + rect.height * 0.5;
  return clamp(1 - Math.abs(center - target) / spread);
};

const setProgress = (element, progress) => {
  element.style.setProperty("--progress", progress.toFixed(4));
  element.style.setProperty("--scrub-y", `${((1 - progress) * 24).toFixed(2)}px`);
  element.style.setProperty("--scrub-opacity", (0.18 + progress * 0.82).toFixed(4));
  element.style.setProperty("--arc-opacity", (0.25 + progress * 0.75).toFixed(4));
  element.style.setProperty("--arc-phone-y", `${((1 - progress) * 18).toFixed(2)}px`);
  element.style.setProperty("--line-alpha", (0.2 + progress * 0.8).toFixed(4));
  element.style.setProperty("--story-x", `${(progress * 8).toFixed(2)}px`);
  element.style.setProperty("--story-shadow", (progress * 0.045).toFixed(4));
  element.style.setProperty("--hero-y", `${(progress * -18).toFixed(2)}px`);
  element.style.setProperty("--ticket-left-x", `${(progress * -10).toFixed(2)}px`);
  element.style.setProperty("--ticket-left-y", `${(progress * -18).toFixed(2)}px`);
  element.style.setProperty("--ticket-right-x", `${(progress * 10).toFixed(2)}px`);
  element.style.setProperty("--ticket-right-y", `${(progress * 18).toFixed(2)}px`);
  element.style.setProperty("--marquee-x", `${(progress * -26).toFixed(2)}%`);
};

const updateNav = () => {
  nav?.classList.toggle("scrolled", window.scrollY > 18);
};

const updateScrubbedElements = () => {
  scrubTargets.forEach((element) => {
    if (element === marqueeTrack) return;
    const progress = reduceMotion ? 1 : progressFromRect(element.getBoundingClientRect());
    setProgress(element, progress);
  });

  if (marqueeTrack) {
    const marqueeSection = marqueeTrack.closest(".marquee") || marqueeTrack;
    const progress = reduceMotion ? 0 : progressFromRect(marqueeSection.getBoundingClientRect(), 1, 0.05);
    setProgress(marqueeTrack, progress);
  }
};

const updateStorySequence = () => {
  if (!storyCards.length || !featureScreens.length) return;

  if (reduceMotion) {
    storyCards[0]?.classList.add("active");
    featureScreens.forEach((screen, index) => {
      screen.style.setProperty("--screen-opacity", index === 0 ? "1" : "0");
      screen.style.setProperty("--screen-scale", index === 0 ? "1" : "1.012");
    });
    return;
  }

  const progressValues = storyCards.map((card) =>
    proximityProgress(card.getBoundingClientRect()),
  );
  const strongest = progressValues.reduce(
    (winner, value, index) => (value > progressValues[winner] ? index : winner),
    0,
  );
  const strongestValue = progressValues[strongest] || 0;
  const total = progressValues.reduce((sum, value) => sum + value, 0) || 1;

  storyCards.forEach((card, index) => {
    card.classList.toggle("active", index === strongest);
    setProgress(card, progressValues[index]);
  });

  featureScreens.forEach((screen, index) => {
    const opacity = strongestValue < 0.02
      ? index === strongest ? 1 : 0
      : progressValues[index] / total;
    screen.style.setProperty("--screen-opacity", opacity.toFixed(4));
    screen.style.setProperty("--screen-scale", (1.012 - opacity * 0.012).toFixed(4));
  });
};

let ticking = false;
const updateMotion = () => {
  updateNav();
  updateScrubbedElements();
  updateStorySequence();
  ticking = false;
};

const requestUpdate = () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateMotion);
};

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", requestUpdate);
window.addEventListener("load", updateMotion);

updateMotion();
