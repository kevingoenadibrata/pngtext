(() => {
  'use strict';

  // Google Fonts offered in the picker, grouped by category in the order shown.
  // `weight` is the default; `weights` are the ones Google Fonts serves for that family
  // (an unavailable weight makes the whole stylesheet request fail).

  const WEIGHT_NAMES = {
    100: 'Thin', 200: 'Extra light', 300: 'Light', 400: 'Regular', 500: 'Medium',
    600: 'Semibold', 700: 'Bold', 800: 'Extra bold', 900: 'Black',
  };
  const FONTS = [
    { family: 'DM Sans', weight: 700, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Plus Jakarta Sans', weight: 700, weights: [200, 300, 400, 500, 600, 700, 800], category: 'Sans serif' },
    { family: 'Google Sans', weight: 700, weights: [400, 500, 600, 700], category: 'Sans serif' },
    { family: 'Inter', weight: 700, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Roboto', weight: 700, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Open Sans', weight: 700, weights: [300, 400, 500, 600, 700, 800], category: 'Sans serif' },
    { family: 'Poppins', weight: 600, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Montserrat', weight: 700, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Lato', weight: 700, weights: [100, 300, 400, 700, 900], category: 'Sans serif' },
    { family: 'Nunito', weight: 800, weights: [200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Work Sans', weight: 600, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Manrope', weight: 700, weights: [200, 300, 400, 500, 600, 700, 800], category: 'Sans serif' },
    { family: 'Outfit', weight: 600, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Sans serif' },
    { family: 'Unbounded', weight: 700, weights: [200, 300, 400, 500, 600, 700, 800, 900], category: 'Wide' },
    { family: 'Encode Sans Expanded', weight: 700, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Wide' },
    { family: 'Lexend Zetta', weight: 600, weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], category: 'Wide' },
    { family: 'Krona One', weight: 400, weights: [400], category: 'Wide' },
    { family: 'Michroma', weight: 400, weights: [400], category: 'Wide' },
    { family: 'Syncopate', weight: 700, weights: [400, 700], category: 'Wide' },
    { family: 'Orbitron', weight: 700, weights: [400, 500, 600, 700, 800, 900], category: 'Wide' },
    { family: 'Dela Gothic One', weight: 400, weights: [400], category: 'Wide' },
    { family: 'Instrument Serif', weight: 400, weights: [400], category: 'Serif' },
    { family: 'Playfair Display', weight: 700, weights: [400, 500, 600, 700, 800, 900], category: 'Serif' },
    { family: 'DM Serif Display', weight: 400, weights: [400], category: 'Serif' },
    { family: 'Lora', weight: 600, weights: [400, 500, 600, 700], category: 'Serif' },
    { family: 'Merriweather', weight: 700, weights: [300, 400, 500, 600, 700, 800, 900], category: 'Serif' },
    { family: 'Libre Baskerville', weight: 400, weights: [400, 500, 600, 700], category: 'Serif' },
    { family: 'EB Garamond', weight: 600, weights: [400, 500, 600, 700, 800], category: 'Serif' },
    { family: 'Pirata One', weight: 400, weights: [400], category: 'Blackletter' },
    { family: 'DM Mono', weight: 500, weights: [300, 400, 500], category: 'Monospace' },
    { family: 'Roboto Mono', weight: 600, weights: [100, 200, 300, 400, 500, 600, 700], category: 'Monospace' },
    { family: 'JetBrains Mono', weight: 700, weights: [100, 200, 300, 400, 500, 600, 700, 800], category: 'Monospace' },
    { family: 'Space Mono', weight: 700, weights: [400, 700], category: 'Monospace' },
    { family: 'Special Elite', weight: 400, weights: [400], category: 'Monospace' },
    { family: 'VT323', weight: 400, weights: [400], category: 'Pixel' },
    { family: 'Pixelify Sans', weight: 400, weights: [400, 500, 600, 700], category: 'Pixel' },
    { family: 'Geist Pixel', weight: 400, weights: [400], category: 'Pixel' },
    { family: 'Silkscreen', weight: 400, weights: [400, 700], category: 'Pixel' },
    { family: 'Dancing Script', weight: 700, weights: [400, 500, 600, 700], category: 'Script' },
    { family: 'Meow Script', weight: 400, weights: [400], category: 'Script' },
    { family: 'Pinyon Script', weight: 400, weights: [400], category: 'Script' },
    { family: 'Parisienne', weight: 400, weights: [400], category: 'Script' },
    { family: 'Caveat', weight: 700, weights: [400, 500, 600, 700], category: 'Handwritten' },
    { family: 'Permanent Marker', weight: 400, weights: [400], category: 'Handwritten' },
    { family: 'Single Day', weight: 400, weights: [400], category: 'Handwritten' },
    { family: 'Nothing You Could Do', weight: 400, weights: [400], category: 'Handwritten' },
  ];

  const COLORS = ['#ffffff', '#000000', '#a1a1aa', '#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  // Text color presets in the Color tab, eight per group.
  const PRESET_GROUPS = [
    ['Basic', ['#ffffff', '#000000', '#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7']],
    ['Monochrome', ['#ffffff', '#e5e5e5', '#bdbdbd', '#8f8f8f', '#666666', '#404040', '#1f1f1f', '#000000']],
    ['Pastel', ['#ffd1dc', '#ffe5b4', '#fff5ba', '#c1f0c1', '#b5ead7', '#c7ceea', '#d5c6f5', '#f7c6e0']],
    ['Neon', ['#39ff14', '#ff073a', '#fe019a', '#00f0ff', '#fff01f', '#ff5f1f', '#bc13fe', '#04d9ff']],
    ['Sunset', ['#ff6b6b', '#ff8e53', '#ffb347', '#ffd166', '#f78fb3', '#c56cf0', '#6c5ce7', '#2d3561']],
    ['Autumn', ['#8b2500', '#b7410e', '#d2691e', '#e1a95f', '#c9a227', '#6b4423', '#7b3f00', '#556b2f']],
    ['Ocean', ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#caf0f8']],
    ['Forest', ['#081c15', '#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#d8f3dc']],
    ['Earth tones', ['#f5ebe0', '#e3d5ca', '#d5bdaf', '#b08968', '#9c6644', '#7f5539', '#6f4e37', '#3e2c23']],
    ['Retro', ['#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#264653', '#457b9d', '#a8dadc', '#f1faee']],
  ];

  // Preview-only backdrops (the PNG stays transparent), in the order the button cycles.
  const BACKDROPS = { checker: 'Transparent', light: 'Light', dark: 'Dark', mesh: 'Gradient mesh', shapes: 'Shapes', photo: 'Photo' };

  const STYLE_ACCENT_LABEL = {
    highlight: 'Box color',
    outline: 'Outline color',
    shadow: 'Shadow color',
    neon: 'Glow color',
  };

  const em = (v) => `${v.toFixed(2)} em`;
  const pct = (v) => `${Math.round(v * 100)}%`;
  const deg = (v) => `${v}°`;

  // Extra controls shown under each style. Lengths are in em (multiples of the font size).
  const STYLE_SLIDERS = {
    highlight: [
      { key: 'boxWidth', label: 'Box width', min: -0.3, max: 1, step: 0.01, format: em },
      { key: 'boxHeight', label: 'Box height', min: -0.3, max: 0.6, step: 0.01, format: em },
    ],
    outline: [
      { key: 'outlineThickness', label: 'Thickness', min: 0.02, max: 0.4, step: 0.01, format: em },
    ],
    shadow: [
      { key: 'shadowOpacity', label: 'Opacity', min: 0, max: 1, step: 0.01, format: pct },
      { key: 'shadowDistance', label: 'Distance', min: 0, max: 0.5, step: 0.01, format: em },
      // Direction the shadow falls: 0° right, 90° down, clockwise.
      { key: 'shadowAngle', label: 'Angle', min: 0, max: 359, step: 1, format: deg },
      { key: 'shadowSize', label: 'Size', min: 0, max: 0.5, step: 0.01, format: em },
    ],
    neon: [
      { key: 'glowOpacity', label: 'Opacity', min: 0, max: 1, step: 0.01, format: pct },
      { key: 'glowSize', label: 'Size', min: 0.1, max: 1.5, step: 0.01, format: em },
    ],
  };

  // Box corner radius in em; large is clamped to a pill by the box height.
  const BOX_RADIUS = { none: 0, sm: 0.1, md: 0.22, lg: 0.6 };

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
    weight: null, // null = the font's default weight
    boxWidth: 0.32,
    boxHeight: 0.12,
    boxRadius: 'md',
    outlineThickness: 0.14,
    shadowOpacity: 1,
    shadowDistance: 0.09,
    shadowAngle: 54,
    shadowSize: 0.12,
    glowOpacity: 1,
    glowSize: 0.6,
    panel: 'text',
    backdrop: 'checker',
  };

  const STORAGE_KEY = 'pngtext:v1';

  const $ = (id) => document.getElementById(id);
  const els = {
    canvas: $('canvas'),
    preview: $('preview'),
    bgToggle: $('bg-toggle'),
    text: $('text'),
    tabs: $('tabs'),
    fonts: $('fonts'),
    weight: $('weight'),
    weightOut: $('weight-out'),
    styles: $('styles'),
    textColors: $('text-colors'),
    picker: $('picker'),
    sv: $('sv'),
    svThumb: $('sv-thumb'),
    hue: $('hue'),
    hex: $('hex'),
    hexDot: $('hex-dot'),
    accentRow: $('accent-row'),
    accentLabel: $('accent-label'),
    accentColors: $('accent-colors'),
    styleSliders: $('style-sliders'),
    cornersRow: $('corners-row'),
    corners: $('corners'),
    align: $('align'),
    width: $('width'),
    spacing: $('spacing'),
    leading: $('leading'),
    widthOut: $('width-out'),
    spacingOut: $('spacing-out'),
    leadingOut: $('leading-out'),
    copy: $('copy'),
    share: $('share'),
    toast: $('toast'),
    presetName: $('preset-name'),
    savePreset: $('save-preset'),
    loadPreset: $('load-preset'),
    presetFile: $('preset-file'),
  };

  const state = loadState();

  // ---------- persistence ----------

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved.panel === 'layout') saved.panel = 'text'; // Layout merged into Text
      if (saved.font && !FONTS.some((f) => f.family === saved.font)) delete saved.font; // font was removed
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
    const families = FONTS.map((f) => `family=${encodeURIComponent(f.family).replace(/%20/g, '+')}:wght@${f.weights.join(';')}`).join('&');
    $('font-css').href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }

  function fontFor(family) {
    return FONTS.find((f) => f.family === family) || FONTS[0];
  }

  // The family plus the weight to render: the user's chosen weight, or the closest one
  // this family has, or its default when no weight was chosen.
  function currentFont() {
    const font = fontFor(state.font);
    if (state.weight == null) return font;
    const weight = font.weights.reduce((a, b) => (Math.abs(b - state.weight) < Math.abs(a - state.weight) ? b : a));
    return { ...font, weight };
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

  function withAlpha(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
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
  function render(source = state.text) {
    const font = currentFont();
    const text = source.trim() ? source.replace(/\s+$/, '') : ' ';
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
    // Vertical middle of the visible letters, relative to the baseline.
    const inkMid = ((probe.actualBoundingBoxDescent || 0) - (probe.actualBoundingBoxAscent || ascent)) / 2;
    // Low values overlap lines on purpose; the floor only keeps lines from collapsing.
    const lineH = Math.max(glyphH * state.leading, F * 0.1);

    const boxPadX = F * state.boxWidth;
    const boxPadY = F * state.boxHeight;
    // Room for shadows and glows to spread before cropping.
    let reach = 1.2;
    if (state.style === 'shadow') reach = Math.max(reach, state.shadowDistance + state.shadowSize * 2 + 0.2);
    if (state.style === 'neon') reach = Math.max(reach, state.glowSize * 2 + 0.2);
    const margin = F * reach;

    const contentH = lineH * (lines.length - 1) + glyphH;
    // Negative box padding (box tighter than the text) needs no extra canvas room.
    const roomX = Math.max(0, boxPadX);
    const roomY = Math.max(0, boxPadY);
    let w = Math.ceil(contentW + roomX * 2 + margin * 2);
    let h = Math.ceil(contentH + roomY * 2 + margin * 2);
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

    const originX = margin + roomX;
    const originY = margin + roomY;

    const xFor = (i) => {
      if (state.align === 'left') return originX;
      if (state.align === 'right') return originX + contentW - widths[i];
      return originX + (contentW - widths[i]) / 2;
    };
    const baselineFor = (i) => originY + i * lineH + ascent;

    if (state.style === 'highlight' && state.accent !== 'none') {
      ctx.fillStyle = state.accent;
      const radius = F * (BOX_RADIUS[state.boxRadius] ?? BOX_RADIUS.md);
      lines.forEach((line, i) => {
        if (!line.trim()) return;
        // Stretch boxes so adjacent lines touch, like the IG highlight style.
        // A negative height shrinks that floor too, opening gaps between lines.
        const bh = Math.max(glyphH + boxPadY * 2, lineH + 1 + Math.min(0, boxPadY * 2));
        const bw = widths[i] + boxPadX * 2;
        if (bw <= 0 || bh <= 0) return;
        const top = baselineFor(i) + inkMid - bh / 2;
        roundRect(ctx, xFor(i) - boxPadX, top, bw, bh, radius);
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
          ctx.lineWidth = F * state.outlineThickness;
          lines.forEach((line, i) => ctx.strokeText(line, xFor(i), baselineFor(i)));
        }
        drawFill();
        break;
      case 'shadow':
        if (state.accent !== 'none') {
          ctx.save();
          // Shadow params ignore the context transform, so apply `scale` by hand.
          const angle = (state.shadowAngle * Math.PI) / 180;
          const dist = F * state.shadowDistance * scale;
          ctx.shadowColor = withAlpha(state.accent, state.shadowOpacity);
          ctx.shadowBlur = F * state.shadowSize * scale;
          ctx.shadowOffsetX = Math.cos(angle) * dist;
          ctx.shadowOffsetY = Math.sin(angle) * dist;
          drawFill();
          ctx.restore();
        } else {
          drawFill();
        }
        break;
      case 'neon': {
        const glow = state.accent === 'none' ? state.color : state.accent;
        ctx.save();
        ctx.shadowColor = withAlpha(glow, state.glowOpacity);
        for (const blur of [1, 0.5, 0.2]) {
          ctx.shadowBlur = F * state.glowSize * blur * scale;
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

    await ensureFont(currentFont(), state.text);
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

  // Replays the "peeled sticker" lift on the preview.
  function lift() {
    els.canvas.classList.remove('lift');
    void els.canvas.offsetWidth;
    els.canvas.classList.add('lift');
  }

  async function copyPng() {
    // ClipboardItem must be created synchronously inside the tap handler (Safari),
    // so pass it the promise rather than awaiting the blob first.
    try {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') throw new Error('unsupported');
      const item = new ClipboardItem({ 'image/png': currentPng() });
      await navigator.clipboard.write([item]);
      lift();
      toast('Copied. In your story, tap and hold, then Paste');
    } catch (err) {
      // Older Chrome only accepts a Blob, not a Promise<Blob>.
      try {
        const blob = await currentPng();
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        lift();
        toast('Copied. In your story, tap and hold, then Paste');
      } catch {
        toast("This browser can't copy images. Use Save or share instead.", 3200);
      }
    }
  }

  async function sharePng() {
    let blob;
    try { blob = await currentPng(); } catch { toast("Couldn't render the PNG. Try editing the text again."); return; }
    shareFile(blob, fileName(), 'Saved PNG');
  }

  // Phones and tablets get the share sheet (straight to Photos/Instagram); desktops
  // just download, since a share popover there is an extra step.
  async function shareFile(blob, name, savedMessage) {
    const file = new File([blob], name, { type: 'image/png' });
    const touch = matchMedia('(pointer: coarse)').matches;
    if (touch && navigator.canShare && navigator.canShare({ files: [file] })) {
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
    toast(savedMessage);
  }

  // ---------- presets ----------

  // A preset is the look (everything but the text), carried in a link:
  //   <app url>#p=1.<base64url JSON [name, ...values in PRESET_KEYS order]>
  // The link goes in a QR code on a shareable card. Scanning it opens the app with the
  // preset applied; uploading the card decodes the same link.
  // Append new keys at the end only. Never reorder, or old cards decode wrong.
  const PRESET_KEYS = [
    'font', 'weight', 'style', 'color', 'accent', 'align', 'width', 'spacing', 'leading',
    'boxWidth', 'boxHeight', 'boxRadius', 'outlineThickness',
    'shadowOpacity', 'shadowDistance', 'shadowAngle', 'shadowSize', 'glowOpacity', 'glowSize',
  ];
  const STYLE_NAMES = { plain: 'Plain', highlight: 'Box', outline: 'Outline', shadow: 'Shadow', neon: 'Glow' };
  const HEX = /^#[0-9a-f]{6}$/i;

  // Preset cards show this pangram instead of the user's text, so every letter
  // of the preset's font is on the card.
  const SAMPLE_TEXT = 'The five boxing wizards jump quickly';
  const SITE_URL = 'https://text.kevingo.me';

  function presetUrl(name) {
    const json = JSON.stringify([name, ...PRESET_KEYS.map((k) => state[k])]);
    const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(json)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `${location.origin}${location.pathname}#p=1.${b64}`;
  }

  // Returns { name, patch } or null if the string isn't a preset this version understands.
  function parsePreset(str) {
    const m = /#p=1\.([\w-]+)/.exec(str);
    if (!m) return null;
    let values;
    try {
      const bin = atob(m[1].replace(/-/g, '+').replace(/_/g, '/'));
      values = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
    } catch {
      return null;
    }
    if (!Array.isArray(values) || typeof values[0] !== 'string') return null;

    const valid = {
      font: (v) => FONTS.some((f) => f.family === v),
      weight: (v) => v === null || Number.isFinite(v),
      style: (v) => v in STYLE_NAMES,
      color: (v) => HEX.test(v),
      accent: (v) => v === 'none' || HEX.test(v),
      align: (v) => ['left', 'center', 'right'].includes(v),
      boxRadius: (v) => v in BOX_RADIUS,
    };
    const patch = {};
    PRESET_KEYS.forEach((key, i) => {
      const v = values[i + 1];
      if (v === undefined) return;
      if (valid[key] ? valid[key](v) : Number.isFinite(v)) patch[key] = v;
    });
    return { name: values[0], patch };
  }

  function applyPreset(preset) {
    update(preset.patch);
    toast(`Applied preset “${preset.name}”`);
  }

  // A 1080×1350 card: the sample pangram in this look on the checker, then the
  // preset name, the site address, and a QR code linking back to the app.
  async function makePresetCard(name) {
    const W = 1080, H = 1350, STAGE = 960, PAD = 60;
    const font = currentFont();
    await Promise.all([
      ensureFont(font, SAMPLE_TEXT),
      document.fonts.load('600 64px "Schibsted Grotesk"'),
      document.fonts.load('500 24px "Martian Mono"'),
    ]).catch(() => {});

    const card = document.createElement('canvas');
    card.width = W;
    card.height = H;
    const ctx = card.getContext('2d');

    ctx.fillStyle = '#aaa5bb';
    ctx.fillRect(0, 0, W, STAGE);
    ctx.fillStyle = '#9d98af';
    for (let y = 0; y < STAGE; y += 40) {
      for (let x = (y / 40) % 2 ? 40 : 0; x < W; x += 80) ctx.fillRect(x, y, 40, 40);
    }
    const sample = render(SAMPLE_TEXT);
    const fit = Math.min((W - PAD * 2) / sample.width, (STAGE - PAD * 2) / sample.height, 1.5);
    const sw = sample.width * fit, sh = sample.height * fit;
    ctx.drawImage(sample, (W - sw) / 2, (STAGE - sh) / 2, sw, sh);

    ctx.fillStyle = '#f5f4fa';
    ctx.fillRect(0, STAGE, W, H - STAGE);

    // QR with its 4-module quiet zone on white.
    const qr = qrcode(0, 'M');
    qr.addData(presetUrl(name));
    qr.make();
    const n = qr.getModuleCount();
    const cell = Math.floor(300 / (n + 8));
    const qrSize = cell * (n + 8);
    const qx = W - PAD - qrSize, qy = STAGE + (H - STAGE - qrSize) / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qx, qy, qrSize, qrSize);
    ctx.fillStyle = '#17141f';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) ctx.fillRect(qx + (c + 4) * cell, qy + (r + 4) * cell, cell, cell);
      }
    }

    const textW = qx - PAD * 2;
    const fitText = (text, maxW) => {
      if (ctx.measureText(text).width <= maxW) return text;
      while (text && ctx.measureText(`${text}…`).width > maxW) text = text.slice(0, -1);
      return `${text}…`;
    };
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#6d6880';
    ctx.font = '500 24px "Martian Mono", monospace';
    ctx.fillText('PNG TEXT PRESET', PAD, STAGE + 84);
    ctx.fillStyle = '#17141f';
    ctx.font = '600 64px "Schibsted Grotesk", sans-serif';
    ctx.fillText(fitText(name, textW), PAD, STAGE + 168);
    ctx.fillStyle = '#3b2eff';
    ctx.font = '500 24px "Martian Mono", monospace';
    ctx.fillText(fitText(SITE_URL, textW), PAD, STAGE + 222);
    ctx.fillStyle = '#6d6880';
    ctx.font = '500 24px "Martian Mono", monospace';
    ctx.fillText(fitText('Scan with your camera to apply', textW), PAD, H - 64);

    return canvasToBlob(card);
  }

  async function savePreset() {
    const name = els.presetName.value.trim();
    if (!name) {
      els.presetName.focus();
      toast('Name your preset first');
      return;
    }
    let blob;
    try { blob = await makePresetCard(name); } catch { toast("Couldn't create the preset image. Try again."); return; }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30);
    shareFile(blob, `${slug || 'preset'}-preset.png`, 'Saved preset image');
  }

  // The QR reader is 130 KB, so it only loads when someone loads a preset.
  let jsQRReady = null;
  function loadJsQR() {
    jsQRReady ||= new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'vendor/jsQR.min.js';
      s.onload = () => resolve(window.jsQR);
      s.onerror = () => { jsQRReady = null; reject(new Error('jsQR failed to load')); };
      document.head.appendChild(s);
    });
    return jsQRReady;
  }

  async function loadPresetFromFile(file) {
    let code;
    try {
      const [jsQR, bitmap] = await Promise.all([loadJsQR(), createImageBitmap(file)]);
      const fit = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      const c = document.createElement('canvas');
      c.width = Math.round(bitmap.width * fit);
      c.height = Math.round(bitmap.height * fit);
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(bitmap, 0, 0, c.width, c.height);
      code = jsQR(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height);
    } catch {
      toast("Couldn't read that image. Try a different photo.");
      return;
    }
    if (!code) { toast('No QR code found. Try a clearer screenshot of the preset card.', 3200); return; }
    const preset = parsePreset(code.data);
    if (!preset) { toast("That QR code isn't a PNG Text preset.", 3200); return; }
    applyPreset(preset);
  }

  // ---------- UI ----------

  function setPressed(container, attr, value) {
    container.querySelectorAll(`[${attr}]`).forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute(attr) === value));
    });
  }

  function buildFontChips() {
    const frag = document.createDocumentFragment();
    const categories = [...new Set(FONTS.map((f) => f.category))];
    for (const category of categories) {
      const group = document.createElement('div');
      group.className = 'row';
      group.role = 'group';
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = category;
      group.setAttribute('aria-label', category);
      const chips = document.createElement('div');
      chips.className = 'chips';
      for (const f of FONTS.filter((x) => x.category === category)) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.role = 'option';
        b.dataset.font = f.family;
        b.textContent = f.family;
        b.style.fontFamily = `"${f.family}", sans-serif`;
        b.style.fontWeight = f.weight;
        chips.appendChild(b);
      }
      group.append(label, chips);
      frag.appendChild(group);
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
    container.addEventListener('click', (e) => {
      const b = e.target.closest('[data-color]');
      if (b) update({ [key]: b.dataset.color });
    });
    const custom = document.createElement('label');
    custom.className = 'swatch custom';
    custom.setAttribute('aria-label', 'Custom color');
    const input = document.createElement('input');
    input.type = 'color';
    custom.appendChild(input);
    container.appendChild(custom);
    input.addEventListener('input', () => update({ [key]: input.value }));
  }

  function buildPresetGroups() {
    for (const [name, colors] of PRESET_GROUPS) {
      const group = document.createElement('div');
      group.className = 'row';
      group.role = 'group';
      group.setAttribute('aria-label', name);
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = name;
      const swatches = document.createElement('div');
      swatches.className = 'swatches';
      for (const c of colors) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'swatch';
        b.dataset.color = c;
        b.setAttribute('aria-label', c);
        b.style.background = c;
        swatches.appendChild(b);
      }
      group.append(label, swatches);
      els.textColors.appendChild(group);
    }
    els.textColors.addEventListener('click', (e) => {
      const b = e.target.closest('[data-color]');
      if (b) update({ color: b.dataset.color });
    });
  }

  // ---------- color picker ----------

  function hexToHsv(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
    let h = 0;
    if (d) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
    }
    return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
  }

  function hsvToHex({ h, s, v }) {
    const f = (n) => {
      const k = (n + h / 60) % 6;
      const c = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
      return Math.round(c * 255).toString(16).padStart(2, '0');
    };
    return `#${f(5)}${f(3)}${f(1)}`;
  }

  // Kept separately from state.color so hue survives dragging to pure white/black.
  let hsv = { h: 0, s: 0, v: 1 };

  function setHsv(next) {
    hsv = { ...hsv, ...next };
    update({ color: hsvToHex(hsv) });
  }

  function syncPicker() {
    if (hsvToHex(hsv) !== state.color.toLowerCase()) {
      const next = hexToHsv(state.color);
      hsv = next.s && next.v ? next : { ...next, h: hsv.h };
    }
    els.picker.style.setProperty('--hue', hsv.h);
    els.svThumb.style.left = `${hsv.s * 100}%`;
    els.svThumb.style.top = `${(1 - hsv.v) * 100}%`;
    els.svThumb.style.background = state.color;
    els.sv.setAttribute('aria-valuetext', `Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`);
    els.hue.value = Math.round(hsv.h);
    els.hexDot.style.background = state.color;
    if (document.activeElement !== els.hex) els.hex.value = state.color.slice(1).toUpperCase();
  }

  function bindPicker() {
    const fromPointer = (e) => {
      const r = els.sv.getBoundingClientRect();
      const clamp = (x) => Math.min(1, Math.max(0, x));
      setHsv({ s: clamp((e.clientX - r.left) / r.width), v: clamp(1 - (e.clientY - r.top) / r.height) });
    };
    els.sv.addEventListener('pointerdown', (e) => {
      els.sv.setPointerCapture(e.pointerId);
      fromPointer(e);
    });
    els.sv.addEventListener('pointermove', (e) => {
      if (els.sv.hasPointerCapture(e.pointerId)) fromPointer(e);
    });
    els.sv.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 0.1 : 0.02;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
      if (!d) return;
      e.preventDefault();
      setHsv({ s: Math.min(1, Math.max(0, hsv.s + d[0])), v: Math.min(1, Math.max(0, hsv.v + d[1])) });
    });

    els.hue.addEventListener('input', () => setHsv({ h: Number(els.hue.value) }));

    els.hex.addEventListener('input', () => {
      let v = els.hex.value.replace(/[^0-9a-f]/gi, '');
      if (v.length === 3) v = v.replace(/./g, '$&$&');
      if (v.length === 6) update({ color: `#${v.toLowerCase()}` });
    });
    els.hex.addEventListener('blur', syncPicker);
  }

  // The weight slider steps through the weights this family actually has.
  function syncWeights() {
    const font = currentFont();
    const weights = fontFor(font.family).weights;
    els.weight.max = weights.length - 1;
    els.weight.value = weights.indexOf(font.weight);
    els.weight.disabled = weights.length === 1;
    els.weightOut.value = weights.length === 1
      ? `${WEIGHT_NAMES[font.weight]} only`
      : `${WEIGHT_NAMES[font.weight]} · ${font.weight}`;
  }

  function buildStyleSliders() {
    for (const [style, sliders] of Object.entries(STYLE_SLIDERS)) {
      for (const { key, label, min, max, step, format } of sliders) {
        const wrap = document.createElement('label');
        wrap.className = 'slider';
        wrap.dataset.styleFor = style;
        wrap.format = format;
        const head = document.createElement('span');
        head.className = 'slider-head';
        const out = document.createElement('output');
        out.htmlFor = key;
        head.append(label, ' ', out);
        const input = document.createElement('input');
        Object.assign(input, { type: 'range', id: key, min, max, step });
        input.addEventListener('input', () => update({ [key]: parseFloat(input.value) }));
        wrap.append(head, input);
        els.styleSliders.appendChild(wrap);
      }
    }
  }

  function syncUI() {
    if (els.text.value !== state.text) els.text.value = state.text;
    els.fonts.querySelectorAll('[data-font]').forEach((b) => {
      b.setAttribute('aria-selected', String(b.dataset.font === state.font));
    });
    setPressed(els.styles, 'data-style', state.style);
    setPressed(els.align, 'data-align', state.align);
    setPressed(els.corners, 'data-radius', state.boxRadius);
    els.cornersRow.hidden = state.style !== 'highlight';
    setPressed(els.textColors, 'data-color', state.color);
    setPressed(els.accentColors, 'data-color', state.accent);
    syncPicker();
    els.accentColors.querySelector('.custom').setAttribute('aria-pressed', String(state.accent !== 'none' && !COLORS.includes(state.accent)));

    const accentLabel = STYLE_ACCENT_LABEL[state.style];
    els.accentRow.hidden = !accentLabel;
    if (accentLabel) els.accentLabel.textContent = accentLabel;

    els.width.value = state.width;
    els.spacing.value = state.spacing;
    els.leading.value = state.leading;
    els.widthOut.value = `${state.width} em`;
    els.spacingOut.value = `${Math.round(state.spacing * 100)}%`;
    els.leadingOut.value = `${state.leading.toFixed(2)}×`;

    for (const label of els.styleSliders.children) {
      label.hidden = label.dataset.styleFor !== state.style;
      const input = label.querySelector('input');
      input.value = state[input.id];
      label.querySelector('output').value = label.format(state[input.id]);
    }

    syncWeights();
    syncTabs();
    syncBackdrop();
  }

  function syncBackdrop() {
    if (!(state.backdrop in BACKDROPS)) state.backdrop = 'checker';
    els.preview.dataset.bg = state.backdrop;
    els.bgToggle.title = els.bgToggle.ariaLabel = `Preview backdrop: ${BACKDROPS[state.backdrop]}. Tap to change.`;
  }

  function syncTabs() {
    els.tabs.querySelectorAll('[role="tab"]').forEach((t) => {
      const on = t.dataset.panel === state.panel;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  function update(patch) {
    Object.assign(state, patch);
    saveState();
    syncUI();
    scheduleRender();
  }

  // Switching panels changes nothing in the PNG, so skip the re-render.
  function showPanel(panel) {
    state.panel = panel;
    saveState();
    syncTabs();
  }

  function bindControls() {
    els.text.addEventListener('input', () => update({ text: els.text.value }));

    const tabs = [...els.tabs.querySelectorAll('[role="tab"]')];
    els.tabs.addEventListener('click', (e) => {
      const t = e.target.closest('[role="tab"]');
      if (!t) return;
      showPanel(t.dataset.panel);
      if (t.dataset.panel === 'text') els.text.focus();
    });
    els.tabs.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      const i = tabs.findIndex((t) => t.dataset.panel === state.panel);
      const next = tabs[(i + step + tabs.length) % tabs.length];
      showPanel(next.dataset.panel);
      next.focus();
      e.preventDefault();
    });

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

    els.weight.addEventListener('input', () => {
      update({ weight: fontFor(state.font).weights[Number(els.weight.value)] });
    });

    els.corners.addEventListener('click', (e) => {
      const b = e.target.closest('[data-radius]');
      if (b) update({ boxRadius: b.dataset.radius });
    });

    els.align.addEventListener('click', (e) => {
      const b = e.target.closest('[data-align]');
      if (b) update({ align: b.dataset.align });
    });

    for (const key of ['width', 'spacing', 'leading']) {
      els[key].addEventListener('input', () => update({ [key]: parseFloat(els[key].value) }));
    }

    els.bgToggle.addEventListener('click', () => {
      const keys = Object.keys(BACKDROPS);
      const next = keys[(keys.indexOf(state.backdrop) + 1) % keys.length];
      state.backdrop = next;
      saveState();
      syncBackdrop();
      toast(`Backdrop: ${BACKDROPS[next]}`, 1200);
    });

    els.copy.addEventListener('click', copyPng);
    els.savePreset.addEventListener('click', savePreset);
    els.presetName.addEventListener('keydown', (e) => { if (e.key === 'Enter') savePreset(); });
    els.loadPreset.addEventListener('click', () => els.presetFile.click());
    els.presetFile.addEventListener('change', () => {
      const file = els.presetFile.files[0];
      els.presetFile.value = '';
      if (file) loadPresetFromFile(file);
    });
    els.share.addEventListener('click', sharePng);

    // Fonts arriving late (slow network) should re-render the preview.
    document.fonts.addEventListener?.('loadingdone', scheduleRender);
  }

  // ---------- boot ----------

  loadFontCss();
  buildFontChips();
  buildStyleSliders();
  buildPresetGroups();
  bindPicker();
  buildSwatches(els.accentColors, 'accent', { allowNone: true });
  bindControls();
  syncUI();
  scheduleRender();

  // Opened from a preset QR code: apply it, then drop the hash so a reload doesn't reapply.
  if (location.hash.startsWith('#p=')) {
    const preset = parsePreset(location.hash);
    history.replaceState(null, '', location.pathname + location.search);
    if (preset) applyPreset(preset);
    else toast("That preset link is damaged or from a newer version.", 3200);
  }

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
