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

export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [
    graphql() as any,
    eslint(),
    react(),
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
    cssCodeSplit: false,
    // cssCodeSplit: true,
    sourcemap: true,
    // rollupOptions: {
    //   input: {
    //     main: './src/index.tsx', // Main app entry point
    //     widget: './src/TestComp.tsx', // Widget entry point
    //   },
    //   external: ['react', 'react-dom'],
    //   output: {
    //     entryFileNames: 'assets/[name].js',
    //     chunkFileNames: 'assets/[name].js',
    //     format: 'es', // or 'cjs' for CommonJS, or 'umd' for UMD
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //     },
    //   },
    // },
    // lib: {
    //   name: 'widget',
    //   entry: './src/TestComp.tsx', // Widget entry point
    //   formats: ['es'], // Output format, you can add more formats if needed
    //   fileName: 'widget', // Output file name
    // },
  },
})
