/* ============================================================
   SINGHANON — App Logic
   Defensive by design: a malformed or missing entry in data.js
   is skipped with a console warning instead of crashing the app.
   ============================================================ */

(function () {
  "use strict";

  const FAV_KEY = "singhanon_favorites";
  const REPORT_KEY = "singhanon_reports";

  /* ---------- Safe data loading ---------- */

  function validEntry(e) {
    return (
      e &&
      typeof e.word === "string" && e.word.trim().length > 0 &&
      typeof e.pos === "string" && e.pos.trim().length > 0 &&
      typeof e.definition === "string" && e.definition.trim().length > 0
    );
  }

  let ENTRIES = [];
  try {
    const raw = Array.isArray(window.DICTIONARY_ENTRIES) ? window.DICTIONARY_ENTRIES : [];
    ENTRIES = raw.filter((e, i) => {
      const ok = validEntry(e);
      if (!ok) console.warn("Singhanon: skipped malformed entry at index " + i, e);
      return ok;
    });
  } catch (err) {
    console.error("Singhanon: failed to load dictionary data", err);
    ENTRIES = [];
  }

  // Sort alphabetically (Aklanon alphabetical order approximates
  // standard Latin order closely enough for a mobile reference tool).
  ENTRIES.sort((a, b) => a.word.localeCompare(b.word, "en", { sensitivity: "base" }));

  /* ---------- Favorites (localStorage) ---------- */

  function getFavorites() {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function toggleFavorite(word) {
    try {
      let favs = getFavorites();
      if (favs.includes(word)) {
        favs = favs.filter((w) => w !== word);
      } else {
        favs.push(word);
      }
      localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    } catch (err) {
      console.warn("Singhanon: could not save favorite (storage unavailable)", err);
    }
    return getFavorites();
  }

  /* ---------- Reports (localStorage, prototype-only) ---------- */

  function saveReport(word, reason) {
    try {
      const raw = localStorage.getItem(REPORT_KEY);
      const reports = raw ? JSON.parse(raw) : [];
      reports.push({ word, reason, timestamp: new Date().toISOString() });
      localStorage.setItem(REPORT_KEY, JSON.stringify(reports));
      return true;
    } catch (err) {
      console.warn("Singhanon: could not save report (storage unavailable)", err);
      return false;
    }
  }

  /* ---------- Part-of-speech color helper ---------- */

  function posColorVar(pos) {
    if (!pos) return "var(--pos-fn)";
    if (pos === "n") return "var(--pos-n)";
    if (pos === "adj") return "var(--pos-adj)";
    if (pos === "adv") return "var(--pos-adv)";
    if (/^RV\d/.test(pos)) return "var(--pos-rv)";
    if (pos === "CV") return "var(--pos-cv)";
    if (pos === "DV") return "var(--pos-dv)";
    if (/^ST\d/.test(pos)) return "var(--pos-st)";
    if (/pro$/.test(pos)) return "var(--pos-pro)";
    return "var(--pos-fn)";
  }

  function posLabel(pos) {
    return (window.POS_LABELS && window.POS_LABELS[pos]) || pos;
  }

  /* ---------- DOM refs ---------- */

  const dictTabBtn = document.getElementById("tab-dictionary");
  const favTabBtn = document.getElementById("tab-favorites");
  const aboutTabBtn = document.getElementById("tab-about");

  const dictView = document.getElementById("view-dictionary");
  const aboutView = document.getElementById("view-about");

  const searchInput = document.getElementById("search-input");
  const alphaStrip = document.getElementById("alpha-strip");
  const resultCount = document.getElementById("result-count");
  const wordList = document.getElementById("word-list");
  const detailRoot = document.getElementById("detail-root");
  const reportRoot = document.getElementById("report-root");

  let currentLetter = null;
  let showFavoritesOnly = false;

  /* ---------- Alphabet strip ---------- */

  function buildAlphaStrip() {
    const letters = "ABKDEGHILMNOPRSTWY".split(""); // Aklanon-relevant letters present in data
    const present = new Set(ENTRIES.map((e) => e.word[0].toUpperCase()));
    alphaStrip.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.style.width = "auto";
    allBtn.style.padding = "0 0.5rem";
    allBtn.className = currentLetter === null ? "active" : "";
    allBtn.addEventListener("click", () => { currentLetter = null; render(); });
    alphaStrip.appendChild(allBtn);

    letters.forEach((L) => {
      const btn = document.createElement("button");
      btn.textContent = L;
      const has = present.has(L);
      btn.disabled = !has;
      btn.className = currentLetter === L ? "active" : "";
      if (has) btn.addEventListener("click", () => { currentLetter = L; render(); });
      alphaStrip.appendChild(btn);
    });
  }

  /* ---------- Rendering the list ---------- */

  function getFilteredEntries() {
    const q = searchInput.value.trim().toLowerCase();
    const favs = getFavorites();

    return ENTRIES.filter((e) => {
      if (showFavoritesOnly && !favs.includes(e.word)) return false;
      if (currentLetter && e.word[0].toUpperCase() !== currentLetter) return false;
      if (q) {
        const hay = (e.word + " " + e.definition).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function render() {
    buildAlphaStrip();
    const favs = getFavorites();
    const entries = getFilteredEntries();

    resultCount.textContent = entries.length + (entries.length === 1 ? " entry" : " entries") +
      (showFavoritesOnly ? " saved" : "");

    wordList.innerHTML = "";

    if (entries.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = showFavoritesOnly
        ? "You haven't saved any words yet. Tap the heart on a word to save it."
        : "No matching entries found.";
      wordList.appendChild(empty);
      return;
    }

    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.className = "word-card";

      const main = document.createElement("div");
      main.className = "word-card-main";

      const headline = document.createElement("div");
      headline.className = "word-headline";

      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.textContent = entry.word;
      headline.appendChild(wordSpan);

      const posTag = document.createElement("span");
      posTag.className = "pos-tag";
      posTag.style.background = posColorVar(entry.pos);
      posTag.textContent = entry.pos;
      headline.appendChild(posTag);

      main.appendChild(headline);

      const preview = document.createElement("div");
      preview.className = "word-def-preview";
      preview.textContent = entry.definition;
      main.appendChild(preview);

      card.appendChild(main);

      const heart = document.createElement("button");
      heart.className = "heart-btn" + (favs.includes(entry.word) ? " saved" : "");
      heart.setAttribute("aria-label", "Save word");
      heart.textContent = favs.includes(entry.word) ? "\u2665" : "\u2661";
      heart.addEventListener("click", (ev) => {
        ev.stopPropagation();
        toggleFavorite(entry.word);
        render();
      });
      card.appendChild(heart);

      card.addEventListener("click", () => openDetail(entry));

      wordList.appendChild(card);
    });
  }

  /* ---------- Word detail sheet ---------- */

  function openDetail(entry) {
    const favs = getFavorites();
    const isSaved = favs.includes(entry.word);

    detailRoot.innerHTML = "";

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.addEventListener("click", (ev) => { if (ev.target === overlay) closeDetail(); });

    const sheet = document.createElement("div");
    sheet.className = "detail-sheet";

    const top = document.createElement("div");
    top.className = "detail-top";
    const wordEl = document.createElement("div");
    wordEl.className = "detail-word";
    wordEl.textContent = entry.word;
    top.appendChild(wordEl);

    const closeBtn = document.createElement("button");
    closeBtn.className = "detail-close";
    closeBtn.textContent = "\u00d7";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.addEventListener("click", closeDetail);
    top.appendChild(closeBtn);
    sheet.appendChild(top);

    const meta = document.createElement("div");
    meta.className = "detail-meta";
    const posTag = document.createElement("span");
    posTag.className = "pos-tag";
    posTag.style.background = posColorVar(entry.pos);
    posTag.textContent = entry.pos + " \u2014 " + posLabel(entry.pos);
    meta.appendChild(posTag);
    if (entry.origin) {
      const originTag = document.createElement("span");
      originTag.className = "origin-tag";
      originTag.textContent = "from " + entry.origin;
      meta.appendChild(originTag);
    }
    sheet.appendChild(meta);

    const def = document.createElement("div");
    def.className = "detail-definition";
    def.textContent = entry.definition;
    sheet.appendChild(def);

    if (entry.example && entry.example.aklanon) {
      const ex = document.createElement("div");
      ex.className = "detail-example";
      const akl = document.createElement("div");
      akl.className = "akl";
      akl.textContent = entry.example.aklanon;
      const eng = document.createElement("div");
      eng.className = "eng";
      eng.textContent = entry.example.english || "";
      ex.appendChild(akl);
      ex.appendChild(eng);
      sheet.appendChild(ex);
    }

    if (entry.alt) {
      const alt = document.createElement("div");
      alt.className = "detail-extra";
      alt.textContent = "Alternate form: " + entry.alt;
      sheet.appendChild(alt);
    }
    if (entry.related) {
      const rel = document.createElement("div");
      rel.className = "detail-extra";
      rel.textContent = "Related: " + entry.related;
      sheet.appendChild(rel);
    }
    if (entry.page) {
      const pg = document.createElement("div");
      pg.className = "detail-extra";
      pg.textContent = "Source dictionary, p. " + entry.page;
      sheet.appendChild(pg);
    }

    const actions = document.createElement("div");
    actions.className = "detail-actions";

    const favBtn = document.createElement("button");
    favBtn.className = "fav-action" + (isSaved ? " saved" : "");
    favBtn.textContent = isSaved ? "\u2665 Saved" : "\u2661 Save word";
    favBtn.addEventListener("click", () => {
      toggleFavorite(entry.word);
      render();
      openDetail(entry);
    });
    actions.appendChild(favBtn);

    const reportBtn = document.createElement("button");
    reportBtn.className = "report-action";
    reportBtn.textContent = "\u26a0 Report content";
    reportBtn.addEventListener("click", () => openReport(entry));
    actions.appendChild(reportBtn);

    sheet.appendChild(actions);
    overlay.appendChild(sheet);
    detailRoot.appendChild(overlay);
  }

  function closeDetail() {
    detailRoot.innerHTML = "";
  }

  /* ---------- Report modal ---------- */

  function openReport(entry) {
    reportRoot.innerHTML = "";

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.addEventListener("click", (ev) => { if (ev.target === overlay) reportRoot.innerHTML = ""; });

    const sheet = document.createElement("div");
    sheet.className = "detail-sheet report-form";

    const top = document.createElement("div");
    top.className = "detail-top";
    const title = document.createElement("div");
    title.className = "detail-word";
    title.style.fontSize = "1.3rem";
    title.textContent = "Report \u201c" + entry.word + "\u201d";
    top.appendChild(title);
    const closeBtn = document.createElement("button");
    closeBtn.className = "detail-close";
    closeBtn.textContent = "\u00d7";
    closeBtn.addEventListener("click", () => { reportRoot.innerHTML = ""; });
    top.appendChild(closeBtn);
    sheet.appendChild(top);

    const note = document.createElement("p");
    note.style.fontFamily = "Arial, sans-serif";
    note.style.fontSize = "0.85rem";
    note.style.color = "#5b5f66";
    note.textContent = "Let us know if this entry contains content that isn't suitable for young learners, or if you've spotted an error.";
    sheet.appendChild(note);

    const label = document.createElement("label");
    label.textContent = "What's the issue?";
    sheet.appendChild(label);

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Describe the issue with this entry...";
    sheet.appendChild(textarea);

    const submitBtn = document.createElement("button");
    submitBtn.className = "submit-report";
    submitBtn.textContent = "Submit report";
    sheet.appendChild(submitBtn);

    const confirmNote = document.createElement("div");
    confirmNote.className = "confirm-note";
    confirmNote.style.display = "none";
    confirmNote.textContent = "Thank you \u2014 your report has been recorded for review.";
    sheet.appendChild(confirmNote);

    submitBtn.addEventListener("click", () => {
      const reason = textarea.value.trim() || "(no details provided)";
      const ok = saveReport(entry.word, reason);
      confirmNote.textContent = ok
        ? "Thank you \u2014 your report has been recorded for review."
        : "Thanks \u2014 we couldn't store this locally, but your feedback is noted for this session.";
      confirmNote.style.display = "block";
      submitBtn.disabled = true;
      textarea.disabled = true;
    });

    overlay.appendChild(sheet);
    reportRoot.appendChild(overlay);
  }

  /* ---------- About page accordion ---------- */

  function initAccordion() {
    document.querySelectorAll(".accordion-item").forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });
  }

  /* ---------- Tabs ---------- */

  function setTab(tab) {
    dictTabBtn.classList.toggle("active", tab === "dictionary" || tab === "favorites");
    aboutTabBtn.classList.toggle("active", tab === "about");
    dictView.style.display = tab === "about" ? "none" : "block";
    aboutView.style.display = tab === "about" ? "block" : "none";
    showFavoritesOnly = tab === "favorites";
    if (tab !== "about") render();
  }

  dictTabBtn.addEventListener("click", () => setTab("dictionary"));
  favTabBtn.addEventListener("click", () => setTab("favorites"));
  aboutTabBtn.addEventListener("click", () => setTab("about"));

  searchInput.addEventListener("input", render);

  /* ---------- Init ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    initAccordion();
    render();
  });
})();
