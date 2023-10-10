import React from 'react'
import Typography from '@l3-lib/ui-core/dist/Typography'

import {
  StyledDetailsBox,
  StyledDivider,
  StyledInnerButtonWrapper,
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
import { ButtonPrimary } from 'components/Button/Button'
import { StyledEditIcon } from '../TeamOfAgentsCard/TeamOfAgentsCard'

type TeamOfAgentsDetailsBoxProps = {
  teamData: any
}

const TeamOfAgentsDetailsBox = ({ teamData }: TeamOfAgentsDetailsBoxProps) => {
  const { user } = React.useContext(AuthContext)

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
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
          {isCreator && (
            <IconButton
              onClick={handleEdit}
              icon={() => <StyledEditIcon />}
              size={IconButton.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              ariaLabel='Edit'
            />
          )}
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
            <TypographySecondary
              value={description}
              type={Typography.types.LABEL}
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
