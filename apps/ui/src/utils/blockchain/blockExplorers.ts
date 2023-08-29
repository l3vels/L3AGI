import { getChain } from './chains'

export function getTransactionUrl(chainId: number, transactionHash: string) {
  const chain = getChain(chainId)
  if (!chain) return ''
  return `${chain.blockExplorer.url}/tx/${transactionHash}`
}

export function getContractUrl(chainId: number, contractAddress: string) {
  const chain = getChain(chainId)
  if (!chain) return ''
  return `${chain.blockExplorer.url}/address/${contractAddress}`
}
