import { ref } from 'vue'
import { ethers } from 'ethers'
import type { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

export default function useNftGate() {
  const runtimeConfig = useRuntimeConfig()

  const isWalletConnected = ref(false)
  const isNftHolder = ref(false)

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        console.error('Please install MetaMask')
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])

      isWalletConnected.value = accounts.length > 0

      console.log(runtimeConfig.public.nftGate.nftAddress)

      const abi = [
        'function balanceOf(address owner) view returns (uint256)',
        'function ownerOf(uint256 tokenId) view returns (address)',
      ]

      const contract = new ethers.Contract(runtimeConfig.public.nftGate.nftAddress, abi, provider)
      const balance = await contract.balanceOf(accounts[0])

      isNftHolder.value = balance > 0
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    connectWallet,
    isWalletConnected,
    isNftHolder,
  }
}
