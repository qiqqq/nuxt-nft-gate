export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  experimental: { appManifest: false },
  compatibilityDate: '2025-01-22',
  nftGate: {
    nftAddress: '0x3727aC93ED1FF0472eC91619CfaA011F76A5BAAe',
  },
})
