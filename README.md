# ROEA — Romanian Orthodox Episcopate of America

This repository contains two things:

## 1. `site/` — Modern website (newly designed)

A modern, responsive static site for the Romanian Orthodox Episcopate of America.
Inspired in layout/feel by patriarchate-style websites, but built with original CSS
and ROEA content.

Pages:

- `site/index.html` — homepage (hero, news grid, hierarch, tiles, donation, quote)
- `site/about.html` — history, canonical status, the Vatra, summer camps
- `site/hierarchs.html` — Archbishop Nathaniel, Bishop Andrei, former hierarchs
- `site/structure.html` — chancery, council, deaneries, departments, monastic, auxiliaries
- `site/news.html` — news / pastoral letters / galleries
- `site/contact.html` — chancery contact + form

Open `site/index.html` directly in a browser, or serve the folder:

```bash
cd site && python3 -m http.server 8765
# then visit http://localhost:8765/
```

To deploy on GitHub Pages: in repo Settings → Pages, choose the `main` branch and
`/site` folder.

## 2. `www.roea.org/` — Offline mirror

Snapshot of the original https://www.roea.org/ pages and assets, fetched with
`mirror_roea.py`. Useful as reference / offline archive.

To re-run the mirror:

```bash
python3 mirror_roea.py --delay 1 --max-pages 12000 --max-assets 150000
```
