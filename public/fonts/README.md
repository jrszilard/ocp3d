# Self-hosted fonts

**Bitter** (Huerta Tipográfica), SIL Open Font License 1.1 — licence in `bitter-OFL.txt`,
which must stay beside the font file.

`bitter-var-latin.woff2` is a **variable** font: one 31 KB file covers weights 100–900, so
`font-weight` works continuously and there is nothing else to download.

## Why it is self-hosted rather than linked from a font CDN

Independence is one of the two brand pillars, and the site currently makes **zero** third-party
requests — no analytics, no cookies, no external scripts. Linking a webfont from Google would
send every visitor's IP address to Google on every page load, to render a brand whose stated
position is being against "the culture that replaced owning a machine with being watched by one."
The font is therefore vendored. Keep it that way.

## Regenerating the subset

Latin + the punctuation this brand actually sets (№ · § — × £):

    curl -sLO 'https://raw.githubusercontent.com/google/fonts/main/ofl/bitter/Bitter%5Bwght%5D.ttf'
    pyftsubset 'Bitter[wght].ttf' --output-file=bitter-var-latin.ttf \
      --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2116,U+2122,U+2190-2193,U+2212,U+25A0-25CF" \
      --layout-features="kern,liga,clig,calt,onum,tnum,frac,sups" \
      --name-IDs="*" --name-legacy --notdef-outline --recalc-bounds
    woff2_compress bitter-var-latin.ttf

Do not pass `--instance`; that would flatten the weight axis.
