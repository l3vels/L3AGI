import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'

import reportsImg from 'assets/images/reports.png'
import levelsImg from 'assets/images/levels.png'
import assetsImg from 'assets/images/assets.png'
import rewardsImg from 'assets/images/rewards.png'
import achievementsImg from 'assets/images/achievements.png'
import attributesImg from 'assets/images/attributes.png'
import { usePlugins } from './usePlugins'

const MediaPlugins = () => {
  const { activePlugins, pluginClickHandler } = usePlugins()

  return (
    <PluginList title={'L3'} description={'We have created a'}>
      <PluginItem
        onClick={() => pluginClickHandler('Reports')}
        isActive={activePlugins.includes('Reports')}
        image={reportsImg}
        title='Reports'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Levels')}
        isActive={activePlugins.includes('Levels')}
        image={levelsImg}
        title='Levels'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Assets')}
        isActive={activePlugins.includes('Assets')}
        image={assetsImg}
        title='Assets'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Rewards')}
        isActive={activePlugins.includes('Rewards')}
        image={rewardsImg}
        title='Rewards'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Achievements')}
        isActive={activePlugins.includes('Achievements')}
        image={achievementsImg}
        title='Achievements'
        description='Support wallets into your games, airdrop user assets and more'
      />
      <PluginItem
        onClick={() => pluginClickHandler('Attributes')}
        isActive={activePlugins.includes('Attributes')}
        image={attributesImg}
        title='Attributes'
        description='Support wallets into your games, airdrop user assets and more'
      />
    </PluginList>
  )
}

export default MediaPlugins
