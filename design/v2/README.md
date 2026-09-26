# Authoritative public V1 / V2 logo family

Both lockups are approved and authoritative. Neither includes LIFE WITH GOD.

- V1 stacked: `public/assets/rts-v1-logo-{colorway}.svg/.png`.
- V2 horizontal: `public/assets/rts-v2-logo-{colorway}.svg/.png`.
- Colorways: dark-bg, light-bg, white, mono-dark.
- Each family retains a 2400px `rts-vN-logo-master.png`.

V2 uses the exact V1 symbol and wordmark paths. Only translation changes:
symbol `translate(-30 0)`; wordmark `translate(270 -174)`. No redesign,
font substitution, wording change, or added tagline. Run `build_assets.py`
to regenerate V2 from the approved V1 family.

Placement defaults: V2 horizontal in public headers; V1 stacked in public
footers. Shared CSS is `public-brand-lockups.css`, which includes V1 sizing.
Desktop header V2: 154 × 69.3px; footer V1: 85 × 93.7px.
At <=840px header V2: 136 × 61.2px; footer V1: 75 × 82.7px.
The horizontal canvas is wider; the symbol's visible scale remains essentially
the same as the user's approved 50% reduction (less than 0.3% rounding difference).

Home, Conversations, About Us, Contact: light-background header variant.
Music: dark-background header variant. All five footers: dark-background V1.
Exact existing gold #b87525, navy #09263d, and white #ffffff are preserved.
Monochrome variants remain available; no placement currently requires them.

Tree of Life curriculum branding is separate and unchanged.
