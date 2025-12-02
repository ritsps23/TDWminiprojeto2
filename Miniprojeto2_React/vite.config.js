import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ------------------------------------------------------------------
  // Add the base option for correct asset paths on GitHub Pages
  base: '/TDWminiprojeto2/', 
  // ------------------------------------------------------------------
})
