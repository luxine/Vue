import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'
import electron from 'vite-plugin-electron/simple'
import { execSync } from 'node:child_process'
import pkg from './package.json' with { type: 'json' }
import { visualizer } from 'rollup-plugin-visualizer'



export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  let commit = null
  let buildTime = null
  if (process.env.VERSIONRECORD) {
    commit = execSync('git rev-parse --short HEAD').toString().trim()
    buildTime = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  }
  const isElectron = process.env.TARGET === 'electron'
  return {
    base: './',
    assetsInclude: ['**/*.wasm'],
    plugins: [
      wasm(),
      VueDevTools(),
      vue(),
      tailwindcss(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['src/shared'],
        resolvers: [ElementPlusResolver()],
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: './components.d.ts',
        dirs: ['src/components', 'src/views'],
        deep: true,
      }),
      isElectron &&
      electron({
        main: { entry: 'electron/main.ts' },
        preload: { input: 'electron/preload.ts' },
        renderer: {},
      }),
      visualizer({
        open: false,
        filename: 'stats.html'
      })
    ].filter(Boolean),
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __GIT_HASH__: JSON.stringify(commit ?? 'unknown' ),
      __BUILD_TIME__: JSON.stringify(buildTime ?? 'unknown'),
    },
  }
})
