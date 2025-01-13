import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default () => {

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:`
          `
        }
      }
    }
  })
} 


