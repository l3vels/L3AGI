import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  metaMaskWallet,
  // braveWallet,
  // coinbaseWallet,
  // injectedWallet,
  // walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { ReactNode, useMemo } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, goerli, sepolia, polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
// import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const ALCHEMY_SEPOLIA_KEY = 'wfNX-HPejxXWydIk6JTynG8vDKSUHfJH'
const ALCHEMY_POLYGON_POS_KEY = 'HaOeUs5Cw-IBmUDKAGqwD4JpcU5UjzGO'
const ALCHEMY_GOERLI_KEY = '77aIp6bx-kgLM3Mf02zkjanhsPMwt9HC'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, sepolia, polygon, polygonMumbai],
  [
    alchemyProvider({ apiKey: ALCHEMY_SEPOLIA_KEY }),
    alchemyProvider({ apiKey: ALCHEMY_GOERLI_KEY }),
    alchemyProvider({ apiKey: ALCHEMY_POLYGON_POS_KEY }),
    publicProvider(),
  ],
)

export const metaMaskConnector = new MetaMaskConnector({ chains })

// console.log("TESTNETS", import.meta.env.REACT_APP_NEXT_PUBLIC_ENABLE_TESTNETS);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      // coinbaseWallet({ appName: "coin base", chains }),
      // walletConnectWallet({ chains }),
      // braveWallet({ chains }),
      // injectedWallet({ chains }),
    ],
  },
])

type WagmiProps = {
  children: ReactNode
  autoConnect?: boolean
}

export default function Wagmi({ children, autoConnect = true }: WagmiProps) {
  const wagmiClient = useMemo(
    () =>
      createClient({
        autoConnect,
        connectors,
        provider,
        webSocketProvider,
      }),
    [autoConnect],
  )

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={lightTheme({
          borderRadius: 'none',
          // accentColor: "#F2D7AE",
          accentColorForeground: '#000000',
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
