/* ===== ABN Digital · Brand Guidelines ===== */
(function () {
  'use strict';

  /* ---- Theme (light / dark) ---- */
  const root = document.documentElement;
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-img').forEach(function (img) {
      const src = theme === 'light' ? img.dataset.srcLight : img.dataset.srcDark;
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
    });
    const tt = document.getElementById('themeToggle');
    if (tt) tt.setAttribute('aria-label', theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
  }
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('abn-theme') || 'light'; } catch (e) {}
  applyTheme(savedTheme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('abn-theme', next); } catch (e) {}
    });
  }

  /* ---- Brand prompts (ES / EN) ---- */
  const PROMPTS = {
    es:
`Diseñá / escribí respetando la identidad de marca de ABN Digital.

SOBRE LA MARCA
ABN Digital impulsa el crecimiento digital de las empresas integrando marketing, data y tecnología, transformando atención en resultados medibles. Claim: "Impulsando el crecimiento digital".

COLORES
- Tech Green #3ABD96 — color PRINCIPAL. Úsalo como acento: datos, CTAs, destacados, detalles. Nunca como fondo de grandes bloques de texto.
- Carbon Black #232323 — neutro de núcleo, fondos oscuros y texto.
- Deep Blue #1B1837 — neutro, fondos, transmite confianza.
- Ash White #F9F7F2 — neutro claro, fondos claros y texto sobre oscuro.
Regla: Ash White, Carbon Black o Deep Blue como base (≥70% de la composición); Tech Green como acento. Siempre buen contraste y legibilidad.

TIPOGRAFÍA
Montserrat en todo. Títulos: Montserrat Regular/SemiBold. Cuerpo: Montserrat Light. Destacados: SemiBold. Sin sombras ni tracking exagerado.

TONO DE VOZ
Técnico pero humano. Claro, preciso, sin complejidad innecesaria; transmite confianza, experiencia e innovación. Español neutro / LATAM.

ESTILO VISUAL
Limpio, tecnológico y moderno. Fondos oscuros con acentos verdes, gradientes sutiles de la paleta, mucho aire. Líneas verticales tipo "flujo de datos" como textura sutil.

EVITAR
Distorsionar el logo o cambiarle el color, sombras/efectos, fondos cargados, bajo contraste, mezclar otras fuentes.`,
    en:
`Design / write following the brand identity of ABN Digital.

ABOUT THE BRAND
ABN Digital drives the digital growth of companies by integrating marketing, data and technology, turning attention into measurable results. Claim: "Driving digital growth".

COLORS
- Tech Green #3ABD96 — PRIMARY color. Use it as an accent: data, CTAs, highlights, details. Never as the background of large text blocks.
- Carbon Black #232323 — core neutral, dark backgrounds and text.
- Deep Blue #1B1837 — neutral, backgrounds, conveys trust.
- Ash White #F9F7F2 — light neutral, light backgrounds and text on dark.
Rule: Ash White, Carbon Black or Deep Blue as the base (≥70% of the composition); Tech Green as accent. Always strong contrast and legibility.

TYPOGRAPHY
Montserrat everywhere. Headings: Montserrat Regular/SemiBold. Body: Montserrat Light. Highlights: SemiBold. No shadows or exaggerated tracking.

TONE OF VOICE
Technical yet human. Clear, precise, free of unnecessary complexity; conveys trust, expertise and innovation.

VISUAL STYLE
Clean, technological and modern. Dark backgrounds with green accents, subtle gradients from the palette, plenty of whitespace. Vertical "data-flow" lines as a subtle texture.

AVOID
Distorting the logo or changing its color, shadows/effects, busy backgrounds, low contrast, mixing in other fonts.`
  };

  let currentLang = 'es';
  const promptEl = document.getElementById('promptText');
  function renderPrompt() { if (promptEl) promptEl.textContent = PROMPTS[currentLang]; }
  renderPrompt();

  document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentLang = btn.dataset.lang;
      document.querySelectorAll('.lang-toggle__btn').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      renderPrompt();
    });
  });

  /* ---- Clipboard ---- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg + ' ✓';
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 1600);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); resolve(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      let text = btn.dataset.copy;
      if (btn.dataset.copyTarget) {
        const t = document.querySelector(btn.dataset.copyTarget);
        text = t ? t.textContent : '';
      }
      copyText(text).then(function () {
        const original = btn.textContent;
        btn.classList.add('is-copied');
        if (!btn.dataset.copyTarget) btn.textContent = 'Copiado ✓';
        showToast(btn.dataset.copyTarget ? 'Prompt copiado' : 'Copiado');
        setTimeout(function () { btn.classList.remove('is-copied'); if (!btn.dataset.copyTarget) btn.textContent = original; }, 1400);
      }).catch(function () { showToast('No se pudo copiar'); });
    });
  });

  /* ---- Mobile nav ---- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---- Reveal on scroll ---- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section').forEach(function (s) { io.observe(s); });
  } else {
    document.querySelectorAll('.section').forEach(function (s) { s.classList.add('is-in'); });
  }
})();
