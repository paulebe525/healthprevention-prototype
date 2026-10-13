# Friendly design system (prototype)
Style: soft, rounded, illustrated, light only (inspired by Headspace-style friendliness; all artwork original).

## Colour roles
| Token | Hex | Job |
|---|---|---|
| navy | #1e4e6b | headings, main button, active nav |
| teal | #2f8270 / #38947d | primary "start" buttons, progress, selected answers, links |
| orange | #ff8a3d (text #c4561b) | secondary "health tips" button, question numbers, sun/heart art |
| green | #2f8a55 / #6cc48a | ticks, low-risk, "good" chips |
| peach / mint / sky / butter | #ffe3d3 / #d9f4e6 / #dcefff / #fff2c2 | card & tile backgrounds only (never text) |
| cream | #fffaf2 | page background |
Risk colours (green / gold / red) are only for results, never decoration.

## Type
Headings Nunito 800–900; body Figtree 18px+, line-height 1.65; Tamil uses Noto Sans Tamil with smaller heading scale and taller line-height (`:lang(ta)`).

## Shape
Radius 28px cards, 40px bands, pill buttons; "blob" icon badges (50% 50% 50% 18px). Soft shadows, no borders.

## Components
Pill button (teal / navy / orange, chunky 6px bottom "press" shadow), card, tile, step (coloured numbered blob), band, FAQ details, language card, quiz card + options, gauge.

## Motion
Bounce easing `cubic-bezier(.34,1.56,.64,1)`: float on illustrations, heartbeat, pop-in language card, scroll reveal, button squish on press, question slide-in. All off under `prefers-reduced-motion`.

## Language
One language at a time via `data-en`/`data-ta`; first visit shows the language card; choice stored in `hp_lang`. Add Hindi later by adding `data-hi`.
