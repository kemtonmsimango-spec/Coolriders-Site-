# Multi-page setup guide

This project now supports multiple pages that share the same visual style and motion:

- `index.html` (home)
- `fleet.html`
- `services.html`
- `testimonials.html`

## Keep one theme everywhere

1. Always include the same stylesheet:
   - `<link rel="stylesheet" href="styles.css">`
2. Keep the animated background element in every page body:
   - `<div class="gradient-bg"></div>`
3. Use the same script:
   - `<script src="script.js"></script>`

## Add a new page quickly

1. Copy one of the existing page files (for example `services.html`).
2. Rename it, e.g. `contact.html`.
3. Replace only the `<main>` content.
4. Add links to the new page in:
   - header nav (`.nav-menu`)
   - mobile menu (`#mobileMenu`)
   - footer links (`.footer-links`)

## Optional next upgrade

If you want fewer duplicates later, split shared layout into include/partials using a static site generator (11ty, Astro, etc.), while still keeping `styles.css` and `script.js` global.
