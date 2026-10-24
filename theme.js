const themeToggle = document.querySelector("#theme-toggle");
const themeStorageKey = "my-pixl-page-theme";
let currentTheme = "dark";

try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    currentTheme = savedTheme;
  }
} catch (error) {
  console.error("Unable to load the saved color theme:", error);
}

function applyTheme(theme) {
  currentTheme = theme;
  document.body.dataset.theme = theme;

  if (themeToggle) {
    const isLight = theme === "light";
    themeToggle.setAttribute("aria-checked", String(isLight));
  }
}

applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);

    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch (error) {
      console.error("Unable to save the color theme:", error);
    }
  });
}
