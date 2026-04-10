# Design Brief

## Direction

Amrut Gubyad Portfolio — OLED-black professional showcase with sky-blue accents and smooth anchor navigation.

## Tone

Refined, disciplined minimalism with brutalist clarity. Sky-blue punctuation on monochromatic darkness creates confidence and focus.

## Differentiation

Smooth scroll anchor navigation with semantic hierarchy. Sky-blue used sparingly — only on CTAs, section labels, and active states — ensuring visual discipline and readability.

## Color Palette

| Token       | OKLCH       | Role                              |
| ----------- | ----------- | --------------------------------- |
| background  | 0.05 0 0    | OLED black, near-zero lightness   |
| foreground  | 0.92 0 0    | Nearly white text on dark         |
| card        | 0.12 0 0    | Subtle elevation for content      |
| primary     | 0.70 0.22 230 | Sky blue, buttons & section labels |
| accent      | 0.70 0.22 230 | Sky blue highlights & links       |
| muted       | 0.1 0 0     | Deepest grey for borders          |

## Typography

- Display: Space Grotesk — bold headings, hero, section titles
- Body: DM Sans — paragraphs, labels, descriptions
- Scale: hero `text-5xl md:text-7xl`, h2 `text-3xl md:text-5xl`, label `text-sm uppercase`, body `text-base`

## Elevation & Depth

Minimal shadows with cool blue undertone. Cards float subtly above background via color contrast, not shadow weight.

## Structural Zones

| Zone    | Background    | Border           | Notes                                |
| ------- | ------------- | ---------------- | ------------------------------------ |
| Header  | background    | border (0.2 L)   | Navigation with smooth scroll        |
| Content | background    | — (alternation via bg-card 0.12 L) | Sections alternate bg-card subtly |
| Footer  | card (0.12 L) | border-top       | Contact info, minimal styling        |

## Spacing & Rhythm

Large vertical gaps between sections (4–6rem), generous content padding. Tight tracking on display text, spacious line-height on body (1.6+). Micro-spacing: 4px, 8px, 16px, 24px.

## Component Patterns

- Buttons: rectangular (subtle 4px radius), sky-blue bg, white text, hover state darkens button via opacity
- Links: sky-blue underline, hover lifts underline with smooth transition
- Cards: bg-card, subtle border, no shadow by default

## Motion

- Entrance: fade-in on scroll (intersection observer)
- Hover: smooth transition on all interactive elements (0.3s cubic-bezier)
- Decorative: subtle scale (1.02) on link hover, no bouncing

## Constraints

- OLED black only — never use greys as primary background
- Sky blue accent sparingly — only buttons, labels, links
- No rounded buttons — keep radius minimal (4–6px)
- Accessibility: all interactive elements keyboard-navigable, focus rings in sky-blue

## Signature Detail

Smooth scroll anchor navigation with animated underline indicator — professional portfolio convention executed with refined micro-interaction.
