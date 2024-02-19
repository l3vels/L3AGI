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
import { useEffect, useState } from 'react'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import {
  StyledChatWrapper,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import ToolView from 'pages/Toolkit/ToolView'

type IntegrationListModalProps = {}

const IntegrationListModal = () => {
  const [searchText, setSearchText] = useState('')
  const [pickedTool, setPickedTool] = useState(null as any)

  const [activeTab, setActiveTab] = useState(0)

  const { closeModal } = useModal()
  const { formik, isLoading, agentById } = useEditAgent()

  const agentToolsData = agentById?.configs.tools

  const { setFieldValue } = formik

  const { data: toolsData } = useToolsService()

  const activeTools = toolsData?.filter((tool: any) => tool.is_active === true)

  const filteredData = activeTools?.filter((row: { name: string }) => {
    const includesSearchText = row.name.toLowerCase().includes(searchText.toLowerCase())

    return includesSearchText
  })

  const installedTools = filteredData?.filter((tool: any) =>
    agentToolsData?.includes(tool.toolkit_id),
  )
  const notInstalledTools = filteredData?.filter(
    (tool: any) => !agentToolsData?.includes(tool.toolkit_id),
  )

  const handleRemoveTool = async (toolId: string) => {
    const filteredTools = agentToolsData?.filter((agentToolId: string) => agentToolId !== toolId)
    await setFieldValue('agent_tools', filteredTools)
    formik.handleSubmit()
  }

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  const handleUpdateTools = async () => {
    if (!agentToolsData) return
    let updatedValues
    if (agentToolsData.includes(pickedTool?.id)) {
      updatedValues = agentToolsData?.filter((toolId: string) => toolId !== pickedTool?.id)
    } else {
      updatedValues = [...agentToolsData, pickedTool?.id]
    }

    await setFieldValue('agent_tools', updatedValues)
    formik.submitForm()
  }

  useEffect(() => {
    if (installedTools?.length > 0)
      setPickedTool({ slug: installedTools[0].slug, id: installedTools[0].toolkit_id })
    else setPickedTool({ slug: notInstalledTools[0].slug, id: notInstalledTools[0].toolkit_id })
  }, [agentToolsData])

  const isSettingsHidden =
    activeTools?.find((tool: any) => tool.slug === pickedTool?.slug)?.fields?.length > 0
      ? false
      : true

  const handlePickTool = ({ slug, id }: { slug: string; id: string }) => {
    setActiveTab(0)
    setPickedTool({ slug, id })
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
                      handlePickTool({ slug: tool.slug, id: tool.toolkit_id })
                    }}
                    picked={pickedTool?.slug === tool.slug}
                    onDeleteClick={() => handleRemoveTool(tool.toolkit_id)}
                    name={tool.name}
                    logo={logoSrc}
                  />
                </>
              )
            })}

            <StyledHorizontalDivider />

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
                      handlePickTool({ slug: tool.slug, id: tool.toolkit_id })
                    }}
                    picked={pickedTool?.slug === tool.slug}
                    name={tool.name}
                    logo={logoSrc}
                  />
                </>
              )
            })}
          </StyledLeftColumn>

          <StyledChatWrapper>
            {pickedTool && (
              <>
                <TabList size='small' activeTabId={activeTab} noBorder>
                  <Tab onClick={() => handleTabClick(0)}>{t('How it works')}</Tab>
                  <Tab onClick={() => handleTabClick(1)} disabled={isSettingsHidden}>
                    {t('settings')}
                  </Tab>
                </TabList>

                <TabsContext activeTabId={activeTab}>
                  <TabPanels>
                    <TabPanel>
                      {agentToolsData && (
                        <StyledInnerWrapper>
                          <ToolView toolSlug={pickedTool?.slug} hideForm />

                          <StyledFooter>
                            <ButtonPrimary
                              onClick={handleUpdateTools}
                              disabled={isLoading}
                              loading={isLoading}
                            >
                              {agentToolsData.includes(pickedTool?.id) ? t('remove') : t('install')}
                            </ButtonPrimary>
                          </StyledFooter>
                        </StyledInnerWrapper>
                      )}
                    </TabPanel>
                    <TabPanel>
                      <ToolView toolSlug={pickedTool?.slug} hideInfo />
                    </TabPanel>
                  </TabPanels>
                </TabsContext>
              </>
            )}
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('integration-list-modal')(IntegrationListModal)

export const StyledModalBody = styled.div`
  width: 50vw;
  height: 70vh;
`
export const StyledFooter = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  padding-right: 5px;

  position: absolute;

  bottom: 0;
`
export const StyledTextFieldWrapper = styled.div`
  padding: 4px;
`
export const StyledInnerWrapper = styled.div`
  position: relative;

  height: 100%;
`
