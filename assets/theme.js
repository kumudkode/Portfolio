// Theme Toggle - Minimal Dark/Light Mode with Accessibility
(function initTheme() {
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Update aria-pressed on page load
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", savedTheme === "dark");
    }
  });
})();

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update aria-pressed for screen readers
  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", newTheme === "dark");
  }

  // Announce theme change to screen readers
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.className = "sr-only";
  announcement.textContent = `Theme changed to ${newTheme} mode`;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);

  // Smooth transition
  document.body.style.transition =
    "background-color 0.5s ease, color 0.5s ease";
}

// Keyboard support for theme toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
});

// Mobile drawer menu (hamburger)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector("[data-drawer]");
  const overlay = document.querySelector("[data-drawer-overlay]");
  const closeBtn = drawer
    ? drawer.querySelector(".mobile-drawer__close")
    : null;

  if (!toggle || !drawer || !overlay) return;

  const setSoundIcon = (muted) => {
    const toggles = [
      document.getElementById("sound-toggle"),
      document.getElementById("sound-toggle-mobile"),
    ].filter(Boolean);
    toggles.forEach((btn) => {
      btn.classList.toggle("muted", muted);
    });
  };

  const open = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", open);
  overlay.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) close();
  });

  // Sync sound toggle in drawer with main
  const soundToggles = [
    document.getElementById("sound-toggle"),
    document.getElementById("sound-toggle-mobile"),
  ].filter(Boolean);

  soundToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const muted = btn.classList.toggle("muted");
      setSoundIcon(muted);
      if (typeof toggleSound === "function") toggleSound();
    });
  });
});
