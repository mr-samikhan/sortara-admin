import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@vgl/assets': path.resolve(__dirname, './public/assets'),
      '@vgl/core': path.resolve(__dirname, './src/core/core.ts'),
      '@vgl/hooks': path.resolve(__dirname, './src/hooks/hooks.ts'),
      '@vgl/utils': path.resolve(__dirname, './src/utils/utils.ts'),
      '@vgl/firebase': path.resolve(__dirname, './src/firebase.ts'),
      '@vgl/types': path.resolve(__dirname, './src/types/types.ts'),
      '@vgl/layout': path.resolve(__dirname, './src/layout/layout.ts'),
      '@vgl/stores': path.resolve(__dirname, './src/stores/stores.ts'),
      '@vgl/styles': path.resolve(__dirname, './src/styles/styles.ts'),
      '@vgl/modules': path.resolve(__dirname, './src/modules/modules.ts'),
      '@vgl/helpers': path.resolve(__dirname, './src/helpers/helpers.ts'),
      '@vgl/screens': path.resolve(__dirname, './src/screens/screens.ts'),
      '@vgl/services': path.resolve(__dirname, './src/services/services.ts'),
      '@vgl/providers': path.resolve(__dirname, './src/providers/providers.ts'),
      '@vgl/constants': path.resolve(__dirname, './src/constants/constants.ts'),
      '@vgl/components': path.resolve(
        __dirname,
        './src/components/components.ts'
      ),
    },
  },
  plugins: [react()],
  base: 'https://sortara-admin.web.app',
})
