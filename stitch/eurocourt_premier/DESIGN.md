# Design System Specification: The Hardcourt Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Monolith"**

This design system rejects the "app-like" clutter of traditional sports interfaces in favor of a high-end, editorial experience. It draws inspiration from the high-stakes atmosphere of EuroLeague basketball—where the darkness of the arena meets the explosive vibration of the orange ball and the sharp geometry of the paint.

The aesthetic is built on **Kinetic Tension**: the juxtaposition of heavy, monolithic dark surfaces against razor-sharp, vibrant accents. We break the "template" look by utilizing intentional asymmetry, oversized display typography that bleeds off the grid, and a sophisticated layering system that mimics the depth of a physical stadium. This is not a utility tool; it is a premium digital stage.

---

## 2. Colors & Tonal Depth
Our palette is rooted in the "Deep Black" of the hardwood night, punctuated by the "Vibrant Orange" of the Wilson ball.

### Surface Hierarchy & Nesting
To achieve a premium feel, we strictly follow a **Tonal Layering** approach. Instead of using lines to separate content, we use the `surface` container tiers to create a physical sense of depth.
- **Base Layer:** `surface` (#131313) for the main background.
- **Sectioning:** Use `surface_container_low` (#1b1b1b) for large content areas.
- **Floating Elements:** Use `surface_container_high` (#2a2a2a) for cards or interactive modules to create a "lift" from the floor.

### The "No-Line" Rule
**1px solid borders are strictly prohibited for sectioning.** 
Boundaries must be defined solely through background color shifts. For example, a `surface_container_highest` module should sit directly on a `surface` background. The eye should perceive the edge through the change in value, not a stroke.

### The "Glass & Gradient" Rule
To add "soul" to the high-contrast aesthetic:
- **Signature Gradients:** Use a linear gradient from `primary_container` (#ff6b00) to `primary` (#ffb693) at a 135-degree angle for hero CTAs or "Live" indicators.
- **Atmospheric Glass:** For navigation bars or floating overlays, use `surface_container` at 80% opacity with a `20px` backdrop-blur. This allows the vibrant orange accents of the content to "bleed" through the dark glass, mimicking arena lighting.

---

## 3. Typography: Athletic Sophistication
Typography is our primary tool for brand expression. We pair the aggressive, geometric `Space Grotesk` with the high-legibility `Manrope`.

*   **Display & Headlines (`Space Grotesk`):** High-impact, bold, and athletic. Use `display-lg` (3.5rem) for hero moments. Do not be afraid to use tight letter-spacing (-0.04em) to emphasize the "monolithic" feel.
*   **Body & Titles (`Manrope`):** Used for narrative and data. `title-lg` provides a premium editorial feel for sub-headers, while `body-md` ensures long-form content remains readable against the high-contrast dark background.
*   **The Narrative Scale:** Always lead with a massive headline. The contrast between a `display-lg` title and `label-md` metadata creates the "editorial" tension required for a premium sports brand.

---

## 4. Elevation & Depth
We move away from the "floating shadow" tropes of 2014 and embrace modern, ambient depth.

*   **The Layering Principle:** Depth is "stacked." 
    *   *Level 0:* `surface_container_lowest` (The Floor)
    *   *Level 1:* `surface` (The Court)
    *   *Level 2:* `surface_container_high` (The Player/Card)
*   **Ambient Shadows:** If a floating effect is required (e.g., a Modal), use a shadow with a `48px` blur, 0px offset, and 8% opacity using the `on_surface` color. This creates a soft, natural glow rather than a muddy grey smudge.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` (#5a4136) at **15% opacity**. This creates a "whisper" of an edge that maintains the "No-Line" philosophy.

---

## 5. Components

### Buttons: The Power Cells
*   **Primary:** Solid `primary_container` (#ff6b00) with `on_primary` (#561f00) text. Sharp corners (`none` or `sm` scale). Use a subtle inner-glow on hover.
*   **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
*   **Tertiary:** Text-only in `primary`. Use for low-priority actions.

### Cards: The Court Geometry
*   **Construction:** Use `surface_container_low`. 
*   **Rule:** Forbid the use of divider lines. Separate content using the Spacing Scale (e.g., `spacing-6` between header and body). 
*   **Feature:** Use a "Corner Notch" effect—a subtle 45-degree clip on the top-right corner—to echo the geometry of the basketball court's key.

### Data Inputs: Performance Precision
*   **Fields:** Background-only (`surface_container_highest`). Underline active state with a 2px `primary` bar. 
*   **Typography:** Labels must use `label-md` in `on_surface_variant` for a technical, data-driven look.

### The "Shot Clock" Component (Custom)
*   For time-sensitive data (game clocks, countdowns), use `display-md` typography in `primary_container` with a high-glow ambient shadow to simulate a physical LED scoreboard.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use white space as a structural element. A `spacing-16` gap is more effective than any line.
*   **DO** lean into asymmetry. Align a headline to the far left and the body text to a center-right column.
*   **DO** use `primary_container` sparingly. It is a "laser," not a "floodlight." Use it to draw the eye to exactly one place.

### Don’t:
*   **DON’T** use pure white (#FFFFFF) for body text. Use `on_surface` (#e2e2e2) to reduce eye strain in our dark-mode-default environment.
*   **DON’T** use standard "Rounded" corners (lg/xl). Stick to `none`, `sm`, or `md` to keep the aesthetic aggressive and athletic.
*   **DON’T** use 1px dividers to separate list items. Use a background shift of 2% or simply use vertical padding (`spacing-4`).

---

## 7. Spacing & Rhythm
The system uses a **7px-based grid** (reflected in the Spacing Scale). This non-standard rhythm creates a custom, proprietary feel.
*   **Large Breathers:** Use `spacing-20` (7rem) for section transitions to give the high-contrast elements room to breathe.
*   **Micro-Interactions:** Use `spacing-1` (0.35rem) for tight groupings, like a player's number next to their name. 
*   **The "Key" Margin:** Always maintain a minimum of `spacing-8` (2.75rem) horizontal padding on mobile to keep the content feeling like it’s framed within an arena.