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

type IntegrationListModalProps = {}

const IntegrationListModal = () => {
  const [searchText, setSearchText] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (id: number) => {
    setActiveTab(id)
  }

  const { closeModal } = useModal()
  const { formik, isLoading } = useEditAgent()

  const { setFieldValue, values } = formik

  const { agent_tools } = values
  const [pickedTools, setPickedTools] = useState(agent_tools)

  const { data: toolsData } = useToolsService()

  const filteredData = toolsData?.filter((row: { name: string }) => {
    const includesSearchText = row.name.toLowerCase().includes(searchText.toLowerCase())

    return includesSearchText
  })

  const handlePickTool = (toolId: string) => {
    if (!agent_tools) return

    let filteredTools = agent_tools
    if (agent_tools.includes(toolId)) {
      filteredTools = agent_tools.filter((agentToolId: string) => agentToolId !== toolId)
    } else {
      filteredTools = [...filteredTools, toolId]
    }

    setFieldValue('agent_tools', filteredTools)
  }

  const installedTools = filteredData?.filter((tool: any) => pickedTools?.includes(tool.toolkit_id))
  const notInstalledTools = filteredData?.filter(
    (tool: any) => !pickedTools?.includes(tool.toolkit_id),
  )

  return (
    <Modal
      onClose={() => closeModal('integration-list-modal')}
      show
      backgroundColor='light'
      noOverlay
    >
      <StyledModalBody>
        <TextField
          placeholder='Search Integrations'
          value={searchText}
          onChange={(value: string) => setSearchText(value || '')}
        />

        <TabList noBorder size='small' activeTabId={activeTab}>
          <Tab onClick={() => handleTabClick(0)}>Installed</Tab>
          <Tab onClick={() => handleTabClick(1)}>MarketPlace</Tab>
        </TabList>

        <FormikProvider value={formik}>
          <TabsContext activeTabId={activeTab}>
            <TabPanels>
              <TabPanel>
                <StyledCardsWrapper>
                  {installedTools?.map((tool: any) => {
                    const filteredLogos = toolLogos.filter(
                      (toolLogo: any) => toolLogo.toolName === tool.name,
                    )

                    const logoSrc = filteredLogos?.[0]?.logoSrc || ''

                    return (
                      <>
                        <ToolCard
                          onClick={() => handlePickTool(tool.toolkit_id)}
                          selected={!agent_tools?.includes(tool.toolkit_id)}
                          size='small'
                          title={tool.name}
                          logoSrc={logoSrc}
                          isDisabled={false}
                        />
                      </>
                    )
                  })}
                </StyledCardsWrapper>
              </TabPanel>
              <TabPanel>
                <StyledCardsWrapper>
                  {notInstalledTools?.map((tool: any) => {
                    const filteredLogos = toolLogos.filter(
                      (toolLogo: any) => toolLogo.toolName === tool.name,
                    )

                    const logoSrc = filteredLogos?.[0]?.logoSrc || ''

                    return (
                      <>
                        <ToolCard
                          onClick={() => handlePickTool(tool.toolkit_id)}
                          size='small'
                          selected={agent_tools?.includes(tool.toolkit_id)}
                          title={tool.name}
                          logoSrc={logoSrc}
                          isDisabled={false}
                        />
                      </>
                    )
                  })}
                </StyledCardsWrapper>
              </TabPanel>
            </TabPanels>
          </TabsContext>

          <StyledFooter>
            <ButtonPrimary
              onClick={async () => {
                await formik.submitForm()
                setPickedTools(agent_tools)
                setActiveTab(0)
              }}
              disabled={isLoading}
              loading={isLoading}
            >
              {activeTab === 0 ? 'Remove' : t('install')}
            </ButtonPrimary>
          </StyledFooter>
        </FormikProvider>
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('integration-list-modal')(IntegrationListModal)

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  gap: 10px;

  height: fit-content;

  /* padding: 5px 2px; */
`

const StyledModalBody = styled.div`
  /* height: 100vh; */
  /* max-height: 600px; */
  padding-bottom: 10px;
  /* width: 100vw; */
  height: 100%;
  min-height: 60vh;
  width: 50vw;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledFooter = styled.div`
  width: 100%;

  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`
