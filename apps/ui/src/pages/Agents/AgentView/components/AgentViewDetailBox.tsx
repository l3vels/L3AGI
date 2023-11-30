import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TagsRow from './TagsRow'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'

import Download from '@l3-lib/ui-core/dist/icons/Download'

import { useLocation, useNavigate } from 'react-router-dom'
import { useModal } from 'hooks'
import { AuthContext } from 'contexts'
import { StyledEditIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyTertiary from 'components/Typography/Tertiary'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import { useAgents } from 'pages/Agents/useAgents'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useModelsService } from 'services'
import { AgentWithConfigs } from 'types'

type AgentViewDetailBoxProps = {
  agentData: AgentWithConfigs
}

const AgentVIewDetailBox = ({ agentData }: AgentViewDetailBoxProps) => {
  const { t } = useTranslation()
  const { getChatModules } = useGetAccountModule()
  const agentModule = getChatModules('agent')

  const { user } = React.useContext(AuthContext)

  const location = useLocation()

  const { deleteAgentHandler } = useAgents()

  const navigate = useNavigate()

  const { closeModal, openModal } = useModal()

  const { data: models } = useModelsService()

  const { agent, configs } = agentData

  const { name, description, role, creator, is_template } = agent

  const { model, temperature } = configs

  const isCreator = user?.id === agent?.created_by

  const agentModel = models?.filter(modelData => modelData.id === model).map(model => model.name)

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

  return (
    <StyledDetailsBox>
      <StyledWrapper>
        <StyledNameWrapper>
          <TypographyPrimary
            value={name}
            type={Typography.types.Heading}
            size={Typography.sizes.md}
          />

          <StyledButtonsWrapper>
            {agentModule?.edit && isCreator && (
              <StyledIconButton>
                <IconButton
                  onClick={handleEdit}
                  icon={() => <StyledEditIcon />}
                  size={IconButton.sizes.SMALL}
                  kind={IconButton.kinds.TERTIARY}
                  ariaLabel='Edit'
                />
              </StyledIconButton>
            )}

            {agentModule?.delete && isCreator && (
              <StyledMenuDots>
                <MenuButton component={MenuDots}>
                  <StyledMenuButtonsWrapper>
                    <ButtonTertiary onClick={handleCreateChat}>{t('create-session')}</ButtonTertiary>
                    <ButtonTertiary onClick={handleScheduleRun}>{t('schedule-run')}</ButtonTertiary>
                    <ButtonTertiary onClick={() => deleteAgentHandler(agent.id)}>
                      {t('delete-agent')}
                    </ButtonTertiary>
                  </StyledMenuButtonsWrapper>
                </MenuButton>
              </StyledMenuDots>
            )}
          </StyledButtonsWrapper>
        </StyledNameWrapper>
        {creator && (
          <TypographySecondary
            value={`By ${creator.name}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
          />
        )}
        {!isCreator && (
          <div>
            <ButtonPrimary
              size={Button.sizes.SMALL}
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
        )}
      </StyledWrapper>

      {description && (
        <>
          <StyledDivider />
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
        {role && <TagsRow title={t('role')} items={[role]} />}

        {agentModel?.length > 0 && <TagsRow title={t('model')} items={agentModel} />}

        {temperature && <TagsRow title={t('temperature')} items={[temperature.toString()]} />}

        <TagsRow title={t('template')} items={[is_template ? 'True' : 'False']} />
      </StyledWrapper>
    </StyledDetailsBox>
  )
}

export default AgentVIewDetailBox

export const StyledDetailsBox = styled.div`
  background: ${({ theme }) => theme.body.cardBgColor};
  border: ${({ theme }) => theme.body.secondaryBorder};
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
  padding: 10px 0;

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
export const StyledMenuDots = styled.div`
  .menu-button--wrapper.menu-button--wrapper--size-32 {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
    }
    path {
      stroke: ${({ theme }) => theme.body.iconColor};
    }
  }
`
export const StyledIconButton = styled.div`
  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`
