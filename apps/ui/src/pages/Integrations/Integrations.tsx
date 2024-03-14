import { useEffect, useState } from 'react'

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
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
  StyledRightColumn,
} from 'routes/ChatRouteLayout'
import { useToolsService } from 'services/tool/useToolsService'
import ListHeader from 'routes/components/ListHeader'
import ToolCard from 'pages/Toolkit/components/ToolCard'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { toolLogos } from 'pages/Toolkit/constants'
import { useVoicesService } from 'plugins/contact/services/voice/useVoicesService'
import { voiceLogos } from 'plugins/contact/pages/Voice/constants'
import ToolView from 'pages/Toolkit/ToolView'
import VoiceView from 'plugins/contact/pages/Voice/VoiceView'
import { useToolView } from 'pages/Toolkit/ToolView/useToolView'

import SettingView from 'pages/Settings/SettingView'
import { SETTINGS_FIELDS } from 'pages/Settings/SettingView/useSettingView'
import { settingLogos } from 'pages/Settings/constants'

const Integrations = () => {
  const { getIntegrationModules } = useGetAccountModule()

  const [show, setShow] = useState(false)

  const { refetchConfigs, configsData } = useToolView({})

  const handleShow = async () => {
    if (configsData) {
      setShow(true)
    } else {
      await refetchConfigs()
      setShow(true)
    }
  }

  useEffect(() => {
    handleShow()
  }, [])

  const toolkitModule = getIntegrationModules('toolkit')
  const voiceModule = getIntegrationModules('voices')

  const isToolkit = toolkitModule.list
  const isVoice = voiceModule.list

  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const toolQuery = urlParams.get('tool') || ''
  const voiceQuery = urlParams.get('voice') || ''
  const settingQuery = urlParams.get('setting') || ''

  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  const { t } = useTranslation()

  const { data: tools } = useToolsService()

  const { data: voiceTools } = useVoicesService()

  useEffect(() => {
    if (!toolQuery && !voiceQuery && !settingQuery)
      navigate(`/integrations?tool=${tools?.[0]?.slug}`)
  }, [tools])

  let isSettingsHidden = false

  if (toolQuery) {
    isSettingsHidden =
      tools?.find((tool: any) => tool.slug === toolQuery)?.fields?.length > 0 ? false : true
  } else if (voiceQuery) {
    isSettingsHidden =
      voiceTools?.find((voice: any) => voice.slug === voiceQuery)?.fields?.length > 0 ? false : true
  }

  const activeTools = tools?.filter((tool: any) => tool.is_active === true)
  const activeVoices = voiceTools?.filter((voice: any) => voice.is_active === true)

  const handlePickTool = (slug: string) => {
    navigate(`/integrations?tool=${slug}`)
    setActiveTab(0)
  }
  const handlePickVoice = (slug: string) => {
    navigate(`/integrations?voice=${slug}`)
    setActiveTab(0)
  }
  const handlePickSetting = (slug: string) => {
    navigate(`/integrations?setting=${slug}`)
    setActiveTab(0)
  }

  const llmSettings = SETTINGS_FIELDS?.filter((setting: any) => setting.group === 'llm')
  const vectorDbSettings = SETTINGS_FIELDS?.filter((setting: any) => setting.group === 'vectorDb')

  return (
    <>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledLeftColumn>
              <ListHeader title={t('integrations')} />

              {activeTools?.map((tool: any, index: number) => {
                const filteredLogos = toolLogos.filter(
                  (toolLogo: any) => toolLogo.toolName === tool.name,
                )

                const logoSrc = filteredLogos?.[0]?.logoSrc || ''

                return (
                  <MiniToolCard
                    key={index}
                    onClick={() => handlePickTool(tool.slug)}
                    name={tool.name}
                    logo={logoSrc}
                    picked={toolQuery === tool.slug}
                  />
                )
              })}

              <StyledHorizontalDivider />

              <ListHeader title={`${t('voice')} ${t('integrations')}`} />

              {activeVoices?.map((voice: any, index: number) => {
                const filteredLogos = voiceLogos.filter(
                  (toolLogo: any) => toolLogo.voiceName === voice.name,
                )

                const logoSrc = filteredLogos?.[0]?.logoSrc || ''

                return (
                  <MiniToolCard
                    key={index}
                    onClick={() => handlePickVoice(voice.slug)}
                    name={voice.name}
                    logo={logoSrc}
                    picked={voiceQuery === voice.slug}
                  />
                )
              })}

              <StyledHorizontalDivider />

              <ListHeader title={`${t('LLM')}`} />

              {llmSettings?.map((setting: any, index: number) => {
                const filteredLogos = settingLogos.filter(
                  (toolLogo: any) => toolLogo.settingName === setting.title,
                )

                const logoSrc = filteredLogos?.[0]?.logoSrc || ''

                return (
                  <MiniToolCard
                    key={index}
                    onClick={() => handlePickSetting(setting.slug)}
                    name={setting.title}
                    logo={logoSrc}
                    picked={settingQuery === setting.slug}
                  />
                )
              })}

              <StyledHorizontalDivider />

              <ListHeader title={`${t('VectorDB')}`} />

              {vectorDbSettings?.map((setting: any, index: number) => {
                const filteredLogos = settingLogos.filter(
                  (toolLogo: any) => toolLogo.settingName === setting.title,
                )

                const logoSrc = filteredLogos?.[0]?.logoSrc || ''

                return (
                  <MiniToolCard
                    key={index}
                    onClick={() => handlePickSetting(setting.slug)}
                    name={setting.title}
                    logo={logoSrc}
                    picked={settingQuery === setting.slug}
                  />
                )
              })}
            </StyledLeftColumn>

            <StyledChatWrapper>
              {show && (
                <>
                  {/* <TabList size='small' activeTabId={activeTab} noBorder>
                    <Tab onClick={() => handleTabClick(0)}>{t('How it works')}</Tab>
                    <Tab onClick={() => handleTabClick(1)} disabled={isSettingsHidden}>
                      {t('settings')}
                    </Tab>
                  </TabList> */}

                  <TabsContext activeTabId={activeTab}>
                    <TabPanels>
                      <TabPanel>
                        {toolQuery && <ToolView toolSlug={toolQuery} />}
                        {voiceQuery && <VoiceView voiceSlug={voiceQuery} />}
                        {settingQuery && <SettingView settingSlug={settingQuery} />}
                      </TabPanel>
                      <TabPanel>
                        {toolQuery && <ToolView toolSlug={toolQuery} hideInfo />}
                        {voiceQuery && <VoiceView voiceSlug={voiceQuery} hideInfo />}
                        {settingQuery && <SettingView settingSlug={settingQuery} hideInfo />}
                      </TabPanel>
                    </TabPanels>
                  </TabsContext>
                </>
              )}
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
    </>
  )
}

export default Integrations
