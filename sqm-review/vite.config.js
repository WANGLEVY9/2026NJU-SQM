import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  // GitHub Pages 项目路径
  base: '/2026NJU-SQM/',

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },

  server: {
    port: 5173,
    open: true
  }
})
