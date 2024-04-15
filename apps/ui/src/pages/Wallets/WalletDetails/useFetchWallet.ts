import { useState, useEffect } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { useParams } from 'react-router-dom'
import { web3Accounts } from '@polkadot/extension-dapp'

export const useFetchWallet = () => {
  const params = useParams()
  const { walletId } = params
  const [walletDetails, setWalletDetails] = useState(null as any)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWallet = async () => {
      setLoading(true)
      try {
        const allAccounts = await web3Accounts()

        const pickedAccount = allAccounts?.find((account: any) => account.address === walletId)

        const provider = new WsProvider('wss://rpc.polkadot.io')
        const api = await ApiPromise.create({ provider })
        const accountInfo: any = await api.query.system.account(walletId)
        const {
          data: { free: balance },
        } = accountInfo

        setWalletDetails({
          address: walletId,
          balance: balance.toString(),
          name: pickedAccount?.meta.name,
        })
      } catch (err: any) {
        setError(err)
      }
      setLoading(false)
    }

    fetchWallet()
  }, [walletId]) // Dependency array ensures this effect runs only when walletId changes

  return { walletDetails, loading, error }
}
