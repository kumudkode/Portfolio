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
