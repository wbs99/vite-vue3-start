import path from 'node:path'
import process from 'node:process'
import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    // base: mode === 'production' ? './' : '/',
    // https://cn.vitejs.dev/config/server-options#server-proxy
    server: {
      open: false,
      host: true,
      proxy: {
        '^/gulffine/.*': {
          target: 'http://39.174.213.36:30033',
          changeOrigin: command === 'serve',
          // rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'src/mock',
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['./composables/**'],
        dts: './src/types/auto-import.d.ts',
        vueTemplate: true,
        resolvers: [VantResolver()],
      }),
      Components({
        dirs: ['src/components'],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        dts: '/src/types/components.d.ts',
        resolvers: [VantResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: '[name]',
      }),
    ],

    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('mock') || id.includes('faker')) {
              return 'mock'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            if (id.includes('vant')) {
              return 'vant'
            }
          },
        },
      },
    },
    esbuild: {
      // 打包时移除 console.log
      pure: ['console.log'],
      // 打包时移除 debugger
      drop: ['debugger'],
      // 打包时移除所有注释
      legalComments: 'none',
    },
  }
})
