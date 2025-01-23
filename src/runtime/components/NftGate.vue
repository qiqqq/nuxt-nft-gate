<template>
  <div>
    <button @click="connectWallet">
      Connect Wallet
    </button>
    <div>
      <template v-if="!isWalletConnected">
        You have to connect Web3 wallet and confirm NFT owership to see the content.
      </template>
      <template v-else-if="!isNftHolder">
        You have to be NFT holder to see the content.
      </template>
      <slot v-if="isNftHolder">
        NFT gated content
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const { connectWallet, isWalletConnected, isNftHolder } = useNftGate()
</script>
