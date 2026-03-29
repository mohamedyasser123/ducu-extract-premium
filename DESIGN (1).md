# Design System Specification: Editorial Glassmorphism

## 1. Overview & Creative North Star
**Creative North Star: "The Crystalline Editor"**

This design system moves away from the rigid, boxed-in aesthetics of traditional SaaS utility tools. Instead of a "utility belt" of heavy icons and hard borders, we treat the PDF interface as a high-end digital workspace—a series of layered, translucent planes that feel light, fast, and sophisticated. 

We break the "standard template" look through **Intentional Asymmetry** and **Tonal Depth**. By utilizing overlapping glass containers and a high-contrast typography scale, we transform a functional tool into a premium editorial experience. The goal is to make the user feel like they are "curating" documents rather than just "editing" files.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in a deep, sophisticated Indigo (`primary`) and a professional Emerald (`secondary`), set against a breathable, cool-toned environment.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. 
Structural boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a sidebar should be defined by the shift from `surface` (#f7f9fb) to `surface_container_low` (#f2f4f6), never by a grey line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of frosted glass sheets. Use the `surface-container` tiers to define "importance" through perceived proximity:
- **Base Layer:** `surface` (#f7f9fb) — The infinite canvas.
- **Sectioning:** `surface_container_low` (#f2f4f6) — Secondary workspace areas.
- **Active Workspace:** `surface_container_lowest` (#ffffff) — The "Paper" or "PDF" focal point.
- **Floating Modals/Popovers:** `surface_bright` with a 70% opacity and `backdrop-filter: blur(20px)`.

### The "Glass & Gradient" Rule
To ensure the system feels premium:
- **Glassmorphism:** Use `surface_container_lowest` at 80% opacity with a heavy backdrop blur for utility panels that float over the document.
- **Signature Gradients:** For primary CTAs (e.g., "Convert PDF"), use a subtle linear gradient from `primary` (#3525cd) to `primary_container` (#4f46e5). This adds "soul" and depth that flat hex codes cannot achieve.

---

## 3. Typography
We utilize **Inter** to maintain a clean, modernist feel. The hierarchy is designed to feel like a high-end magazine, using dramatic scale differences to guide the eye.

- **Display (lg/md):** Used for "Hero" moments like empty states or high-level dashboard summaries. Keep letter-spacing at -0.02em to feel tight and custom.
- **Headline (lg/md/sm):** Used for tool headers and document titles. These are the "anchors" of your layout.
- **Title & Body:** `body-lg` (1rem) is our workhorse. Ensure line-height is generous (1.5–1.6) to maximize "breathing room."
- **Labels:** `label-sm` (0.6875rem) should be used sparingly for metadata, always in `on_surface_variant` (#464555) to maintain a low-noise environment.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

- **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. This creates a soft, natural "lift" that mimics high-quality paper stock.
- **Ambient Shadows:** When a floating effect is required (e.g., a file drag-and-drop state), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 30, 0.06)`. The shadow color is a low-opacity version of `on_surface`, never pure black.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` (#c7c4d8) at **15% opacity**. 100% opaque borders are strictly forbidden.
- **Frosted Depth:** Use `backdrop-filter: blur(12px)` on all floating containers to let the background colors bleed through, softening the edges of the UI.

---

## 5. Components

### Buttons & Chips
- **Primary Button:** Large radii (`DEFAULT`: 1rem). Use the Signature Gradient (`primary` to `primary_container`). On hover, increase the shadow diffusion rather than changing the color.
- **Tertiary/Ghost Buttons:** No background or border. Use `primary` text. This maintains the "Lightweight" feel of the system.
- **Chips:** Used for PDF Tags (e.g., "Signed," "Draft"). Use `secondary_container` (#6cf8bb) with `on_secondary_container` (#00714d) text for a vibrant, professional success state.

### Input Fields & Controls
- **Inputs:** Use `surface_container_highest` (#e0e3e5) for the background with no border. On focus, transition to a `primary` "Ghost Border" (20% opacity) and a subtle inner glow.
- **Checkboxes/Radios:** Large 4px inner padding for the checked state to create a "nested" look rather than a flat fill.
- **Cards & Lists:** **Forbid dividers.** To separate files in a list, use a vertical spacing of `spacing.3` (1rem) and a subtle background hover state using `surface_container_high` (#e6e8ea).

### Tool-Specific Components
- **The Floating Utility Bar:** A `surface_container_lowest` glass container with `xl` (3rem) rounding. This bar should "float" at the bottom of the viewport, housing PDF tools (Rotate, Crop, Sign).
- **The Progress Rail:** For file uploads, use a `primary_fixed` (#e2dfff) track with a `primary` (#3525cd) fill. No borders.

---

## 6. Do’s and Don’ts

### Do:
- **DO** use asymmetry. If a document preview is centered, offset the metadata to the right to create a more dynamic, editorial feel.
- **DO** use the full spacing scale. When in doubt, add more white space.
- **DO** use `secondary` (#006c49) for all "Success" or "Complete" states to maintain a professional, high-trust environment.

### Don't:
- **DON'T** use 1px dividers to separate content. Use the `0.7rem` to `1rem` spacing tokens and tonal shifts instead.
- **DON'T** use harsh shadows. If the shadow is clearly visible as a "shape," it is too dark. It should feel like an ambient glow.
- **DON'T** use standard 4px or 8px corners. Stick to the `DEFAULT` (16px) for cards and inputs to maintain the "Soft Minimalism" aesthetic.
- **DON'T** use pure black text. Use `on_surface` (#191c1e) to keep the contrast high but the feel sophisticated.