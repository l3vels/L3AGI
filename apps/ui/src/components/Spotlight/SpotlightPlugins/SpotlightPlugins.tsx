import { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Search from '@l3-lib/ui-core/dist/Search'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import WebPlugins from './PluginGroups/WebPlugins'
import MediaPlugins from './PluginGroups/MediaPlugins'
import CommunityPlugins from './PluginGroups/CommunityPlugins'

const SpotlightPlugins = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledRoot>
      <StyledHeader>
        <Search />
        <TabList size='small'>
          <Tab onClick={() => setActiveTab(0)}>{t('all')}</Tab>
          <Tab onClick={() => setActiveTab(1)}>{t('web3')}</Tab>
          <Tab onClick={() => setActiveTab(2)}>{t('media')}</Tab>
          <Tab onClick={() => setActiveTab(3)}>{t('community')}</Tab>
        </TabList>
      </StyledHeader>

      <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
        <TabPanels noAnimation>
          <TabPanel>
            <StyledInnerTabPanelWrapper>
              <WebPlugins />
              <MediaPlugins />
              <CommunityPlugins />
            </StyledInnerTabPanelWrapper>
          </TabPanel>

          <TabPanel>
            <WebPlugins />
          </TabPanel>

          <TabPanel>
            <MediaPlugins />
          </TabPanel>

          <TabPanel>
            <CommunityPlugins />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledRoot>
  )
}

export default SpotlightPlugins

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 48px;

  width: 878px;
  height: 448px;
  overflow-y: scroll;

  /* Basic foreground/black.1 */

  background: rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
`
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const StyledInnerTabPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 40px;
`
