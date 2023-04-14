import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 导入按需引入vant组件插件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// 导入打包精灵图插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

export default defineConfig({
  // base: '/', // 服务器中放置打包代码的目录名
  plugins: [
    vue({
      reactivityTransform: true
    }),
    // 配置vant组件按需引入
    // 项目src/components中的组件也会被自动全局注册
    Components({
      // 关闭自动生成类型文件
      dts: false,
      resolvers: [VantResolver()]
    }),
    // 配置打包精灵图svg图片的位置
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd()), 'src/assets/icons']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName(name) {
          const match = DRIVE_LETTER_REGEX.exec(name)
          const driveLetter = match ? match[0] : ''
          return (
            driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
          )
        }
      }
    }
  }
})
