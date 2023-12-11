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
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './src/index.tsx', // Main app entry point
        widget: './src/TestComp.tsx', // Widget entry point
      },
      external: ['react', 'react-dom'],
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        format: 'es', // or 'cjs' for CommonJS, or 'umd' for UMD
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      // plugins: [
      //   // Add a plugin to extract CSS into separate files for each entry point
      //   {
      //     name: 'extract-css',
      //     async generateBundle(outputOptions, bundle) {
      //       const cssFiles: Record<string, string> = {}
      //       for (const fileName in bundle) {
      //         const output = bundle[fileName]
      //         if (output.type === 'asset') {
      //           const entryPoint = fileName.includes('main') ? 'main' : 'widget'
      //           const outputFileName = `assets/${entryPoint}.css`
      //           if (!cssFiles[entryPoint]) {
      //             cssFiles[entryPoint] = ''
      //           }
      //           if (typeof output.source === 'string') {
      //             cssFiles[entryPoint] += output.source
      //           } else {
      //             cssFiles[entryPoint] += new TextDecoder().decode(output.source)
      //           }
      //           delete bundle[fileName]
      //         }
      //       }
      //       Object.keys(cssFiles).forEach(entryPoint => {
      //         this.emitFile({
      //           type: 'asset',
      //           fileName: `assets/${entryPoint}.css`,
      //           source: cssFiles[entryPoint],
      //         })
      //       })
      //     },
      //   },
      // ],
    },
    // lib: {
    //   name: 'widget',
    //   entry: './src/TestComp.tsx', // Widget entry point
    //   formats: ['es'], // Output format, you can add more formats if needed
    //   fileName: 'widget', // Output file name
    // },
    // rollupOptions: {
    //   external: ['react', 'react-dom'],
    //   output: {
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //     },
    //   },
    // },
  },
})
