import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      exclude: [...configDefaults.exclude, 'e2e/*'],
      include: ['**/__tests__/*.spec.{js,tsx,ts}'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
