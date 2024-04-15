import { useFetchWallet } from './useFetchWallet'
import Loader from 'share-ui/components/Loader/Loader'

const WalletDetails = () => {
  const { walletDetails, loading } = useFetchWallet()

  if (loading) return <Loader size={50} />

  return (
    <div>
      <div>Address</div>
      <div>{walletDetails?.address}</div>
      <div>Balance</div>
      <div>{walletDetails?.balance}</div>
    </div>
  )
}

export default WalletDetails
