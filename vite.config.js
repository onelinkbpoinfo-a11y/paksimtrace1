import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
    // Obfuscate ONLY the production build (apply: 'build') — dev/preview is untouched,
    // so the working app stays exactly the same; only the published bundle is hardened.
    obfuscator({
      apply: 'build',
      options: {
        compact: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['base64'],
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        selfDefending: true,
        disableConsoleOutput: false,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
      }
    })
  ]
});