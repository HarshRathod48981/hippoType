// =========================
// GLOBAL THEME TOGGLE (Persistent across pages)
// =========================

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeButton = document.querySelector(".toggle-btn");

  // --- Apply saved theme on load ---
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  // --- Update toggle color ---
  if (themeButton) {
    themeButton.style.background = savedTheme === "dark" ? "#fff" : "#000";
  }

  // --- Add click handler if toggle exists ---
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");

      // Save to localStorage
      localStorage.setItem("theme", isDark ? "dark" : "light");

      // Update toggle color
      if (themeButton) {
        themeButton.style.background = isDark ? "#fff" : "#000";
      }
    });
  }
});