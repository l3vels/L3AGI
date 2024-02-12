import withRenderModal from 'hocs/withRenderModal'
import Modal from 'share-ui/components/Modal/Modal'
import { StyledFooter, StyledInnerWrapper, StyledModalBody } from './IntegrationListModal'
import {
  StyledChatWrapper,
  StyledDivider,
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

const DatasourceListModal = () => {
  const { closeModal } = useModal()

  const [pickedDatasource, setPickedDatasource] = useState(null as any)

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

  useEffect(() => {
    if (installedDatasources?.length > 0) setPickedDatasource(installedDatasources?.[0]?.id)
    else if (notInstalledDatasources?.length > 0)
      setPickedDatasource(notInstalledDatasources?.[0]?.id)
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
                  onClick={() => setPickedDatasource(datasource.id)}
                  picked={pickedDatasource === datasource.id}
                  name={datasource.name}
                  logo={imageSrc}
                />
              )
            })}

            <StyledHorizontalDivider />

            <ListHeader title={'Marketplace'} />
            {notInstalledDatasources?.map((datasource: any) => {
              const filteredLogos = DATA_LOADER_IMAGES.filter(
                loaderImages => loaderImages.sourceName === datasource.source_type,
              )

              const imageSrc = filteredLogos?.[0]?.imageSrc || ''

              return (
                <MiniToolCard
                  key={datasource.id}
                  onClick={() => setPickedDatasource(datasource.id)}
                  picked={pickedDatasource === datasource.id}
                  name={datasource.name}
                  logo={imageSrc}
                />
              )
            })}
          </StyledLeftColumn>

          <StyledDivider />

          <StyledChatWrapper>
            <StyledInnerWrapper>
              <StyledFooter>
                <ButtonPrimary
                  onClick={handleUpdateDatasource}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {agentDatasources?.includes(pickedDatasource) ? t('remove') : t('install')}
                </ButtonPrimary>
              </StyledFooter>
            </StyledInnerWrapper>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('datasource-list-modal')(DatasourceListModal)
