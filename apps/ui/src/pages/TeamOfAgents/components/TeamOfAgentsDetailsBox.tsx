import React from 'react'
import Typography from 'share-ui/components/typography/Typography'
import { useTranslation } from 'react-i18next'
import {
  StyledButtonsWrapper,
  StyledDetailsBox,
  StyledDivider,
  StyledInnerButtonWrapper,
  StyledMenuButtonsWrapper,
  StyledNameWrapper,
  StyledWrapper,
  StyledIconButton,
} from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import TagsRow from 'pages/Agents/AgentView/components/TagsRow'

import IconButton from 'share-ui/components/IconButton/IconButton'

import { useNavigate } from 'react-router-dom'
import { useModal } from 'hooks'
import { AuthContext } from 'contexts'

import Button from 'share-ui/components/Button/Button'

import Download from 'share-ui/components/Icon/Icons/components/Download'
import TypographyPrimary from 'components/Typography/Primary'

import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import { StyledEditIcon } from '../TeamOfAgentsCard/TeamOfAgentsCard'
import TypographyTertiary from 'components/Typography/Tertiary'

import MenuButton from 'share-ui/components/MenuButton/MenuButton'

import { useTeamOfAgents } from '../useTeamOfAgents'
import { useModelsService } from 'services'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { MenuDotsOutline } from 'share-ui/components/Icon/Icons'

type TeamOfAgentsDetailsBoxProps = {
  teamData: any
}

const TeamOfAgentsDetailsBox = ({ teamData }: TeamOfAgentsDetailsBoxProps) => {
  const { t } = useTranslation()
  const { getChatModules } = useGetAccountModule()
  const teamModule = getChatModules('team')

  const { user } = React.useContext(AuthContext)

  const { deleteTeamOfAgentsHandler } = useTeamOfAgents()

  const navigate = useNavigate()

  const { openModal, closeModal } = useModal()

  const { data: models } = useModelsService()

  const { name, description, team_type, id, created_by, configs } = teamData
  const { model, temperature } = configs
  const isCreator = user?.id === created_by

  const teamModel = models?.filter(modelData => modelData.id === model).map(model => model.name)

  const handleEdit = () => {
    closeModal('team-of-agent-view-modal')
    navigate(`/team-of-agents/${id}/edit-team`)
  }

  const handleScheduleRun = () => {
    openModal({ name: 'schedule-run-modal', data: { id, type: 'team' } })
  }

  return (
    <StyledDetailsBox>
      <StyledWrapper>
        <StyledNameWrapper>
          <TypographyPrimary
            value={'Details'}
            type={Typography.types.Heading}
            size={Typography.sizes.md}
          />

          <StyledButtonsWrapper>
            {/* {teamModule?.edit && isCreator && (
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

            {teamModule?.delete && isCreator && (
              <MenuButton component={() => <MenuDotsOutline size={20} />}>
                <StyledMenuButtonsWrapper>
                  <ButtonTertiary onClick={() => deleteTeamOfAgentsHandler(id)}>
                    {t('delete-team')}
                  </ButtonTertiary>

                  <ButtonTertiary onClick={handleScheduleRun}>{t('schedule-run')}</ButtonTertiary>
                </StyledMenuButtonsWrapper>
              </MenuButton>
            )}
          </StyledButtonsWrapper>
        </StyledNameWrapper>

        {/* {!isCreator && (
          <div>
            <ButtonPrimary
              size={Button.sizes?.SMALL}
              // onClick={() => navigate(`/agents/create-agent?agentId=${agentId}`)}
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
              type={Typography.types.P}
              size={Typography.sizes.sm}
            />
          </StyledWrapper>
        </>
      )}

      <StyledDivider />

      <StyledWrapper>
        {team_type && <TagsRow title={t('team-type')} items={[team_type]} />}
        {model && <TagsRow title={t('model')} items={teamModel} />}
        {temperature && <TagsRow title={t('temperature')} items={[temperature]} />}
      </StyledWrapper>
    </StyledDetailsBox>
  )
}

export default TeamOfAgentsDetailsBox
