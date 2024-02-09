import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import TagsRow from './TagsRow'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Button from 'share-ui/components/Button/Button'

import Download from 'share-ui/components/Icon/Icons/components/Download'

import { useLocation, useNavigate } from 'react-router-dom'
import { useModal } from 'hooks'
import { AuthContext } from 'contexts'
import { StyledEditIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyTertiary from 'components/Typography/Tertiary'
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from 'components/Button/Button'

import MenuButton from 'share-ui/components/MenuButton/MenuButton'

import { useAgents } from 'pages/Agents/useAgents'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useModelsService } from 'services'
import { AgentWithConfigs } from 'types'
import MenuDotsOutline from 'share-ui/components/Icon/Icons/components/MenuDotsOutline'
import CopyButton from 'components/CopyButton'
import { useVoicesService } from 'plugins/contact/services/voice/useVoicesService'
import { isVoiceAgent } from 'utils/agentUtils'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import { FormikProvider } from 'formik'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import { useAgentForm } from 'pages/Agents/AgentForm/useAgentForm'
import { textSlicer } from 'utils/textSlicer'
import { useChatsService } from 'services/chat/useChatsService'

type AgentViewDetailBoxProps = {
  agentData: AgentWithConfigs
}

const AgentVIewDetailBox = ({ agentData }: AgentViewDetailBoxProps) => {
  const { formik } = useEditAgent()

  const {
    modelOptions,
    datasourceOptions,
    toolOptions,
    voiceSynthesizerOptions,
    voiceTranscriberOptions,
    handleUploadAvatar,
    avatarIsLoading,
    integrationOptions,
    agentOptions,
    voiceToolOptions,
    voiceModelOptions,
  } = useAgentForm(formik)

  const { t } = useTranslation()
  const { getChatModules } = useGetAccountModule()
  const agentModule = getChatModules('agent')

  const { user } = React.useContext(AuthContext)

  const location = useLocation()

  const { deleteAgentHandler } = useAgents()

  const navigate = useNavigate()

  const { closeModal, openModal } = useModal()

  const { data: models } = useModelsService()

  const { data: voiceTools } = useVoicesService()

  const { agent, configs } = agentData

  const { name, description, role, creator, is_template, agent_type } = agent

  const {
    model,
    temperature,
    transcriber: transcriberId,
    synthesizer: synthesizerId,
    voice_id,
  } = configs

  const isCreator = user?.id === agent?.created_by

  const agentModel = models?.filter(modelData => modelData.id === model).map(model => model.name)

  const agentTranscriber = voiceTools?.find((item: any) => item.id === transcriberId)?.name
  const agentSynthesizer = voiceTools?.find((item: any) => item.id === synthesizerId)?.name

  const handleEdit = () => {
    closeModal('agent-view-modal')
    navigate(`/agents/${agent?.id}/edit-agent`)
  }

  const handleCreateChat = () => {
    openModal({ name: 'chat-link-modal', data: { agentId: agent.id } })
  }

  const handleScheduleRun = () => {
    const chatId = new URLSearchParams(location.search).get('chat')

    openModal({ name: 'schedule-run-modal', data: { id: chatId || agent.id, type: 'agent' } })
  }

  const { shortText: shortId } = textSlicer(agent?.id, 30)

  const { refetch } = useChatsService({})

  const handleOpenCreateSessionModal = () => {
    openModal({ name: 'chat-link-modal', data: { agentId: agent?.id, callback: refetch } })
  }

  return (
    <FormikProvider value={formik}>
      <StyledDetailsBox>
        <StyledWrapper>
          <StyledNameWrapper>
            <TypographyPrimary
              value={'Details'}
              type={Typography.types.Heading}
              size={Typography.sizes.md}
            />

            <StyledButtonsWrapper>
              {/* {agentModule?.edit && isCreator && (
              <StyledIconButton>
                <IconButton
                onClick={handleEdit}
                  icon={() => <StyledEditIcon />}
                  size={IconButton.sizes?.SMALL}
                  kind={IconButton.kinds?.TERTIARY}
                  ariaLabel='Edit'
                />
              </StyledIconButton>
            )} */}

              {agentModule?.delete && isCreator && (
                <MenuButton component={() => <MenuDotsOutline size={20} />}>
                  <StyledMenuButtonsWrapper>
                    {/* <ButtonTertiary onClick={handleCreateChat}>{t('create-session')}</ButtonTertiary> */}
                    <ButtonTertiary onClick={handleScheduleRun}>{t('schedule-run')}</ButtonTertiary>
                    <ButtonTertiary onClick={() => deleteAgentHandler(agent.id)}>
                      {t('delete-agent')}
                    </ButtonTertiary>
                  </StyledMenuButtonsWrapper>
                </MenuButton>
              )}
            </StyledButtonsWrapper>
          </StyledNameWrapper>
          {/* {creator && (
          <TypographySecondary
          value={`By ${creator.name}`}
          type={Typography.types.LABEL}
            size={Typography.sizes.xss}
            />
        )} */}
          {/* {!isCreator && (
          <div>
            <ButtonPrimary
              size={Button.sizes?.SMALL}
              onClick={() => {
                closeModal('agent-view-modal')
                navigate(`/agents/create-agent?agentId=${agent.id}`)
              }}
            >
              <StyledInnerButtonWrapper>
                <Download size={28} />
                {t('add')}
              </StyledInnerButtonWrapper>
            </ButtonPrimary>
          </div>
        )} */}
        </StyledWrapper>

        {description && (
          <>
            <StyledWrapper>
              <TypographyTertiary
                value={description}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
            </StyledWrapper>
          </>
        )}

        <StyledDivider />

        <StyledWrapper>
          <StyledDropdownWrapper>
            <TypographyPrimary
              value={t('model')}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />
            <AgentDropdown
              // label={t('model')}
              fieldName={'agent_model'}
              setFieldValue={formik?.setFieldValue}
              fieldValue={formik?.values.agent_model || ''}
              options={agent_type !== 'text' ? voiceModelOptions : modelOptions}
              onChange={async () => {
                await formik?.setFieldValue('agent_model', '')
                await formik?.submitForm()
              }}
              optionSize={'small'}
              size={'small'}
            />
          </StyledDropdownWrapper>

          {agent && (
            <TagsRow
              title={t('ID')}
              items={[shortId]}
              customButton={
                <CopyButton onCopyClick={() => navigator.clipboard.writeText(agent?.id)} />
              }
            />
          )}

          {role && <TagsRow title={t('role')} items={[role]} />}

          {/* {agentModel?.length > 0 && <TagsRow title={t('model')} items={agentModel} />} */}

          {temperature && <TagsRow title={t('temperature')} items={[temperature.toString()]} />}

          <TagsRow title={t('template')} items={[is_template ? 'True' : 'False']} />

          <>
            {agentTranscriber && <TagsRow title={t('transcriber')} items={[agentTranscriber]} />}
            {agentSynthesizer && <TagsRow title={t('synthesizer')} items={[agentSynthesizer]} />}
            {voice_id && <TagsRow title={t('voice-id')} items={[voice_id]} />}
          </>
        </StyledWrapper>

        <ButtonSecondary
          onClick={handleOpenCreateSessionModal}
          size='small'
          // rightIcon={() => <Add size={20} />}
        >
          {t('create-session')}
        </ButtonSecondary>
      </StyledDetailsBox>
    </FormikProvider>
  )
}

export default AgentVIewDetailBox

export const StyledDetailsBox = styled.div`
  background: ${({ theme }) => theme.body.componentsWrapperBg};
  /* border: ${({ theme }) => theme.body.secondaryBorder}; */
  width: 100%;
  max-width: 300px;
  min-width: 300px;
  height: fit-content;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  white-space: pre-line;
`

export const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.body.placeHolderColor};
`
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`
export const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 5px;

  font-weight: 700;
`
export const StyledMenuButtonsWrapper = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  padding: 10px;
  border-radius: 10px;

  min-width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

export const StyledIconButton = styled.div`
  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`
const StyledDropdownWrapper = styled.div`
  font-weight: 500;
`
