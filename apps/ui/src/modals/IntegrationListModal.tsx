import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'

import { useModal } from 'hooks'
import styled from 'styled-components'
import TextField from 'share-ui/components/TextField/TextField'
import { useToolsService } from 'services/tool/useToolsService'
import ToolCard from 'pages/Toolkit/components/ToolCard'
import { toolLogos } from 'pages/Toolkit/constants'
import { FormikProvider } from 'formik'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import { ButtonPrimary } from 'components/Button/Button'

import { t } from 'i18next'
import { useState } from 'react'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import {
  StyledChatWrapper,
  StyledDivider,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import ToolView from 'pages/Toolkit/ToolView'

type IntegrationListModalProps = {}

const IntegrationListModal = () => {
  const [searchText, setSearchText] = useState('')
  const [pickedSlug, setPickedSlug] = useState(null as any)
  const [pickedTools, setPickedTools] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState(0)

  const { closeModal } = useModal()
  const { formik, isLoading, agentById } = useEditAgent()

  const agentToolsData = agentById?.configs.tools

  const { setFieldValue, values } = formik

  const { agent_tools } = values

  const { data: toolsData } = useToolsService()

  const filteredData = toolsData?.filter((row: { name: string }) => {
    const includesSearchText = row.name.toLowerCase().includes(searchText.toLowerCase())

    return includesSearchText
  })

  const handlePickTool = (toolId: string) => {
    if (!agent_tools) return

    let filteredTools = agent_tools
    if (agent_tools.includes(toolId)) {
      setPickedTools(pickedTools.filter((agentToolId: string) => agentToolId !== toolId))
      filteredTools = agent_tools.filter((agentToolId: string) => agentToolId !== toolId)
    } else {
      setPickedTools((prevState: any) => [...prevState, toolId])
      filteredTools = [...filteredTools, toolId]
    }

    setFieldValue('agent_tools', filteredTools)
  }

  const installedTools = filteredData?.filter((tool: any) =>
    agentToolsData?.includes(tool.toolkit_id),
  )
  const notInstalledTools = filteredData?.filter(
    (tool: any) => !agentToolsData?.includes(tool.toolkit_id),
  )

  const handleRemoveTool = async (toolId: string) => {
    const filteredTools = agent_tools?.filter((agentToolId: string) => agentToolId !== toolId)
    await setFieldValue('agent_tools', filteredTools)
    formik.handleSubmit()
  }

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <Modal
      onClose={() => closeModal('integration-list-modal')}
      show
      backgroundColor='light'
      noOverlay
    >
      <StyledModalBody>
        <StyledMainWrapper>
          <StyledLeftColumn>
            <StyledTextFieldWrapper>
              <TextField
                placeholder='Search Integrations'
                value={searchText}
                onChange={(value: string) => setSearchText(value || '')}
              />
            </StyledTextFieldWrapper>
            <ListHeader title={'Installed'} />
            {installedTools?.map((tool: any) => {
              const filteredLogos = toolLogos.filter(
                (toolLogo: any) => toolLogo.toolName === tool.name,
              )

              const logoSrc = filteredLogos?.[0]?.logoSrc || ''

              return (
                <>
                  <MiniToolCard
                    onClick={() => {
                      setPickedSlug(tool.slug)
                      setFieldValue('agent_tools', agentToolsData)
                    }}
                    picked={pickedSlug === tool.slug}
                    onDeleteClick={() => handleRemoveTool(tool.toolkit_id)}
                    name={tool.name}
                    logo={logoSrc}
                  />
                </>
              )
            })}

            <ListHeader title={'Marketplace'} />
            {notInstalledTools?.map((tool: any) => {
              const filteredLogos = toolLogos.filter(
                (toolLogo: any) => toolLogo.toolName === tool.name,
              )

              const logoSrc = filteredLogos?.[0]?.logoSrc || ''

              return (
                <>
                  <MiniToolCard
                    onClick={() => {
                      handlePickTool(tool.toolkit_id)
                      setPickedSlug(null)
                    }}
                    picked={agent_tools?.includes(tool.toolkit_id) || false}
                    name={tool.name}
                    logo={logoSrc}
                  />
                </>
              )
            })}
          </StyledLeftColumn>

          <StyledDivider />

          <StyledChatWrapper>
            {pickedSlug && (
              <>
                <TabList size='small' activeTabId={activeTab} noBorder>
                  <Tab onClick={() => handleTabClick(0)}>{t('How it works')}</Tab>
                  <Tab onClick={() => handleTabClick(1)}>{t('settings')}</Tab>
                </TabList>

                <TabsContext activeTabId={activeTab}>
                  <TabPanels>
                    <TabPanel></TabPanel>
                    <TabPanel>
                      <ToolView toolSlug={pickedSlug} />
                    </TabPanel>
                  </TabPanels>
                </TabsContext>
              </>
            )}

            <StyledFooter>
              {pickedTools?.length > 0 && (
                <ButtonPrimary
                  onClick={async () => {
                    await formik.submitForm()
                    setPickedTools([])
                  }}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {t('install')} {pickedTools?.length}x
                </ButtonPrimary>
              )}
            </StyledFooter>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('integration-list-modal')(IntegrationListModal)

const StyledModalBody = styled.div`
  width: 50vw;
  height: 70vh;
`
const StyledFooter = styled.div`
  width: 100%;

  margin-top: auto;
  display: flex;
  justify-content: flex-end;

  padding-right: 5px;
`
const StyledTextFieldWrapper = styled.div`
  padding: 4px;
`
