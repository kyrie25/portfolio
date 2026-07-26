# v4

A canvas-first portfolio for Nam Anh Pham, built with vanilla JavaScript, p5.js, and Vite.

The opening scene cycles through twelve seeded procedural forms with generated color treatments. Scrolling reveals a responsive portfolio assembled from the previous site, public GitHub work, LinkedIn profile details, and a live Discord presence from Lanyard.

- Click or tap the canvas, or press Space or Enter while it is visible, to generate a different form.
- Use the reduced-motion toggle to slow the canvas and disable interface transitions.
- Scroll into the profile for selected open-source work, current experience and study, live activity, capabilities, and contact links.
- Lanyard refreshes every 30 seconds and falls back to useful idle and unavailable states.

## Development

```bash
yarn install
yarn dev
```

Create a production build with `yarn build`.
