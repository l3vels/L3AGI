import {
  web3Accounts,
  web3Enable,
  web3FromSource,
  web3AccountsSubscribe,
} from '@polkadot/extension-dapp'
import { stringToHex } from '@polkadot/util'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'

import { useNavigate, useOutlet, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { readme } from './constants'

const Wallets = () => {
  const [wallets, setWallets] = useState<any>(null)

  const handleFetchWallets = async () => {
    await web3Enable('my cool dapp')
    const allAccounts = await web3Accounts()
    setWallets(allAccounts)
  }

  useEffect(() => {
    handleFetchWallets()
  }, [])

  const navigate = useNavigate()
  const outlet = useOutlet()

  const params = useParams()
  const { walletId } = params

  return (
    <div>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledLeftColumn>
              <ListHeader title={t('wallets')} />
              {wallets?.map((wallet: any) => {
                return (
                  <MiniToolCard
                    key={wallet.address}
                    onClick={() => navigate(`/wallets/${wallet.address}`)}
                    name={wallet.meta.name}
                    logo={
                      'https://www.shutterstock.com/image-vector/wallet-icon-trendy-flat-style-260nw-414685651.jpg'
                    }
                    picked={wallet.address === walletId}
                  />
                )
              })}
            </StyledLeftColumn>

            <StyledChatWrapper>
              {!outlet && (
                <>
                  <ReactMarkdown>{readme}</ReactMarkdown>
                </>
              )}
              {outlet}
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
    </div>
  )
}

export default Wallets
