export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  nftGate: {
    nftAddress: '0x3727aC93ED1FF0472eC91619CfaA011F76A5BAAe',
  },
  compatibilityDate: '2025-01-22',
})