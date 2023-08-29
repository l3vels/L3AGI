import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'

import contractsImg from '../../assets/contracts.png'
import walletsImg from '../../assets/wallets.png'
import marketsImg from '../../assets/markets.png'
import { useState } from 'react'
import { usePlugins } from './usePlugins'

const CommunityPlugins = () => {
  const { activePlugins, pluginClickHandler } = usePlugins()

  return (
    <PluginList
      title={'Community'}
      description={'Check on the latest plugins built by the community'}
    >
      <PluginItem
        onClick={() => pluginClickHandler('Unreal')}
        isActive={activePlugins.includes('Unreal')}
        image={contractsImg}
        title='Unreal'
        description='Create contracts for any language, and chain, deploy it right away. '
      />
      <PluginItem
        onClick={() => pluginClickHandler('Unity')}
        isActive={activePlugins.includes('Unity')}
        image={walletsImg}
        title='Unity'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Scenario')}
        isActive={activePlugins.includes('Scenario')}
        image={marketsImg}
        title='Scenario'
        description='Integrate and deploy on OpenSea, Rarebly, etcetc etcetc'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Immutable')}
        isActive={activePlugins.includes('Immutable')}
        image={contractsImg}
        title='Immutable'
        description='Create contracts for any language, and chain, deploy it right away. '
      />
    </PluginList>
  )
}

export default CommunityPlugins
