# Self-hosted fonts

Two families (2026-09-28 type rule): **Archivo Narrow** carries every headline, **Archivo** sets
every sentence (400) and the wordmark/short UI headings (600), and **IBM Plex Mono** sets labels,
part numbers, dimensions, stamps and navigation — mono means "label or record". All SIL Open Font
License 1.1 — licences beside the fonts, and they must stay there.

| File | Face | Used for |
| --- | --- | --- |
| `archivo-narrow-700.woff2` | Archivo Narrow 700 | H1, H2, card + step titles, counted facts |
| `archivo-400.woff2` | Archivo 400 | all sentences: body, leads, notes, form text |
| `archivo-600.woff2` | Archivo 600 | the wordmark, short UI headings, bold in prose |
| `plex-mono-400.woff2` | IBM Plex Mono 400 | labels, eyebrows, navigation, data |
| `plex-mono-600.woff2` | IBM Plex Mono 600 | spec values, buttons |

**60 KB for the set.** Both Archivo sources ship as variable fonts carrying weight (and, for
Archivo, width) axes; each face the design uses is *instanced* to a single static weight before
subsetting. Archivo 400 was added on 2026-09-28 the same way (`--update-name-table` so it names
itself Archivo Regular). Do not ship the variable axes.

## Why self-hosted rather than linked from a font CDN

The handoff says it outright — *"Self-host to honour Article IV — do not load from
fonts.googleapis.com in production."* Article IV is a promise made in the UI: the page counts
`0 trackers` and `0 third-party scripts` on itself. A webfont linked from Google would send
every visitor's IP to Google on every page load and make the site's own headline claim false.
Keep them vendored.

## Regenerating

    for f in archivo archivonarrow; do
      curl -sLO "https://raw.githubusercontent.com/google/fonts/main/ofl/$f/..."
    done
    fonttools varLib.instancer Archivo.ttf wght=600 wdth=100 -o Archivo-600.ttf
    fonttools varLib.instancer Archivo.ttf wght=400 wdth=100 --update-name-table -o Archivo-400.ttf
    fonttools varLib.instancer ArchivoNarrow.ttf wght=700 -o ArchivoNarrow-700.ttf
    pyftsubset <in> --output-file=<out>.ttf \
      --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2116,U+2122,U+2190-2193,U+2212,U+25A0-25CF" \
      --layout-features="kern,liga,clig,calt,tnum" --name-IDs="*" --name-legacy --notdef-outline
    woff2_compress <out>.ttf

The unicode range covers Latin plus the marks this site actually sets: № · — ± × Ø → and £.
