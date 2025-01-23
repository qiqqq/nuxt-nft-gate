import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  nftAddress?: string | string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-nft-gate',
    configKey: 'nftGate',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add composables
    addImportsDir(resolver.resolve('runtime/composables'))

    // Add components
    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
