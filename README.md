# Linqoria Landing

This is a simple static landing page for Linqoria. It is intentionally lightweight and uses the project theme colors.

Preview locally:

```bash
# from repository root
cd landing
python -m http.server 3000
# then open http://localhost:3000
```

Files:

- `index.html` — landing page
- `styles.css` — styles using Linqoria palette
- `script.js` — minimal interactivity (mobile nav, contact form local storage)

Notes:

- The contact form stores signups in `localStorage` and shows a simple confirmation. Replace with your backend endpoint when ready.
- Images and assets are placeholders — swap in branded imagery as needed.
