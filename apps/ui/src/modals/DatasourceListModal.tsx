import withRenderModal from 'hocs/withRenderModal'
import Modal from 'share-ui/components/Modal/Modal'
import { StyledFooter, StyledInnerWrapper, StyledModalBody } from './IntegrationListModal'
import {
  StyledChatWrapper,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'
import { useModal } from 'hooks'
import { useDatasource } from 'pages/Datasource/useDatasource'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { DATA_LOADER_IMAGES } from 'pages/Datasource/constants'
import { useEffect, useState } from 'react'
import { ButtonPrimary } from 'components/Button/Button'
import { t } from 'i18next'
import DatasourceForm from 'pages/Datasource/DatasourceForm'
import CreateDatasourceForm from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import EditDatasourceForm from 'pages/Datasource/DatasourceForm/EditDatasourceForm'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import styled from 'styled-components'

const DatasourceListModal = () => {
  const { closeModal } = useModal()

  const [pickedDatasource, setPickedDatasource] = useState(null as any)
  const [createState, setCreateState] = useState(null as any)
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
  }

  const { data: datasources } = useDatasourcesService()

  const { agentById, isLoading, formik } = useEditAgent()

  const agentDatasources = agentById?.configs.datasources

  const installedDatasources = datasources?.filter((datasource: any) =>
    agentDatasources?.includes(datasource.id),
  )
  const notInstalledDatasources = datasources?.filter(
    (datasource: any) => !agentDatasources?.includes(datasource.id),
  )

  const handleUpdateDatasource = async () => {
    if (!agentDatasources) return
    let updatedValues
    if (agentDatasources.includes(pickedDatasource)) {
      updatedValues = agentDatasources?.filter((toolId: string) => toolId !== pickedDatasource)
    } else {
      updatedValues = [...agentDatasources, pickedDatasource]
    }

    await formik.setFieldValue('agent_datasources', updatedValues)
    formik.submitForm()
  }

  const handlePickDatasource = (id: string) => {
    setPickedDatasource(id)
    setCreateState(null)
  }

  const handleCreateState = (type: string) => {
    setCreateState(type)
    setPickedDatasource(null)
  }

  useEffect(() => {
    if (installedDatasources?.length > 0) handlePickDatasource(installedDatasources?.[0]?.id)
    else if (notInstalledDatasources?.length > 0)
      handlePickDatasource(notInstalledDatasources?.[0]?.id)
  }, [agentDatasources])

  return (
    <Modal
      onClose={() => closeModal('datasource-list-modal')}
      show
      backgroundColor='light'
      noOverlay
    >
      <StyledModalBody>
        <StyledMainWrapper>
          <StyledLeftColumn>
            <ListHeader title={'Installed'} />
            {installedDatasources?.map((datasource: any) => {
              const filteredLogos = DATA_LOADER_IMAGES.filter(
                loaderImages => loaderImages.sourceName === datasource.source_type,
              )

              const imageSrc = filteredLogos?.[0]?.imageSrc || ''

              return (
                <MiniToolCard
                  key={datasource.id}
                  onClick={() => handlePickDatasource(datasource.id)}
                  picked={pickedDatasource === datasource.id}
                  name={datasource.name}
                  logo={imageSrc}
                />
              )
            })}

            <StyledHorizontalDivider />

            <ListHeader
              title={t('datasource')}
              multiOption={[
                {
                  label: `File`,
                  function: () => handleCreateState('File'),
                },
                {
                  label: `MySQL`,
                  function: () => handleCreateState('MySQL'),
                },
                {
                  label: `Postgres`,
                  function: () => handleCreateState('Postgres'),
                },
              ]}
            />
            {notInstalledDatasources?.map((datasource: any) => {
              const filteredLogos = DATA_LOADER_IMAGES.filter(
                loaderImages => loaderImages.sourceName === datasource.source_type,
              )

              const imageSrc = filteredLogos?.[0]?.imageSrc || ''

              return (
                <MiniToolCard
                  key={datasource.id}
                  onClick={() => handlePickDatasource(datasource.id)}
                  picked={pickedDatasource === datasource.id}
                  name={datasource.name}
                  logo={imageSrc}
                />
              )
            })}
          </StyledLeftColumn>

          <StyledChatWrapper>
            {createState ? (
              <CreateDatasourceForm createCallback={handlePickDatasource} type={createState} />
            ) : (
              <StyledInnerWrapper>
                <TabList size='small' activeTabId={activeTab} noBorder>
                  <Tab onClick={() => handleTabClick(0, 'contact')}>{t('info')}</Tab>
                  <Tab onClick={() => handleTabClick(1, 'settings')}>{t('settings')}</Tab>
                </TabList>

                <StyledBody>
                  <TabsContext activeTabId={activeTab}>
                    <TabPanels>
                      <TabPanel>
                        <StyledInnerTabWrapper>
                          <ButtonPrimary
                            onClick={handleUpdateDatasource}
                            disabled={isLoading}
                            loading={isLoading}
                          >
                            {agentDatasources?.includes(pickedDatasource)
                              ? t('remove')
                              : t('install')}
                          </ButtonPrimary>
                        </StyledInnerTabWrapper>
                      </TabPanel>

                      <TabPanel>
                        <EditDatasourceForm incomingDatasourceId={pickedDatasource} />
                      </TabPanel>
                    </TabPanels>
                  </TabsContext>
                </StyledBody>
              </StyledInnerWrapper>
            )}
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('datasource-list-modal')(DatasourceListModal)

const StyledInnerTabWrapper = styled.div`
  width: 100%;

  height: 100%;

  display: flex;

  align-items: flex-end;
  justify-content: flex-end;

  padding-right: 10px;
`
const StyledBody = styled.div`
  margin-top: 10px;
  width: 100%;
  height: calc(100% - 55px);
`
