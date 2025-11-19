// 手機版選單開關＋漢堡動畫
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  // 點選導覽列連結後自動收合（手機時）
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });
}

// footer 年份
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 語言切換：中文 / 英文 / 日文
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

// 初始語言（如果 localStorage 有紀錄就用）
let initialLang = "zh";
try {
  const saved = localStorage.getItem("serein-lang");
  if (saved === "en" || saved === "zh" || saved === "ja") {
    initialLang = saved;
  }
} catch (e) {
  // ignore
}
applyLang(initialLang);

if (langSwitch) {
  langSwitch.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      applyLang(lang);
    });
  });
}
