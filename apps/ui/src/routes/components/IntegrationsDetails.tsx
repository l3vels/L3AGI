import { StyledAgentWrapper, StyledIconButtonWrapper } from 'components/ChatCards/TeamChatCard'
import { StyledSearchOutlineIcon } from 'components/ChatSwitcher/ChatSwitcher'
import TypographyPrimary from 'components/Typography/Primary'
import { FormikProvider } from 'formik'
import { useModal } from 'hooks'
import { t } from 'i18next'
import { useAgentForm } from 'pages/Agents/AgentForm/useAgentForm'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'
import { toolLogos } from 'pages/Toolkit/constants'

import IconButton from 'share-ui/components/IconButton/IconButton'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'

const IntegrationDetails = () => {
  const { openModal, closeModal } = useModal()

  const { toolOptions, tools: toolsData } = useAgentForm({})

  const { formik } = useEditAgent()

  const { setFieldValue, values } = formik

  const { agent_tools } = values

  const tools = toolOptions?.filter((option: any) => agent_tools?.includes(option.value))

  const toolSlugs = toolsData?.map((tool: any) => {
    return { slug: tool.slug, id: tool.toolkit_id }
  })

  const handleOpenToolIntegrationModal = (id: string) => {
    const slug = toolSlugs?.find((slug: any) => slug.id === id)?.slug
    openModal({ name: 'toolkit-modal', data: { toolSlug: slug } })
  }

  const handleRemoveIntegration = async ({ id }: { id: string }) => {
    const filteredValues = agent_tools?.filter((toolId: string) => toolId !== id)

    await setFieldValue('agent_tools', filteredValues)

    formik.submitForm()
  }

  const handleConfirmation = async ({ event, id }: { event: any; id: string }) => {
    event.stopPropagation()

    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await handleRemoveIntegration({ id })

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
    <FormikProvider value={formik}>
      <StyledDetailsBox>
        <StyledDetailHeader>
          <TypographyPrimary
            value={t('integrations')}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          <IconButton
            onClick={() => openModal({ name: 'integration-list-modal' })}
            icon={() => <StyledSearchOutlineIcon size={26} />}
            kind={IconButton.kinds?.TERTIARY}
            size={IconButton.sizes?.SMALL}
          />
        </StyledDetailHeader>

        <StyledCardsWrapper>
          {tools?.map((tool: any) => {
            const filteredLogos = toolLogos.filter(
              (toolLogo: any) => toolLogo.toolName === tool.label,
            )

            const logoSrc = filteredLogos?.[0]?.logoSrc || ''
            return (
              <StyledAgentWrapper
                key={tool?.value}
                onClick={() => handleOpenToolIntegrationModal(tool?.value)}
              >
                <StyledImg src={logoSrc} />

                <TypographyPrimary
                  value={tool.label}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                />

                <StyledIconButtonWrapper className='hiddenButton'>
                  <IconButton
                    kind={IconButton.kinds?.TERTIARY}
                    size={IconButton.sizes?.SMALL}
                    icon={() => <StyledCloseIcon size={20} />}
                    onClick={(event: any) => handleConfirmation({ event: event, id: tool.value })}
                  />
                </StyledIconButtonWrapper>
              </StyledAgentWrapper>
            )
          })}
        </StyledCardsWrapper>
      </StyledDetailsBox>
    </FormikProvider>
  )
}

export default IntegrationDetails

export const StyledIntegrationCard = styled.div`
  display: flex;
  align-items: center;

  height: 40px;

  gap: 4px;

  padding: 5px;
  border-radius: 8px;

  :hover {
    background: ${({ theme }) => theme.body.teamChatCardSelectedColor};
    cursor: pointer;
  }
`

export const StyledImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 4px;
`
export const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const StyledDetailHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 700;
`
const StyledButtonWrapper = styled.div`
  margin-left: auto;
`
