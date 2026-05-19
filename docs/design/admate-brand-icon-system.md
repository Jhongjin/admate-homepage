# AdMate Brand Icon System

Date: 2026-05-19

## Direction

AdMate uses one master brand system with product-specific marks. The shared rule is a 64x64 rounded tile, strong silhouette, restrained color, and no text inside favicon artwork. Product recognition must work at 16px before color is considered.

## Master And Product Marks

| Product | Mark | Meaning | Accent |
| --- | --- | --- | --- |
| AdMate | System Kernel | Agent Core and the operating system layer | `#9FE5C1` |
| Compass | Evidence Needle | Policy direction, source checking, evidence review | `#D5B978` + `#4F63D8` |
| Lens | Capture Frame | Capture area, screen review, preserved work record | `#0F766E` |
| Foresight | Forecast Curve | Baseline data and forward-looking performance range | `#B7791F` |
| Sentinel | Risk Gate | Monitoring, anomaly detection, launch risk control | `#177D4E` + alert dot `#D93025` |

## Asset Rules

- Favicon SVGs use `viewBox="0 0 64 64"`.
- No text in favicon artwork.
- Outer tile radius stays between 12 and 14.
- Main strokes are about 4px; secondary strokes are about 3px.
- Each mark keeps at most two primary ideas at favicon scale.
- Wordmark lockups are separate SVGs and may include descriptor text.

## Files

Homepage:
- `public/favicon.svg`
- `public/brand/admate-mark.svg`
- `public/brand/admate-lockup.svg`

Compass:
- `public/favicon.svg`
- `public/brand/admate-compass-mark.svg`
- `public/brand/admate-compass-lockup.svg`

Lens:
- `public/brand/admate-lens-favicon.svg`
- `public/brand/admate-lens-mark.svg`
- `public/brand/admate-lens-lockup.svg`

Foresight:
- `public/favicon.svg`
- `public/brand/admate-foresight-mark.svg`
- `public/brand/admate-foresight-lockup.svg`

Sentinel:
- `public/favicon.svg`
- `public/brand/admate-sentinel-mark.svg`
- `public/brand/admate-sentinel-lockup.svg`

## Anti-patterns

- Do not make every product icon a letter tile.
- Do not use generic AI purple/blue gradients.
- Do not use camera, crystal ball, military radar, lock, or legal gavel metaphors.
- Do not add more product colors to the master icon.
- Do not rely on tiny text to distinguish products.
