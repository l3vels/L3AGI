import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'
import { useTranslation } from 'react-i18next'

import contractsImg from 'assets/images/contracts.png'
import walletsImg from 'assets/images/wallets.png'
import marketsImg from 'assets/images/markets.png'
import { usePlugins } from './usePlugins'

const CommunityPlugins = () => {
  const { t } = useTranslation()
  const { activePlugins, pluginClickHandler } = usePlugins()

  return (
    <PluginList title={t('community')} description={t('community-description')}>
      <PluginItem
        onClick={() => pluginClickHandler('Unreal')}
        isActive={activePlugins.includes('Unreal')}
        image={contractsImg}
        title={t('unreal')}
        description={t('unreal-description')}
      />
      <PluginItem
        onClick={() => pluginClickHandler('Unity')}
        isActive={activePlugins.includes('Unity')}
        image={walletsImg}
        title={t('unity')}
        description={t('unity-description')}
      />
      <PluginItem
        onClick={() => pluginClickHandler('Scenario')}
        isActive={activePlugins.includes('Scenario')}
        image={marketsImg}
        title={t('scenario')}
        description={t('scenario-description')}
      />
      <PluginItem
        onClick={() => pluginClickHandler('Immutable')}
        isActive={activePlugins.includes('Immutable')}
        image={contractsImg}
        title={t('immutable')}
        description={t('immutable-description')}
      />
    </PluginList>
  )
}

export default CommunityPlugins
