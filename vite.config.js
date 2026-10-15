import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The site will be served from https://paracetalom.github.io/kittinon-portfolio/ (GitHub Pages),
  // so every asset URL must start with this sub-path. It must match the GitHub repository name.
  base: '/kittinon-portfolio/',
})
