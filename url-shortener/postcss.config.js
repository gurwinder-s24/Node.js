// tailwind@4 is config free but this configuration is necessary in an Express backend application because:
// Tailwind Requires a Build Step: Tailwind generates a massive amount of utility classes at build time by 
// processing your source CSS file (which contains @import "tailwindcss";) and scanning your HTML templates for used classes. 
// In a server-side rendering (SSR) setup like Express, you need a specific process 
// (usually defined via a postcss.config.mjs file and a build script) to perform this compilation and generate 
// a final, optimized CSS file that the browser can read.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
// commands used to do the setup:
// npm install -D tailwindcss @tailwindcss/postcss postcss postcss-cli
// npm install concurrenly