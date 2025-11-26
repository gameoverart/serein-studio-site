// main.js

document.addEventListener("DOMContentLoaded", () => {
  // --- 漢堡選單開關 ---
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    });

    // 手機：點選任何 nav 連結都收起選單
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove("open");
          navToggle.classList.remove("active");
          document.body.classList.remove("nav-open");
        }
      });
    });
  }

  // --- 子選單開關：只在手機啟用，桌機照舊 hover ---
  const navSubParents = document.querySelectorAll(
    ".nav-item.has-sub .nav-parent"
  );

  navSubParents.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth > 768) return; // 桌機不處理 click

      e.preventDefault();
      e.stopPropagation();

      const item = btn.closest(".nav-item");
      const isOpen = item.classList.contains("open");

      // 一次只開一個
      document
        .querySelectorAll(".nav-item.has-sub.open")
        .forEach((i) => i.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // --- footer 年份 ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 語言切換：中 / EN / 日 ---
  const bodyEl = document.body;
  const langSwitch = document.getElementById("langSwitch");

  function applyLang(lang) {
    if (lang === "en") {
      bodyEl.classList.remove("lang-zh", "lang-ja");
      bodyEl.classList.add("lang-en");
    } else if (lang === "ja") {
      bodyEl.classList.remove("lang-zh", "lang-en");
      bodyEl.classList.add("lang-ja");
    } else {
      bodyEl.classList.remove("lang-en", "lang-ja");
      bodyEl.classList.add("lang-zh");
    }

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    try {
      localStorage.setItem("serein-lang", lang);
    } catch (_) {
      // ignore
    }
  }

  // 初始語言（localStorage 優先）
  let initialLang = "zh";
  try {
    const saved = localStorage.getItem("serein-lang");
    if (saved === "en" || saved === "zh" || saved === "ja") {
      initialLang = saved;
    }
  } catch (_) {}
  applyLang(initialLang);

  if (langSwitch) {
    langSwitch.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        applyLang(lang);
      });
    });
  }

  // --- Team 頁：顯示更多 / 收起經歷 ---
  const memberToggles = document.querySelectorAll(".member-toggle");
  memberToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".team-card");
      if (!card) return;
      card.classList.toggle("expanded");
    });
  });
});
