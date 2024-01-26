import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import graphql from '@rollup/plugin-graphql'
import svgrPlugin from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible'
import eslint from 'vite-plugin-eslint'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// import packageJson from "./package.json";
// const deps = packageJson.dependencies;

// https://vitejs.dev/config/

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      html = html.replace(
        /<title>(.*?)<\/title>/,
        `<title>${process.env.REACT_APP_TITLE || 'L3AGI'}</title>`,
      )
      html = html.replace(
        /<link rel="icon" href="" \/>/,
        `<link rel="icon" href="${process.env.REACT_APP_FAVICON || '/favicon.ico'}" />`,
      )
      html = html.replace(
        /<meta name="description" content="(.*?)" \/>/,
        `<meta name="description" content="${
          process.env.REACT_APP_CONTENT ||
          `Open-source framework to make AI agents' team collaboration as effective as human collaboration.`
        }" />`,
      )
      return html
    },
  }
}

export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [
    graphql() as any,
    eslint(),
    react(),
    htmlPlugin(),
    envCompatible(),
    viteTsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),

    viteStaticCopy({
      targets: [
        {
          src: 'staticwebapp.config.json',
          dest: '',
        },
      ],
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },

  build: {
    modulePreload: false,
    target: 'esnext',
    // minify: false,
    // minify: 'terser',
    // cssCodeSplit: false,
    cssCodeSplit: false,
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: './src/index.tsx', // Main app entry point
        widget: './src/TestComp.tsx', // Widget entry point
        index: 'index.html',
      },

      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        format: 'es', // or 'cjs' for CommonJS, or 'umd' for UMD

        dir: 'dist',
      },
    },
  },
})
