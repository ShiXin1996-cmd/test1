import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  base: '/test1/'  // 将此处的 'repository-name' 替换为你的 GitHub 仓库名称
})
