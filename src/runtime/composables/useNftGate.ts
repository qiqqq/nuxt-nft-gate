import { ref } from 'vue'
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum: any
  }
}

export default function useNftGate() {
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

      const contractAddress = '0x3727aC93ED1FF0472eC91619CfaA011F76A5BAAe'
      const abi = [
        'function balanceOf(address owner) view returns (uint256)',
        'function ownerOf(uint256 tokenId) view returns (address)',
      ]

      const contract = new ethers.Contract(contractAddress, abi, provider)
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
