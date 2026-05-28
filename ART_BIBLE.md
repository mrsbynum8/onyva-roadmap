# Onyva Website Art Bible

This page should feel like a clinical dossier for a premium regenerative medicine practice: quiet, tactile, diagnostic, and precise. The visual language is not a generic wellness brand or SaaS landing page. It is a paper-based case file system with medical record cues, stamped marks, measured rules, and restrained plum ink.

## Palette

Use a narrow, paper-and-ink palette.

- Paper base: `#f6f1ea`
- Page background: `#dededc`, mobile `#dedbd7`
- Environmental gray: `#d9d8d5`
- Primary ink: `#242427`
- Brand plum: `#533164`
- Soft plum: `#816a8e`
- Rules and divider ink: `rgba(83, 49, 100, 0.48)`
- Secondary label ink: `#363339`
- Fine detail purple gray: `#6a566f`

Rules:

- Plum is the only saturated color family. Use it for brand, section titles, numeric markers, stamps, annotations, and primary actions.
- Black should be softened into ink, never pure `#000`.
- Backgrounds should feel like paper, parchment, desk surface, or medical file material.
- Avoid bright accent colors, gradients, glassmorphism, neon, saturated blue, and standard tech-brand palettes.
- Color contrast should come from ink density, paper depth, and linework rather than large color blocks.

## Typography Rules

The typographic system is a contrast between formal medical file text, elegant editorial diagnosis, and handwritten annotation.

Primary type roles:

- Case-file mono: `"Courier New", "Courier Prime", ui-monospace, monospace`
- Editorial serif: `"Bodoni 72", Didot, "Iowan Old Style", Georgia, serif`
- Hand annotation: `Caveat, "Bradley Hand", "Segoe Print", "Comic Sans MS", cursive`
- Stamp CTA: `"American Typewriter", "Courier New", "Courier Prime", ui-monospace, monospace`

Rules:

- Labels, metadata, roadmap titles, and operational copy should use the mono system.
- Main diagnosis headlines should use the serif system with low line-height and high contrast.
- Handwritten type is an accent only. Use it for annotations, circled callouts, signatures, marginal marks, or one-word emphasis.
- Most file text is uppercase, but the main headline and explanatory body copy can use natural sentence case.
- Letter spacing should be modest, usually `0.01em` to `0.13em`, with wider spacing reserved for stamps and small labels.
- Do not use modern geometric sans-serif headings. They will break the clinical-file illusion.
- Do not overuse the handwritten style. One visible handwritten moment per section is usually enough.

## Spacing Rules

Spacing should feel measured and diagrammatic, not padded like a card-based SaaS layout.

Rules:

- Use the artwork or section container as a fixed composition plane.
- Prefer percentage or container-relative placement for hero-like sections.
- Keep content aligned to implied paper rules, folds, tabs, and margins.
- Use thin horizontal rules to create structure instead of boxed cards.
- Let sections breathe through large paper margins and intentional blank space.
- Small labels should sit close to rules and icons, like forms or examination sheets.
- Avoid equal-padding card grids as the dominant structure.
- Avoid centering every block. Composition should feel filed, pinned, stamped, or annotated.

Current hero proportions to echo:

- Main document content starts around the left third, with a persistent side-tab anchor.
- Primary message lives above the examination details, not in a centered marketing stack.
- Supporting modules can sit on separate paper sheets, offset from the main page.
- Roadmap content uses vertical progression and numeric medical-file markers.

## Layout Principles

The core archetype is "diagnostic record on a desk."

Rules:

- Build future sections as artifacts: dossier pages, lab notes, protocol cards, intake sheets, audit forms, pinned memos, scanned reports, or stamped summaries.
- The page should feel assembled, not templated.
- Use asymmetry. A section can have a large page on one side and a smaller note, stamp, chart, or protocol strip on the other.
- Lines, pins, tabs, stamps, checkboxes, and medical symbols should create navigation through the content.
- Content hierarchy should be created through document position: masthead, case label, diagnosis, findings, objective, outcome.
- Avoid generic hero-to-card-grid-to-testimonial-section sequencing unless those sections are reinterpreted as file artifacts.
- Do not use floating rounded cards inside larger cards.
- Keep border radii minimal unless matching the physical photo assets.

Good future section archetypes:

- "Findings" as a marked-up examination sheet.
- "Protocol" as a prioritized prescription pad or treatment plan.
- "ROI Scan" as a lab result panel with quantified failures.
- "Before / After" as two clipped patient-chart pages.
- "Testimonials" as redacted case notes or stamped patient records.
- "FAQ" as an intake checklist or accordion built from file rows.

## Image Treatment

Images should look physical, scanned, clinical, and tactile.

Rules:

- Prefer real or generated paper textures, folders, tabs, stamps, clips, and medical-file objects.
- Use off-white paper, slight shadows, natural edge wear, faint diagrams, and subtle print imperfections.
- Icons should be line-based, medical, operational, or diagnostic. Use muted plum stroke.
- Visuals should carry content, not decorate around content.
- Avoid glossy stock photography, smiling clinic staff hero imagery, abstract gradients, 3D blobs, and generic wellness backgrounds.
- If photos of people are introduced, treat them like case-study inserts or clipped records, not lifestyle advertising.
- Maintain enough image clarity for text and objects to feel inspectable.

