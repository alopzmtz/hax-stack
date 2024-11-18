import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import { resolve } from 'path'

export default defineConfig({
    root: './',
    build: {
        ssr: true,
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.ts'),
                bundle: resolve(__dirname, 'src/bundle.js')
            }
        },
        outDir: resolve(__dirname, 'dist'),
        copyPublicDir: true
    },
    plugins: [
        devServer({ entry: 'src/index.ts' })
    ],
})