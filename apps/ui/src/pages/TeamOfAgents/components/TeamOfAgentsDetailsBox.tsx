import React from 'react'
import Typography from '@l3-lib/ui-core/dist/Typography'

import {
  StyledButtonsWrapper,
  StyledDetailsBox,
  StyledDivider,
  StyledInnerButtonWrapper,
  StyledMenuButtonsWrapper,
  StyledNameWrapper,
  StyledWrapper,
} from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import TagsRow from 'pages/Agents/AgentView/components/TagsRow'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import { useNavigate } from 'react-router-dom'
import { useModal } from 'hooks'
import { AuthContext } from 'contexts'

import Button from '@l3-lib/ui-core/dist/Button'

import Download from '@l3-lib/ui-core/dist/icons/Download'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import { StyledEditIcon } from '../TeamOfAgentsCard/TeamOfAgentsCard'
import TypographyTertiary from 'components/Typography/Tertiary'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import { useTeamOfAgents } from '../useTeamOfAgents'

type TeamOfAgentsDetailsBoxProps = {
  teamData: any
}

const TeamOfAgentsDetailsBox = ({ teamData }: TeamOfAgentsDetailsBoxProps) => {
  const { user } = React.useContext(AuthContext)

  const { deleteTeamOfAgentsHandler } = useTeamOfAgents()

  const navigate = useNavigate()

  const { closeModal } = useModal()

  const { name, description, team_type, id, created_by } = teamData

  const isCreator = user?.id === created_by

  const handleEdit = () => {
    closeModal('team-of-agent-view-modal')
    navigate(`/team-of-agents/${id}/edit-team`)
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
            {isCreator && (
              <IconButton
                onClick={handleEdit}
                icon={() => <StyledEditIcon />}
                size={IconButton.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
                ariaLabel='Edit'
              />
            )}

            {isCreator && (
              <MenuButton component={MenuDots}>
                <StyledMenuButtonsWrapper>
                  {/* <ButtonTertiary onClick={handleCreateChat}>Create Channel</ButtonTertiary> */}
                  <ButtonTertiary onClick={() => deleteTeamOfAgentsHandler(id)}>
                    Delete Team
                  </ButtonTertiary>
                </StyledMenuButtonsWrapper>
              </MenuButton>
            )}
          </StyledButtonsWrapper>
        </StyledNameWrapper>

        {!isCreator && (
          <div>
            <ButtonPrimary
              size={Button.sizes.SMALL}
              // onClick={() => navigate(`/agents/create-agent?agentId=${agentId}`)}
            >
              <StyledInnerButtonWrapper>
                <Download size={28} />
                Add
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
              type={Typography.types.P}
              size={Typography.sizes.sm}
            />
          </StyledWrapper>
        </>
      )}

      <StyledDivider />

      <StyledWrapper>
        {team_type && <TagsRow title='Team Type' items={[team_type]} />}
      </StyledWrapper>
    </StyledDetailsBox>
  )
}

export default TeamOfAgentsDetailsBox
