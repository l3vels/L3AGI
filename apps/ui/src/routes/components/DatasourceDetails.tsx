import TypographyPrimary from 'components/Typography/Primary'
import { t } from 'i18next'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import Typography from 'share-ui/components/typography/Typography'
import {
  StyledCardsWrapper,
  StyledDetailHeader,
  StyledImg,
  StyledIntegrationCard,
} from './IntegrationsDetails'
import { AgentWithConfigs } from 'types'
import { useDatasource } from 'pages/Datasource/useDatasource'
import { DATA_LOADER_IMAGES } from 'pages/Datasource/constants'
import { StyledAgentWrapper, StyledIconButtonWrapper } from 'components/ChatCards/TeamChatCard'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'

import { useEditAgent } from 'pages/Agents/useEditAgent'
import { useModal } from 'hooks'
import { StyledSearchOutlineIcon } from 'components/ChatSwitcher/ChatSwitcher'

const DatasourceDetails = () => {
  const { openModal, closeModal } = useModal()
  const { datasources } = useDatasource()

  const { formik } = useEditAgent()

  const { setFieldValue, values } = formik

  const { agent_datasources } = values

  const filteredDatasources = datasources?.filter((datasource: any) =>
    agent_datasources?.includes(datasource?.id),
  )

  const handleRemoveDatasource = async ({ id }: { id: string }) => {
    const filteredValues = agent_datasources?.filter((datasourceId: string) => datasourceId !== id)

    await setFieldValue('agent_datasources', filteredValues)

    formik.submitForm()
  }

  const handleConfirmation = async ({ event, id }: { event: any; id: string }) => {
    event.stopPropagation()

    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await handleRemoveDatasource({ id })

            closeModal('delete-confirmation-modal')
          } catch (e) {
            closeModal('delete-confirmation-modal')
          }
        },
        label: `${t('remove')} ${t('integration')}?`,
      },
    })
  }

  return (
    <StyledDetailsBox>
      <StyledDetailHeader>
        <TypographyPrimary
          value={t('datasources')}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
        />

        <IconButton
          onClick={() => openModal({ name: 'datasource-list-modal' })}
          icon={() => <StyledSearchOutlineIcon size={26} />}
          kind={IconButton.kinds?.TERTIARY}
          size={IconButton.sizes?.SMALL}
        />
      </StyledDetailHeader>
      <StyledCardsWrapper>
        {filteredDatasources?.map((datasource: any) => {
          const filteredLogos = DATA_LOADER_IMAGES.filter(
            loaderImages => loaderImages.sourceName === datasource.source_type,
          )

          const imageSrc = filteredLogos?.[0]?.imageSrc || ''

          return (
            <StyledAgentWrapper
              key={datasource.id}
              // onClick={() => handleOpenToolIntegrationModal(tool?.value)}
            >
              <StyledImg src={imageSrc} />

              <TypographyPrimary
                value={datasource.name}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />

              <StyledIconButtonWrapper className='hiddenButton'>
                <IconButton
                  kind={IconButton.kinds?.TERTIARY}
                  size={IconButton.sizes?.SMALL}
                  icon={() => <StyledCloseIcon size={20} />}
                  onClick={(event: any) => handleConfirmation({ event: event, id: datasource.id })}
                />
              </StyledIconButtonWrapper>
            </StyledAgentWrapper>
          )
        })}
      </StyledCardsWrapper>
    </StyledDetailsBox>
  )
}

export default DatasourceDetails
