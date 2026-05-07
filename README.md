# gorkemergune.github.io

Personal site — portfolio, notes, roadmap.

## Stack
- Vite + React 18
- lucide-react (icons)
- Instrument Serif / Instrument Sans / JetBrains Mono (Google Fonts, loaded via CSS)

## Dev
```bash
npm install
npm run dev        # local dev server
npm run build      # outputs /dist
npm run preview    # preview the build locally
```

## Deploy
Automatic via GitHub Actions on every push to `main`.
See `.github/workflows/deploy.yml`.

## Structure
```
src/
  main.jsx    # React entry
  App.jsx     # the whole site — edit this
index.html    # Vite entry
```

All content arrays (`journey`, `focus`, `roadmap`, `notes`) live at the top of `App.jsx`.
