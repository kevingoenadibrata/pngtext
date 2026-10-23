# PNG Text

Instagram Stories only ships a handful of fonts. PNG Text renders your text in
any of ~24 Google Fonts as a **transparent PNG** that you copy and paste
straight into a story as a sticker.

## Use

1. Type your text, pick a font, style and colors.
2. Tap **Copy PNG**.
3. In Instagram, open your story, tap and hold on the canvas → **Paste**
   (on iOS IG usually also offers an "Add sticker" prompt for the copied image).

If copying isn't supported by your browser, **Share / Save** opens the share
sheet (send it straight to Instagram) or downloads the PNG.

## Features

- Mobile-first UI, installable to the home screen (PWA, works offline after first load)
- Styles: plain, IG-style box highlight, outline, drop shadow, neon glow
- Text/accent colors with a custom color picker
- Alignment, wrap width, letter spacing, line height
- High-res output (150px font size), auto-cropped to the text, transparent background
- Settings are remembered between visits

## Run locally

It's a static site with no build step:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Clipboard image writes require a secure context (HTTPS or `localhost`), so
deploy it to any static host with HTTPS (GitHub Pages, Netlify, Vercel,
Cloudflare Pages).
