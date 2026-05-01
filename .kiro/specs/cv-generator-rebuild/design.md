gin-top` class on the wrapper div).

---

## Thumbnail Implementation Strategy

### Approach: Hand-crafted HTML/CSS

All 7 thumbs are rewritten as hand-crafted HTML/CSS faithful reproductions. This is preferred over `transform: scale(0.22)` on the real template because:

- No React hydration cost of rendering a full A4 template (794px × 1123px) just for a 168px card
- No font-loading dependency (real templates use Google Fonts)
- Predictable, stable rendering at exactly 168px height
- No risk of overflow from realthe whitespace left by the scaled-down element.

**transform-origin** must be `top center` (already set via `oriula stays: `(scale - 1) * 1123` px to collapse lated. The `marginBottom` compensation formthe `if (!isMobile)` guard — scale is always calcu(Math.min(scaleByHeight, scaleByWidth, 1))
}
```

Remove ainerWidth - 32) / 794
  setScalentonst updateScale = () => {
  if (!containerRef.current) return
  const containerHeight = containerRef.current.clientHeight
  const containerWidth = containerRef.current.clientWidth
  const padding = 64 // 32px top + 32px bottom (py-8)
  const scaleByHeight = (containerHeight - padding) / 1123
  const scaleByWidth = (copx]` instead of a proportional width.

### Solution

**BuilderLayout.tsx changes:**

```tsx
// Before
<div className={`${isMobile ? 'w-full' : 'w-[380px] shrink-0 ...'}`}>

// After
<div className={`${isMobile ? 'w-full' : 'min-w-[360px] max-w-[480px] w-[40%] shrink-0 ...'}`}>
```

**PreviewPanel.tsx — scale calculation:**

The A4 page is 794px wide × 1123px tall at 96dpi. Scale must be calculated from the container's available height so the full page fits vertically without scrolling on initial load.

```tsx
c
- `CVData` type in `types/cv.ts` — **never modified**
- `cvStore.ts` actions and state shape — **never modified**
- All API routes — **never modified**
- `cv-pdf/` components — **never modified**
- `index.ts` TEMPLATE_MAP and THUMB_MAP keys — **never modified**

---

## Builder Layout Fix

### Problem

`PreviewPanel` only calculates scale on mobile (`if (!isMobile) { setScale(1); return }`). On desktop, `scale=1` means the 794px-wide A4 page overflows the panel. `BuilderLayout` sets `FormPanel` to a fixed `w-[380)
└── template grid
    └── TXThumb                       (same components, same 168px)
```

### Data Flow

```
CVData (Zustand store)
    │
    ├──► TemplateComponent (live preview in PreviewPanel)
    │        └── renders full A4 HTML (210mm × 297mm)
    │
    └──► PDF Renderer (cv-pdf/) — unchanged
             └── produces downloadable PDF

Template selection → setTemplate(id) → TEMPLATE_MAP[id] → TemplateComponent
Thumbnail display  → THUMB_MAP[id]   → TXThumb (static, no CVData prop)
```

### Key Invariants
row
    ├── FormPanel wrapper             (width: min-w-[360px] max-w-[480px] w-[40%])
    │   └── FormPanel                 (no change to internals)
    └── PreviewPanel wrapper          (flex-1, bg-[#161616])
        └── PreviewPanel              (scale always calculated from container height)
            └── TemplateComponent     (T1–T7, receives cvData)

TemplatesContent
└── template cards (grid)
    └── TXThumb                       (hand-crafted 168px faithful miniatures)

TemplateSwitcherModal (buildertoggle bar]               (no change)
└── flex ut
├── BuilderToolbar                    (fixed top bar — no change)
├── [mobile e scope covers three layers:

1. **Builder UI layout** — fix PreviewPanel scaling and FormPanel width
2. **Template thumbnail system** — rewrite all 7 TXThumb components as faithful hand-crafted HTML/CSS representations
3. **Template output quality** — redesign T1, T3, T4 (full rewrites) and fix T2, T5, T6, T7 (targeted changes)

No changes are made to routing, Zustand store, CVData type, API routes, or PDF renderer components.

---

## Architecture

### Component Tree

```
BuilderLayo visual and layout rebuild of BerojgarCV. Thiew

This document describes the technical design for thement: CV Generator Rebuild

## Overv# Design Docu