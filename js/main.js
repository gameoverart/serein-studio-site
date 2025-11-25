document.addEventListener("DOMContentLoaded", () => {
  // 漢堡選單開關
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    });

    // 手機：點任何連結就自動收合
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

  // 子選單開關（只在手機啟用）
  const navSubParents = document.querySelectorAll(
    ".nav-item.has-sub .nav-parent"
  );

  navSubParents.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth > 768) return;

      e.preventDefault();
      e.stopPropagation();

      const item = btn.closest(".nav-item");
      const isOpen = item.classList.contains("open");

      document
        .querySelectorAll(".nav-item.has-sub.open")
        .forEach((i) => i.classList.remove("open"));

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
});


// footer 年份
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 語言切換：中 / EN / 日
const langSwitch = document.getElementById("langSwitch");
const bodyEl = document.body;

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
  } catch (e) {
    // ignore
  }
}

// 初始語言
let initialLang = "zh";
try {
  const saved = localStorage.getItem("serein-lang");
  if (saved === "en" || saved === "zh" || saved === "ja") {
    initialLang = saved;
  }
} catch (e) {}
applyLang(initialLang);

if (langSwitch) {
  langSwitch.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      applyLang(lang);
    });
  });
}
// Team page：成員經歷顯示更多 / 收起
const memberToggles = document.querySelectorAll(".member-toggle");

memberToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".team-card");
    if (!card) return;
    card.classList.toggle("expanded");
  });
});
