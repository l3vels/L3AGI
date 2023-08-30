import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'

import contractsImg from 'assets/images/contracts.png'
import walletsImg from 'assets/images/wallets.png'
import marketsImg from 'assets/images/markets.png'
import { usePlugins } from './usePlugins'

const WebPlugins = () => {
  const { activePlugins, pluginClickHandler } = usePlugins()

  return (
    <PluginList title={'Web3'} description={'Here are all of your games, etc'}>
      <PluginItem
        onClick={() => pluginClickHandler('Contracts')}
        isActive={activePlugins.includes('Contracts')}
        image={contractsImg}
        title='Contracts'
        description='Create contracts for any language, and chain, deploy it right away. '
      />
      <PluginItem
        onClick={() => pluginClickHandler('Wallets')}
        isActive={activePlugins.includes('Wallets')}
        image={walletsImg}
        title='Wallets'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Markets')}
        isActive={activePlugins.includes('Markets')}
        image={marketsImg}
        title='Markets'
        description='Integrate and deploy on OpenSea, Rarebly, etcetc etcetc'
      />
    </PluginList>
  )
}

export default WebPlugins
