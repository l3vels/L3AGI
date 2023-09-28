import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import graphql from '@rollup/plugin-graphql'
import svgrPlugin from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible'
import eslint from 'vite-plugin-eslint'

// import packageJson from "./package.json";
// const deps = packageJson.dependencies;

// https://vitejs.dev/config/

export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [
    graphql() as any,
    eslint({ emitWarning: false, cache: false }),
    react(),
    envCompatible(),
    viteTsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
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
    cssCodeSplit: false,
    sourcemap: true,
  },
})
