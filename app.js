(() => {
  'use strict';

  // Google Fonts offered in the picker. `weight` is the single weight we load and render with.
  const FONTS = [
    { family: 'Instrument Serif', weight: 400 },
    { family: 'Playfair Display', weight: 700 },
    { family: 'DM Serif Display', weight: 400 },
    { family: 'Fraunces', weight: 700 },
    { family: 'Abril Fatface', weight: 400 },
    { family: 'Bebas Neue', weight: 400 },
    { family: 'Anton', weight: 400 },
    { family: 'Archivo Black', weight: 400 },
    { family: 'Space Grotesk', weight: 700 },
    { family: 'Syne', weight: 800 },
    { family: 'Unbounded', weight: 700 },
    { family: 'Bungee', weight: 400 },
    { family: 'Righteous', weight: 400 },
    { family: 'Shrikhand', weight: 400 },
    { family: 'Pacifico', weight: 400 },
    { family: 'Lobster', weight: 400 },
    { family: 'Caveat', weight: 700 },
    { family: 'Dancing Script', weight: 700 },
    { family: 'Permanent Marker', weight: 400 },
    { family: 'Monoton', weight: 400 },
    { family: 'Space Mono', weight: 700 },
    { family: 'Press Start 2P', weight: 400 },
    { family: 'Italiana', weight: 400 },
    { family: 'Cormorant Garamond', weight: 600 },
  ];

  const COLORS = ['#ffffff', '#000000', '#a1a1aa', '#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  const STYLE_ACCENT_LABEL = {
    highlight: 'Box color',
    outline: 'Outline color',
    shadow: 'Shadow color',
    neon: 'Glow color',
  };

  // Render size: big enough to stay crisp when resized up in an IG story (1080px wide).
  const FONT_PX = 150;
  // iOS Safari refuses canvases above ~16.7M pixels.
  const MAX_CANVAS_PIXELS = 16_000_000;

  const DEFAULTS = {
    text: 'hello world',
    font: 'Instrument Serif',
    style: 'plain',
    color: '#ffffff',
    accent: '#000000',
    align: 'center',
    width: 9,
    spacing: 0,
    leading: 1.15,
  };

  const STORAGE_KEY = 'pngtext:v1';

  const $ = (id) => document.getElementById(id);
  const els = {
    canvas: $('canvas'),
    preview: $('preview'),
    bgToggle: $('bg-toggle'),
    text: $('text'),
    fonts: $('fonts'),
    styles: $('styles'),
    textColors: $('text-colors'),
    accentRow: $('accent-row'),
    accentLabel: $('accent-label'),
    accentColors: $('accent-colors'),
    align: $('align'),
    width: $('width'),
    spacing: $('spacing'),
    leading: $('leading'),
    copy: $('copy'),
    share: $('share'),
    toast: $('toast'),
  };

  const state = loadState();

  // ---------- persistence ----------

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...DEFAULTS, ...saved };
    } catch {
      return { ...DEFAULTS };
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* private mode */ }
  }

  // ---------- fonts ----------

  function loadFontCss() {
    const families = FONTS.map((f) => `family=${encodeURIComponent(f.family).replace(/%20/g, '+')}:wght@${f.weight}`).join('&');
    $('font-css').href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }

  function fontFor(family) {
    return FONTS.find((f) => f.family === family) || FONTS[0];
  }

  function cssFont(font, px) {
    return `${font.weight} ${px}px "${font.family}", sans-serif`;
  }

  async function ensureFont(font, text) {
    try {
      await document.fonts.load(cssFont(font, FONT_PX), text || 'A');
    } catch { /* fall back to whatever is available */ }
  }

  // ---------- layout ----------

  function wrapLines(ctx, text, maxWidth) {
    const lines = [];
    for (const paragraph of text.split('\n')) {
      const words = paragraph.split(/(\s+)/).filter((w) => w.length);
      if (!words.length) { lines.push(''); continue; }
      let line = '';
      for (const word of words) {
        const candidate = line + word;
        if (line && ctx.measureText(candidate.trimEnd()).width > maxWidth && word.trim()) {
          lines.push(line.trimEnd());
          line = word.trimStart();
        } else {
          line = candidate;
        }
      }
      lines.push(line.trimEnd());
    }
    return lines;
  }

  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ---------- rendering ----------

  // Draws onto an oversized scratch canvas, then crops to the visible pixels so
  // swashy script fonts and glows never get clipped.
  function render() {
    const font = fontFor(state.font);
    const text = state.text.trim() ? state.text.replace(/\s+$/, '') : ' ';
    const F = FONT_PX;

    const scratch = document.createElement('canvas');
    const ctx = scratch.getContext('2d');
    ctx.font = cssFont(font, F);
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${state.spacing * F}px`;

    const maxWidth = state.width * F;
    const lines = wrapLines(ctx, text, maxWidth);
    const widths = lines.map((l) => ctx.measureText(l).width);
    const contentW = Math.max(1, ...widths);

    const probe = ctx.measureText('Hg');
    const ascent = probe.fontBoundingBoxAscent || F * 0.8;
    const descent = probe.fontBoundingBoxDescent || F * 0.2;
    const glyphH = ascent + descent;
    const lineH = Math.max(glyphH * state.leading, F * 0.5);

    const boxPadX = F * 0.32;
    const boxPadY = F * 0.12;
    const margin = F * 1.2;

    const contentH = lineH * (lines.length - 1) + glyphH;
    let w = Math.ceil(contentW + boxPadX * 2 + margin * 2);
    let h = Math.ceil(contentH + boxPadY * 2 + margin * 2);
    let scale = 1;
    if (w * h > MAX_CANVAS_PIXELS) {
      scale = Math.sqrt(MAX_CANVAS_PIXELS / (w * h));
      w = Math.floor(w * scale);
      h = Math.floor(h * scale);
    }
    scratch.width = w;
    scratch.height = h;

    // Resizing resets context state.
    ctx.scale(scale, scale);
    ctx.font = cssFont(font, F);
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${state.spacing * F}px`;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    const originX = margin + boxPadX;
    const originY = margin + boxPadY;

    const xFor = (i) => {
      if (state.align === 'left') return originX;
      if (state.align === 'right') return originX + contentW - widths[i];
      return originX + (contentW - widths[i]) / 2;
    };
    const baselineFor = (i) => originY + i * lineH + ascent;

    if (state.style === 'highlight' && state.accent !== 'none') {
      ctx.fillStyle = state.accent;
      const radius = F * 0.22;
      lines.forEach((line, i) => {
        if (!line.trim()) return;
        const top = originY + i * lineH - boxPadY;
        // Stretch boxes so adjacent lines touch, like the IG highlight style.
        const bh = Math.max(glyphH + boxPadY * 2, lineH + 1);
        roundRect(ctx, xFor(i) - boxPadX, top, widths[i] + boxPadX * 2, bh, radius);
        ctx.fill();
      });
    }

    const drawFill = () => {
      ctx.fillStyle = state.color;
      lines.forEach((line, i) => ctx.fillText(line, xFor(i), baselineFor(i)));
    };

    switch (state.style) {
      case 'outline':
        if (state.accent !== 'none') {
          ctx.strokeStyle = state.accent;
          ctx.lineWidth = F * 0.14;
          lines.forEach((line, i) => ctx.strokeText(line, xFor(i), baselineFor(i)));
        }
        drawFill();
        break;
      case 'shadow':
        if (state.accent !== 'none') {
          ctx.save();
          ctx.shadowColor = state.accent;
          ctx.shadowBlur = F * 0.12 * scale;
          ctx.shadowOffsetX = F * 0.05 * scale;
          ctx.shadowOffsetY = F * 0.07 * scale;
          drawFill();
          ctx.restore();
        } else {
          drawFill();
        }
        break;
      case 'neon': {
        const glow = state.accent === 'none' ? state.color : state.accent;
        ctx.save();
        ctx.shadowColor = glow;
        for (const blur of [0.6, 0.3, 0.12]) {
          ctx.shadowBlur = F * blur * scale;
          drawFill();
        }
        ctx.restore();
        drawFill();
        break;
      }
      default:
        drawFill();
    }

    return cropToContent(scratch, Math.round(F * 0.08 * scale));
  }

  function cropToContent(src, pad) {
    const { width: w, height: h } = src;
    const data = src.getContext('2d').getImageData(0, 0, w, h).data;
    let top = h, left = w, right = -1, bottom = -1;
    for (let y = 0; y < h; y++) {
      const row = y * w * 4;
      for (let x = 0; x < w; x++) {
        if (data[row + x * 4 + 3] > 2) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          bottom = y;
        }
      }
    }
    const out = document.createElement('canvas');
    if (right < 0) { out.width = out.height = 1; return out; }
    left = Math.max(0, left - pad);
    top = Math.max(0, top - pad);
    right = Math.min(w - 1, right + pad);
    bottom = Math.min(h - 1, bottom + pad);
    out.width = right - left + 1;
    out.height = bottom - top + 1;
    out.getContext('2d').drawImage(src, left, top, out.width, out.height, 0, 0, out.width, out.height);
    return out;
  }

  // ---------- render scheduling + PNG cache ----------

  let renderToken = 0;
  let pngPromise = null; // resolves to the Blob for the current state

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG encoding failed'))), 'image/png');
    });
  }

  let rafId = 0;
  function scheduleRender() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(doRender);
  }

  async function doRender() {
    const token = ++renderToken;
    let resolveBlob, rejectBlob;
    // Expose a pending promise right away so a tap on Copy mid-render still gets this state.
    pngPromise = new Promise((res, rej) => { resolveBlob = res; rejectBlob = rej; });
    pngPromise.catch(() => {});

    await ensureFont(fontFor(state.font), state.text);
    if (token !== renderToken) { pngPromise.then(resolveBlob, rejectBlob); return; }

    const out = render();
    const view = els.canvas;
    view.width = out.width;
    view.height = out.height;
    view.getContext('2d').drawImage(out, 0, 0);
    canvasToBlob(out).then(resolveBlob, rejectBlob);
  }

  function currentPng() {
    return pngPromise || Promise.reject(new Error('Nothing rendered yet'));
  }

  // ---------- actions ----------

  let toastTimer = 0;
  function toast(msg, ms = 2600) {
    els.toast.textContent = msg;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), ms);
  }

  function fileName() {
    const slug = state.text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30);
    return `${slug || 'text'}.png`;
  }

  async function copyPng() {
    // ClipboardItem must be created synchronously inside the tap handler (Safari),
    // so pass it the promise rather than awaiting the blob first.
    try {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') throw new Error('unsupported');
      const item = new ClipboardItem({ 'image/png': currentPng() });
      await navigator.clipboard.write([item]);
      toast('Copied! In your IG story, tap and hold → Paste');
    } catch (err) {
      // Older Chrome only accepts a Blob, not a Promise<Blob>.
      try {
        const blob = await currentPng();
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        toast('Copied! In your IG story, tap and hold → Paste');
      } catch {
        toast("Couldn't copy here — use Share / Save instead", 3200);
      }
    }
  }

  async function sharePng() {
    let blob;
    try { blob = await currentPng(); } catch { toast('Render failed'); return; }
    const file = new File([blob], fileName(), { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    toast('Saved PNG');
  }

  // ---------- UI ----------

  function setPressed(container, attr, value) {
    container.querySelectorAll(`[${attr}]`).forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute(attr) === value));
    });
  }

  function buildFontChips() {
    const frag = document.createDocumentFragment();
    for (const f of FONTS) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.role = 'option';
      b.dataset.font = f.family;
      b.textContent = f.family;
      b.style.fontFamily = `"${f.family}", sans-serif`;
      b.style.fontWeight = f.weight;
      frag.appendChild(b);
    }
    els.fonts.appendChild(frag);
    els.fonts.addEventListener('click', (e) => {
      const b = e.target.closest('[data-font]');
      if (!b) return;
      update({ font: b.dataset.font });
    });
  }

  function buildSwatches(container, key, { allowNone }) {
    const values = allowNone ? ['none', ...COLORS] : COLORS;
    for (const c of values) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'swatch' + (c === 'none' ? ' none' : '');
      b.dataset.color = c;
      b.setAttribute('aria-label', c === 'none' ? 'No color' : c);
      if (c !== 'none') b.style.background = c;
      container.appendChild(b);
    }
    const custom = document.createElement('label');
    custom.className = 'swatch custom';
    custom.setAttribute('aria-label', 'Custom color');
    const input = document.createElement('input');
    input.type = 'color';
    custom.appendChild(input);
    container.appendChild(custom);

    container.addEventListener('click', (e) => {
      const b = e.target.closest('[data-color]');
      if (b) update({ [key]: b.dataset.color });
    });
    input.addEventListener('input', () => update({ [key]: input.value }));
  }

  function syncUI() {
    if (els.text.value !== state.text) els.text.value = state.text;
    els.fonts.querySelectorAll('[data-font]').forEach((b) => {
      b.setAttribute('aria-selected', String(b.dataset.font === state.font));
    });
    setPressed(els.styles, 'data-style', state.style);
    setPressed(els.align, 'data-align', state.align);
    setPressed(els.textColors, 'data-color', state.color);
    setPressed(els.accentColors, 'data-color', state.accent);
    els.textColors.querySelector('.custom').setAttribute('aria-pressed', String(!COLORS.includes(state.color)));
    els.accentColors.querySelector('.custom').setAttribute('aria-pressed', String(state.accent !== 'none' && !COLORS.includes(state.accent)));

    const accentLabel = STYLE_ACCENT_LABEL[state.style];
    els.accentRow.hidden = !accentLabel;
    if (accentLabel) els.accentLabel.textContent = accentLabel;

    els.width.value = state.width;
    els.spacing.value = state.spacing;
    els.leading.value = state.leading;
  }

  function update(patch) {
    Object.assign(state, patch);
    saveState();
    syncUI();
    scheduleRender();
  }

  function autoGrow() {
    els.text.style.height = 'auto';
    els.text.style.height = `${els.text.scrollHeight + 2}px`;
  }

  function bindControls() {
    els.text.addEventListener('input', () => { autoGrow(); update({ text: els.text.value }); });

    els.styles.addEventListener('click', (e) => {
      const b = e.target.closest('[data-style]');
      if (!b) return;
      const style = b.dataset.style;
      const patch = { style };
      // Pick a sensible accent when the current one would be invisible against the text.
      if (style !== 'plain' && (state.accent === state.color || state.accent === 'none')) {
        patch.accent = state.color === '#000000' ? '#ffffff' : '#000000';
      }
      if (style === 'neon' && state.accent === '#000000') patch.accent = '#ffffff';
      update(patch);
    });

    els.align.addEventListener('click', (e) => {
      const b = e.target.closest('[data-align]');
      if (b) update({ align: b.dataset.align });
    });

    for (const key of ['width', 'spacing', 'leading']) {
      els[key].addEventListener('input', () => update({ [key]: parseFloat(els[key].value) }));
    }

    const backgrounds = ['gray', 'checker', 'light', 'dark'];
    els.bgToggle.addEventListener('click', () => {
      const i = backgrounds.indexOf(els.preview.dataset.bg);
      els.preview.dataset.bg = backgrounds[(i + 1) % backgrounds.length];
    });

    els.copy.addEventListener('click', copyPng);
    els.share.addEventListener('click', sharePng);

    // Fonts arriving late (slow network) should re-render the preview.
    document.fonts.addEventListener?.('loadingdone', scheduleRender);
  }

  // ---------- boot ----------

  loadFontCss();
  buildFontChips();
  buildSwatches(els.textColors, 'color', { allowNone: false });
  buildSwatches(els.accentColors, 'accent', { allowNone: true });
  bindControls();
  syncUI();
  autoGrow();
  scheduleRender();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
