# Syam Kumar Prasad — Portfolio

Personal portfolio built with **React 19** and **Vite 7**. Dark theme, fully
responsive, no UI framework — the design system is hand-written CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

Other commands:

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

## Editing your content

**You only need to edit one file: [`src/data/content.js`](src/data/content.js).**

Everything on the page — your name, bio, skills, jobs, education and projects —
comes from that file. You do not need to touch any React code.

### Adding a new project

Open `src/data/content.js`, find the `projects` array, and copy an existing
block:

```js
{
  title: "My New Project",
  blurb: "One or two sentences describing what it does.",
  icon: "fas fa-rocket",        // any Font Awesome 6 icon name
  color: "#f59e0b",             // accent colour for the card
  tags: ["React", "Node.js"],   // small pills under the description
  live: "https://my-project.netlify.app",   // or null to hide the button
  code: "https://github.com/Syammm23/my-repo", // or null to hide the button
  subtitle: "Personal project", // small label above the title
  featured: false,              // true = card spans the full width on desktop
},
```

Rules for the two link fields:

| Value | Result |
| --- | --- |
| `live: "https://..."` | Shows a **Live Demo** button |
| `code: "https://..."` | Shows a **Source Code** button |
| both `null` | Shows a muted **Private project** label instead |

### Enabling the Download Resume button

1. Put your PDF in the `public/` folder, e.g. `public/Syam-Resume.pdf`
2. In `src/data/content.js`, set `resume: "/Syam-Resume.pdf"`

The button is hidden while `resume` is `null`.

### Work experience durations are automatic

Each job in the `experience` array has a `start` date and an `end` date:

```js
{ start: "2025-10-01", end: null }   // null = current role, shows "· Present"
{ start: "2024-09-01", end: "2025-07-01" }  // finished role
```

Durations recalculate every time the page loads, so the site never shows a
stale month count. The **Total Work Exp** stat merges overlapping date ranges,
so holding two roles at once is not double-counted.

## Project structure

```
src/
  data/content.js   <- edit this: all page content
  hooks.js          <- date maths, scroll spy, reveal-on-scroll
  App.jsx           <- page structure and components
  App.css           <- design system and all styling
  index.css         <- minimal base reset only
index.html          <- SEO, Open Graph and JSON-LD metadata
```

## Deploying

Configured for Netlify via [`netlify.toml`](netlify.toml) — build command
`npm run build`, publish directory `dist`, with an SPA redirect rule.

After deploying, update the URLs in `index.html` (the `canonical`, `og:url`
and `og:image` tags) to match your real domain so link previews work correctly.
