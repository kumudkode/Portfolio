# Projects Integration Guide

This guide explains how portfolio showcases projects, including standalone HTML pages inside the `projects/` folder, and how to deploy everything on GitHub Pages.

---

## Overview

- The projects shown on `projects.html` are driven by `data/projects.json`.
- The loader at `assets/projectLoader.js` reads two arrays from this JSON:
  - `projects`: regular project entries
  - `extraPages`: additional entries that point to standalone HTML files (e.g., `projects/a.html`).
- Both arrays are merged and sorted by `order` and rendered automatically.

---

## JSON Schema

Each entry in `projects` or `extraPages` follows this shape:

```json
{
  "id": 7,
  "name": "Project Title",
  "description": "Short description for the card.",
  "category": ["frontend"],
  "tech": ["HTML5", "CSS"],
  "github": "https://github.com/your/repo", // optional
  "live": "projects/your-file.html", // internal page or external URL
  "featured": false, // true to show on the home page list
  "order": 7 // lower shows earlier
}
```

Notes:

- `live` can be an external URL (e.g., GitHub Pages demo) or an internal path (e.g., `projects/a.html`).
- `featured: true` makes it show up in the home page "Selected Works" list.
- The Projects grid shows GitHub and Live icons automatically when links are present.

---

## Show HTML pages from the `projects/` folder

To showcase an HTML file (e.g., `projects/new-demo.html`) on Projects page:

1. Place HTML file in the `projects/` folder.
2. Add an entry in `data/projects.json` under `extraPages` (or `projects`):

```json
{
  "id": 13,
  "name": "New Demo",
  "description": "Standalone HTML page hosted inside projects/new-demo.html.",
  "category": ["frontend"],
  "tech": ["HTML5", "CSS"],
  "github": "",
  "live": "projects/new-demo.html",
  "featured": false,
  "order": 13
}
```

3. Save the file. Your new page will appear automatically in `projects.html`.

Behavior:

- On the Projects grid, the "Live" icon opens links in a new tab (including internal `projects/*.html`).
- On the Home page ("Selected Works"), featured items open external links in a new tab and internal links in the same tab by default.
  - If you want internal links to also open in a new tab from the Home page, we can adjust the loader logic.

---

## Optional: Card thumbnail previews

You can add visual previews (thumbnails) above titles by introducing a `cover` field (e.g., `"cover": "projects/new-demo-cover.jpg"`) and lightly extending the loader to render images. If you want this, let me know and I’ll wire it in.

---

## Deploying to GitHub Pages

1. Push your repository to GitHub.
2. In your repo: Settings → Pages → Source: select `main` and the appropriate folder (`/root`).
3. GitHub Pages will publish your site at:
   - User/Org site: `https://<username>.github.io/`
   - Project site: `https://<username>.github.io/<repo>/`
4. Your internal project pages will be available at:
   - `https://<username>.github.io/<repo>/projects/a.html`

Tip: Always use relative paths like `projects/a.html` inside your JSON and HTML so they work reliably on Pages.

---

## Local testing (required for JSON fetch)

Fetching `data/projects.json` won’t work from `file://` due to browser restrictions. Test locally with a server:

- VS Code Live Server extension
- Or Python:

```bash
python -m http.server 5500
```

Then open:

```
http://localhost:5500/projects.html
```

---

## Troubleshooting

- Projects don’t appear: Ensure the entry is in `data/projects.json` (either `projects` or `extraPages`) and `order` is numeric.
- Link doesn’t open: Check `live` or `github` field value. Internal paths should be `projects/<file>.html` and the file must exist.
- JSON fetch error locally: Use a local server (see above). GitHub Pages will serve JSON correctly.

---

## Quick reference

Add a new internal project page:

```json
{
  "id": 21,
  "name": "Gallery",
  "description": "Photo gallery demo.",
  "category": ["frontend"],
  "tech": ["HTML5", "CSS"],
  "live": "projects/gallery.html",
  "featured": false,
  "order": 21
}
```

Add a featured external project:

```json
{
  "id": 5,
  "name": "Maze Runner Visualizer",
  "description": "Pathfinding visualizer.",
  "category": ["algorithm", "frontend"],
  "tech": ["JavaScript", "Canvas API", "A*"],
  "github": "https://github.com/your/maze-runner",
  "live": "https://yourname.github.io/maze-runner/",
  "featured": true,
  "order": 5
}
```

---

If you want me to enable thumbnails or make internal links open in a new tab on the home page, I can adjust the loader in one quick change.
