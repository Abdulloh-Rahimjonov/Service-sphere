// js/lang.js
let currentLang = localStorage.getItem("lang") || "uz";

function pathPrefix() {
  return location.pathname.startsWith("/html/") ? "../" : "";
}

async function loadLanguage(lang) {
  try {
    const prefix = pathPrefix();
    const response = await fetch(`${prefix}lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    document.title = translations["page_title"] || document.title;

    document.documentElement.lang = lang;
  } catch (err) {
    console.error("Tarjima faylini yuklashda xatolik:", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".language-selector button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonId = button.id;
      const newLang = buttonId.includes("Uz") ? "uz" : "ru";

      if (newLang === currentLang) return;

      localStorage.setItem("lang", newLang);

      location.reload();
    });
  });

  // Dastlabki tilni yuklash
  await loadLanguage(currentLang);
});
