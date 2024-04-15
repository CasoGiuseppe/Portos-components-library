import { resolve } from "node:path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';


export default defineConfig({
  plugins: [    vue(),
    dts({
      outDir: 'dist/types',
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
      exclude: ['src/main.ts']
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@ui': resolve(__dirname, 'src/components'),
      '@tests': resolve(__dirname, 'src/shared/tests'),
      // añadir alias para: composables, assets, helpers
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/global.scss";'
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueComponentsNoatum',
      fileName: (format) => `vue-components-noatum.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
