import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import dataSrcPlugin from './datasrc-babel-plugin.js'

// Expose the build identity as <meta> tags so the extension can read the release
// (build flavor + commit SHA) straight off the deployed DOM. This is the client
// half of the "releaseId -> repo/SHA" model in the technical design (§9 Step 0);
// here it is unsigned build metadata, which is enough for the demo.
function buildInfoMeta(buildFlavor: string, buildSha: string): Plugin {
  return {
    name: 'c2f-build-info',
    transformIndexHtml(): HtmlTagDescriptor[] {
      return [
        { tag: 'meta', attrs: { name: 'c2f-build-flavor', content: buildFlavor }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'c2f-build-sha', content: buildSha }, injectTo: 'head' },
      ]
    },
  }
}

// Staging-instrumented build. To give the Click-to-Fix extension enriched data on
// a *deployed* site (not just dev), the build must emit:
//   - data-src / data-comp stamps on every host element (resolution R1),
//   - sourcemaps, so a location can be mapped back to source (R2, "the map"),
//   - un-mangled component/function names, so the runtime fiber walk still yields
//     real names for props + hierarchy enrichment.
// Instrumentation is on in dev and on for `vite build` unless CLICK_TO_FIX=0, so a
// Vercel deploy is instrumented by default. A real production app would invert this
// to opt-in (design doc §5/§12) so source paths never ship to end users.
export default defineConfig(({ command }) => {
  const instrument = command === 'serve' || process.env.CLICK_TO_FIX !== '0'
  const buildSha =
    process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'local'
  const buildFlavor = instrument ? 'staging-instrumented' : 'production'

  return {
    plugins: [
      react({
        babel: {
          plugins: instrument ? [dataSrcPlugin] : [],
        },
      }),
      buildInfoMeta(buildFlavor, buildSha),
    ],
    server: {
      port: 5173,
      strictPort: true,
    },
    build: {
      sourcemap: instrument,
    },
    esbuild: {
      keepNames: instrument,
    },
  }
})
