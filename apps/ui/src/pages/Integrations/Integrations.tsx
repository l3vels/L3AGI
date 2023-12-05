import { useState } from 'react'

import Toolkit from 'pages/Toolkit'
import Voices from 'plugins/contact/pages/Voice'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import { t } from 'i18next'
import { StyledTabListWrapper, StyledTabRootWrapper } from 'styles/tabStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Integrations = () => {
  const { getIntegrationModules } = useGetAccountModule()

  const toolkitModule = getIntegrationModules('toolkit')
  const voiceModule = getIntegrationModules('voices')

  const isToolkit = toolkitModule.list
  const isVoice = voiceModule.list

  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const tabQuery = urlParams.get('tab')

  const defaultActiveTab = () => {
    if (!isToolkit) return 1

    if (tabQuery === 'toolkit') return 0
    if (tabQuery === 'voice') return 1
  }

  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0)
  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
    navigate(`/integrations?tab=${tabName}`)
  }

  const { t } = useTranslation()

  return (
    <StyledTabRootWrapper>
      {isVoice && isToolkit && (
        <StyledTabListWrapper>
          <TabList activeTabId={activeTab}>
            <Tab onClick={() => handleTabClick(0, 'toolkit')} disabled={!isToolkit}>
              {t('toolkit')}
            </Tab>
            <Tab onClick={() => handleTabClick(1, 'voice')} disabled={!isVoice}>
              {t('voices')}
            </Tab>
          </TabList>
        </StyledTabListWrapper>
      )}

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>{isToolkit && <Toolkit />}</TabPanel>
          <TabPanel>{isVoice && <Voices />}</TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledTabRootWrapper>
  )
}

export default Integrations