## Motion Rules

Motion should reinforce the dossier metaphor.

Current motion language:

- Dossier settles into place.
- Paper registers with a tiny physical shift.
- Tab logo marks in like printed ink.
- Brand logo presses in.
- "Always." annotation presses and underlines like a hand mark.
- Focus icons ink in sequentially.
- CTA stamps into place.
- CTA text breathes with a subtle ink pulse.

Rules:

- Use CSS-first motion with transforms, opacity, text-shadow, and stroke behavior.
- Keep entrance motion short: roughly `520ms` to `900ms`.
- Stagger meaningful document elements, not every line of text.
- Use easing that feels physical: `cubic-bezier(0.18, 0.76, 0.28, 1)`, `cubic-bezier(0.2, 0.84, 0.2, 1)`, or similar.
- Ongoing motion should be rare and quiet. One breathing or ink-pulse cue per viewport is enough.
- Motion should not create layout shift. Animate `transform`, `opacity`, `filter`, `text-shadow`, or SVG stroke properties.
- Always respect `prefers-reduced-motion`.
- Avoid generic fade-up, slide-in cards, bouncing buttons, scroll-jacking, large parallax, and constant decorative movement.

## Button Style

Primary actions should look stamped, typed, or filed rather than like modern web buttons.

Current primary CTA:

- Transparent background.
- Plum ink.
- Uppercase American Typewriter / mono stack.
- Wide letter spacing.
- Slight rotation.
- No filled rounded rectangle.
- Stamp-like entrance and subtle ink-breathing text.

Rules:

- Buttons may be stamps, labels, tabs, file-row actions, or handwritten marks.
- Keep borders irregular or document-like when a border is needed.
- Use plum ink and paper background instead of high-contrast filled buttons.
- Hover can deepen plum and lift by a tiny amount.
- Focus states should use thin dashed outlines in translucent plum.
- Avoid pill buttons, heavy shadows, glossy gradients, and generic icon buttons unless they are part of a tool-like section.

## Nav Style

Navigation should feel like file navigation.

Recommended direction:

- Use tabs, file labels, case metadata, page numbers, or thin rule-based section markers.
- A desktop nav can sit like a dossier masthead: small uppercase mono labels, generous tracking, minimal separators.
- Mobile nav can become a compact tab, case-index drawer, or stamped menu mark.
- Active states should feel like selected tabs, circled labels, underlines, or stamped marks.
- Keep nav quiet. The hero should remain the dominant first impression.

Avoid:

- Large sticky glass nav bars.
- Bright CTA-heavy marketing nav.
- Rounded nav pills.
- Dense icon-only nav that feels like an app dashboard.

## Mobile Adaptation Rules

Mobile is not a shrunken desktop. It should feel like a vertical stack of physical documents.

Current mobile behavior:

- The main dossier becomes a tall portrait file.
- The purple side tab remains a persistent physical anchor.
- The side logo is centered within the tab width and held in the upper solid purple area.
- The main logo moves up slightly to avoid touching the descriptor.
- The roadmap becomes a separate sheet below the main dossier.

Rules:

- Convert wide desktop compositions into stacked paper artifacts.
- Preserve the side-tab identity where possible.
- Use portrait aspect ratios for major documents.
- Keep type legible by scaling with container width, but check actual viewport screenshots.
- Avoid crowding logos, annotations, and text beneath them.
- Separate sections with physical paper edges, pins, tabs, or shadows, not blank marketing whitespace alone.
- On mobile, prioritize readable document order: brand, diagnosis, supporting evidence, CTA, roadmap, outcome.
- Test at narrow widths around `390px` and ensure rotated tab elements are visually centered, not mathematically convenient.

## Future Sections Should Feel Like

Future sections should feel like the user is moving through an expert clinical review of a practice, one artifact at a time.

Use these qualities:

- Precise, diagnostic, and evidence-led.
- Premium but not flashy.
- Quietly medical without becoming cold or sterile.
- Tactile and physical, with paper, ink, stamps, notes, and forms.
- Operationally sharp: revenue, costs, workflows, team capacity, and technology are treated like measurable clinical findings.
- Confident and restrained. Let the artifacts do the persuading.

Content tone:

- Short, declarative, and diagnostic.
- Avoid hype-heavy claims.
- Prefer phrases like "Finding", "Objective", "Protocol", "Outcome", "Case File", "Examination", "Quantified", "Prioritized", and "Clinical-grade".
- Use metaphor consistently: diagnosis before prescription, operational scan, protocol, findings, case file.

Do not let future sections drift into:

- Generic SaaS dashboards.
- Wellness spa aesthetics.
- Startup gradient pages.
- Stock-photo healthcare marketing.
- Overly playful handwritten scrapbook design.
- Dense medical bureaucracy that feels hard to read.

The best future sections should look like they belong on the same desk as the hero.
