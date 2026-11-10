# Japan Thrift Map

A free, unofficial, non-commercial, bilingual (中文 / English) map of second-hand shops in Japan:
Hard Off, Off House, Book Off (partial) and a partial 2nd Street list. It helps visitors plan
shopping days, find the nearest shops, search by item, and share a shop with family.

Live site: https://japan-thrift-map.netlify.app

> Not affiliated with or endorsed by Hard Off Corporation, Book Off Group or 2nd Street.
> The names are trademarks of their owners and are used only to say which shops are shown.

## What is in this repo

| Path | What |
|---|---|
| `build/template.html` | The whole app (single HTML file, no remote assets) |
| `build/data.txt` etc. | Shop data: id, brand, prefecture, name, lat/lng, hours, city |
| `build/build.mjs` | Builds `build/out/index.html` from the template and data |
| `build/geo.mjs`, `build/rail.mjs` | Regenerate the map outline and rail lines |
| `site/` | The files that are deployed (page, manifest, service worker, icons) |

## Build

```bash
cd build
npm install
node build.mjs        # writes build/out/index.html
cp out/index.html ../site/index.html
```

`geo.mjs` needs `jpn-atlas`; `rail.mjs` needs `japan-train-data` (installed separately,
see the comments at the top of each file). The built files `land.txt`, `borders.txt`,
`rail.txt` and `shin.txt` are already included, so you do not need to run them.

## Data and sources

- Shop names, coordinates and opening hours were collected in November 2026 from the
  companies' public store pages. Every shop card links back to its official page.
  Please check the official page for current hours, holidays and closures.
- Coordinates come from the stores' own pages and can be slightly off. The Navigate and
  share buttons search Google Maps by shop name, centred on the stored point.
- Map outline: `jpn-atlas`. JR line geometry: `japan-train-data` (2017). Bullet trains are
  drawn by hand and are approximate.
- If you are a rights holder and want something removed or changed, please open an issue.

## Reporting a wrong location

Use the ⚑ button on a shop card on the live site, or open an issue with the shop id
(the number in its official store page URL).

## Privacy

No accounts, ads, analytics or cookies. Shortlist, hotel, language and location stay in the
visitor's own browser. The report form sends only the shop and the text typed.

## Ideas / help wanted

- Complete Book Off, Treasure Factory, Kindal and the full 2nd Street list
- Holiday and closing-day data
- More languages (Korean, Thai, Indonesian)
- A monthly data refresh script

## License

Code: MIT (see `LICENSE`). Shop data is factual information from the shops' public pages;
brand names are trademarks of their owners.
