import { useEffect, useState } from 'react'

import Toolkit from 'pages/Toolkit'
import Voices from 'plugins/contact/pages/Voice'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { t } from 'i18next'
import {
  StyledTab,
  StyledTabListSpan,
  StyledTabListWrapper,
  StyledTabRootWrapper,
} from 'styles/tabStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useLocation, useNavigate } from 'react-router-dom'

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

  return (
    <StyledTabRootWrapper>
      {isVoice && isToolkit && (
        <StyledTabListWrapper>
          <TabList activeTabId={activeTab}>
            <StyledTab onClick={() => handleTabClick(0, 'toolkit')} isDisabled={!isToolkit}>
              <StyledTabListSpan>{t('toolkit')}</StyledTabListSpan>
            </StyledTab>
            <StyledTab onClick={() => handleTabClick(1, 'voice')} isDisabled={!isVoice}>
              <StyledTabListSpan>{t('voices')}</StyledTabListSpan>
            </StyledTab>
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
