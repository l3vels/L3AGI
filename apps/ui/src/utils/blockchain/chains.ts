interface Chain {
  name: string
  chainId: number
  blockExplorer: {
    name: string
    url: string
  }
}

export enum ChainId {
  Goerli = 5,
  Sepolia = 11155111,
  PolygonMumbai = 80001,
  PolygonMainnet = 137,
  EthereumMainnet = 1,
}

export const CHAINS: Record<number, Chain> = {
  1: {
    name: 'Ethereum',
    chainId: 1,
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
  5: {
    name: 'Goerli',
    chainId: 5,
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
    },
  },
  11155111: {
    name: 'Sepolia',
    chainId: 11155111,
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },
  80001: {
    name: 'Polygon PoS',
    chainId: 80001,
    blockExplorer: {
      name: 'Polygonscan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  137: {
    name: 'Polygon PoS',
    chainId: 137,
    blockExplorer: {
      name: 'Polygonscan',
      url: 'https://polygonscan.com',
    },
  },
}

export function getChain(chainId: number): Chain | undefined {
  return CHAINS[chainId]
}
