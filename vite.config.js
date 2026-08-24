import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],

  /* The live site is served from a repository subpath:
     https://syammm23.github.io/portfolio/
     Without this, built asset URLs point at /assets/... and 404, because the
     domain root is not the site root. Dev stays on "/" so localhost:5173
     works without the prefix.

     `isPreview` matters: `vite preview` runs with command "serve", so keying
     only off `command` would serve the built site at "/" while its HTML asks
     for "/portfolio/..." — every asset 404s and the page renders blank, which
     is exactly the failure this comment exists to prevent.

     If this ever moves to a domain root (a custom domain, or Netlify via
     netlify.toml), change the production value back to "/". */
  base: command === "build" || isPreview ? "/portfolio/" : "/",
}));
