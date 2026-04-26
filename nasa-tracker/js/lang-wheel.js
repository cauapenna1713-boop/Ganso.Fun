/* ============================================================
   LANG WHEEL  —  Suno-style vertical scroll wheel component
   Dependencies: js/i18n.js
============================================================ */

(function () {
    'use strict';

    /* ── Language data ─────────────────────────────────────── */
    const LANGUAGES = [
        { code: 'pt',    flag: '🇧🇷', name: 'Português (BR)',    display: 'PT',  rtl: false },
        { code: 'pt-PT', flag: '🇵🇹', name: 'Português (PT)',    display: 'PT',  rtl: false },
        { code: 'en',    flag: '🇺🇸', name: 'English',           display: 'EN',  rtl: false },
        { code: 'es',    flag: '🇪🇸', name: 'Español',           display: 'ES',  rtl: false },
        { code: 'es-AR', flag: '🇦🇷', name: 'Español (AR)',      display: 'ES',  rtl: false },
        { code: 'es-MX', flag: '🇲🇽', name: 'Español (MX)',      display: 'ES',  rtl: false },
        { code: 'fr',    flag: '🇫🇷', name: 'Français',          display: 'FR',  rtl: false },
        { code: 'de',    flag: '🇩🇪', name: 'Deutsch',           display: 'DE',  rtl: false },
        { code: 'it',    flag: '🇮🇹', name: 'Italiano',          display: 'IT',  rtl: false },
        { code: 'ja',    flag: '🇯🇵', name: '日本語',             display: 'JA',  rtl: false },
        { code: 'ko',    flag: '🇰🇷', name: '한국어',             display: 'KO',  rtl: false },
        { code: 'zh-CN', flag: '🇨🇳', name: '中文 (简体)',        display: 'ZH',  rtl: false },
        { code: 'zh-TW', flag: '🇹🇼', name: '中文 (繁體)',        display: 'ZH',  rtl: false },
        { code: 'ru',    flag: '🇷🇺', name: 'Русский',           display: 'RU',  rtl: false },
        { code: 'ar',    flag: '🇸🇦', name: 'العربية',           display: 'AR',  rtl: true  },
        { code: 'hi',    flag: '🇮🇳', name: 'हिन्दी',            display: 'HI',  rtl: false },
        { code: 'tr',    flag: '🇹🇷', name: 'Türkçe',            display: 'TR',  rtl: false },
        { code: 'nl',    flag: '🇳🇱', name: 'Nederlands',        display: 'NL',  rtl: false },
        { code: 'sv',    flag: '🇸🇪', name: 'Svenska',           display: 'SV',  rtl: false },
        { code: 'pl',    flag: '🇵🇱', name: 'Polski',            display: 'PL',  rtl: false },
        { code: 'uk',    flag: '🇺🇦', name: 'Українська',        display: 'UK',  rtl: false },
        { code: 'el',    flag: '🇬🇷', name: 'Ελληνικά',         display: 'EL',  rtl: false },
        { code: 'cs',    flag: '🇨🇿', name: 'Čeština',           display: 'CS',  rtl: false },
        { code: 'ro',    flag: '🇷🇴', name: 'Română',            display: 'RO',  rtl: false },
        { code: 'id',    flag: '🇮🇩', name: 'Bahasa Indonesia',  display: 'ID',  rtl: false },
        { code: 'th',    flag: '🇹🇭', name: 'ภาษาไทย',           display: 'TH',  rtl: false },
        { code: 'vi',    flag: '🇻🇳', name: 'Tiếng Việt',        display: 'VI',  rtl: false },
        { code: 'fi',    flag: '🇫🇮', name: 'Suomi',             display: 'FI',  rtl: false },
        { code: 'da',    flag: '🇩🇰', name: 'Dansk',             display: 'DA',  rtl: false },
        { code: 'no',    flag: '🇳🇴', name: 'Norsk',             display: 'NO',  rtl: false },
        { code: 'hu',    flag: '🇭🇺', name: 'Magyar',            display: 'HU',  rtl: false },
        { code: 'he',    flag: '🇮🇱', name: 'עברית',             display: 'HE',  rtl: true  },
        { code: 'fil',   flag: '🇵🇭', name: 'Filipino',          display: 'FIL', rtl: false },
    ];

    const ITEM_H   = 52;   // px — must match CSS
    const VIEWPORT = 260;  // px — must match CSS
    const CENTER   = Math.floor(VIEWPORT / (ITEM_H * 2)) * ITEM_H; 
    const LEN      = LANGUAGES.length;

    /* ── DOM refs ───────────────────────────────────────────── */
    const overlay   = document.getElementById('lang-wheel-overlay');
    const panel     = document.getElementById('lang-wheel-panel');
    const list      = document.getElementById('lw-list');
    const wrap      = document.getElementById('lw-wheel-wrap');
    const globeBtn  = document.getElementById('lang-globe-btn');
    const globeCode = globeBtn ? globeBtn.querySelector('.globe-code') : null;
    const closeBtn  = document.getElementById('lang-wheel-close');
    const applyBtn  = document.getElementById('lw-apply');
    const preview   = document.getElementById('lw-preview');

    if (!overlay || !list || !wrap || !globeBtn) {
        console.warn('Lang Wheel: Missing required DOM elements.');
        return;
    }

    /* ── State ──────────────────────────────────────────────── */
    let currentIdx  = 0;   
    let selectedIdx = 0;   
    let isOpen      = false;

    /* ── Helpers ────────────────────────────────────────────── */
    function mod(n, m) { return ((n % m) + m) % m; }

    function idxFromCode(code) {
        const i = LANGUAGES.findIndex(l => l.code === code);
        return i >= 0 ? i : 2; // default to 'en'
    }

    /* ── Build list DOM (3 cloned loops for infinite feel) ──── */
    function buildList() {
        list.innerHTML = '';
        for (let pass = 0; pass < 3; pass++) {
            LANGUAGES.forEach((lang, localIdx) => {
                const el = document.createElement('div');
                el.className = 'lw-item';
                el.dataset.idx = localIdx;
                el.innerHTML = `<span class="lw-flag">${lang.flag}</span><span class="lw-name">${lang.name}</span>`;
                el.addEventListener('click', () => { goTo(localIdx); });
                list.appendChild(el);
            });
        }
    }

    /* ── Position list so currentIdx is centred ─────────────── */
    function getTranslateY(idx) {
        const halfVP = VIEWPORT / 2;
        const halfItem = ITEM_H / 2;
        const baseY = LEN * ITEM_H; 
        return halfVP - halfItem - baseY - idx * ITEM_H;
    }

    function applyTranslate(animated) {
        if (!animated) {
            list.style.transition = 'none';
        } else {
            list.style.transition = 'transform 0.22s cubic-bezier(0.23, 1, 0.32, 1)';
        }
        list.style.transform = `translateY(${getTranslateY(currentIdx)}px)`;
        if (!animated) {
            void list.offsetHeight;
            list.style.transition = '';
        }
    }

    /* ── Update visual states of each item ──────────────────── */
    function updateItems() {
        const items = list.querySelectorAll('.lw-item');
        items.forEach((el) => {
            const localIdx = parseInt(el.dataset.idx, 10);
            const dist = localIdx - currentIdx;
            el.classList.toggle('lw-active', dist === 0);
            el.removeAttribute('data-dist');
            if (dist !== 0) el.setAttribute('data-dist', dist);
        });
        const lang = LANGUAGES[mod(currentIdx, LEN)];
        if (preview) preview.textContent = lang ? `${lang.flag}  ${lang.name}` : '';
    }

    /* ── Navigate to index ──────────────────────────────────── */
    function goTo(idx, animated = true) {
        currentIdx = mod(idx, LEN);
        applyTranslate(animated);
        updateItems();
    }

    /* ── Open / close ───────────────────────────────────────── */
    function openWheel() {
        if (isOpen) return;
        isOpen = true;
        currentIdx = selectedIdx;
        buildList();
        applyTranslate(false);
        updateItems();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeWheel() {
        if (!isOpen) return;
        isOpen = false;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* ── Apply selected language ────────────────────────────── */
    function applyLanguage() {
        selectedIdx = mod(currentIdx, LEN);
        const lang = LANGUAGES[selectedIdx];
        if (globeCode) globeCode.textContent = lang.display;
        document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
        if (typeof I18N !== 'undefined' && typeof I18N.setLanguage === 'function') {
            I18N.setLanguage(lang.code);
        } else {
            localStorage.setItem('lang', lang.code);
        }
        closeWheel();
    }

    /* ── Event Listeners ─────────────────────────────────────── */
    wrap.addEventListener('wheel', (e) => {
        e.preventDefault();
        const dir = e.deltaY > 0 ? 1 : -1;
        goTo(currentIdx + dir);
    }, { passive: false });

    let dragStartY = null;
    let dragStartIdx = null;

    function onDragStart(y) {
        dragStartY   = y;
        dragStartIdx = currentIdx;
        list.style.transition = 'none';
    }
    function onDragMove(y) {
        if (dragStartY === null) return;
        const dy   = y - dragStartY;
        const delta = -Math.round(dy / ITEM_H);
        const newIdx = mod(dragStartIdx + delta, LEN);
        if (newIdx !== currentIdx) {
            currentIdx = newIdx;
            list.style.transform = `translateY(${getTranslateY(currentIdx)}px)`;
            updateItems();
        }
    }
    function onDragEnd() {
        dragStartY   = null;
        dragStartIdx = null;
        list.style.transition = 'transform 0.22s cubic-bezier(0.23, 1, 0.32, 1)';
        applyTranslate(true);
    }

    wrap.addEventListener('mousedown',  (e) => { onDragStart(e.clientY); });
    window.addEventListener('mousemove', (e) => { if (dragStartY !== null) onDragMove(e.clientY); });
    window.addEventListener('mouseup',   ()  => { onDragEnd(); });

    wrap.addEventListener('touchstart', (e) => { onDragStart(e.touches[0].clientY); }, { passive: true });
    wrap.addEventListener('touchmove',  (e) => { onDragMove(e.touches[0].clientY); },  { passive: true });
    wrap.addEventListener('touchend',   ()  => { onDragEnd(); });

    document.addEventListener('keydown', (e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') { closeWheel(); return; }
        if (e.key === 'ArrowDown')  { e.preventDefault(); goTo(currentIdx + 1); }
        if (e.key === 'ArrowUp')    { e.preventDefault(); goTo(currentIdx - 1); }
        if (e.key === 'Enter')      { applyLanguage(); }
    });

    overlay.addEventListener('click', (e) => {
        if (!panel.contains(e.target)) closeWheel();
    });

    globeBtn.addEventListener('click', openWheel);
    if (closeBtn) closeBtn.addEventListener('click', closeWheel);
    if (applyBtn) applyBtn.addEventListener('click', applyLanguage);

    /* ── Init ───────────────────────────────────────────────── */
    (function init() {
        const saved = localStorage.getItem('lang') || 'en';
        selectedIdx = idxFromCode(saved);
        currentIdx  = selectedIdx;
        const lang  = LANGUAGES[selectedIdx];
        if (globeCode) globeCode.textContent = lang ? lang.display : 'EN';
        if (lang) document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
    })();

})();
