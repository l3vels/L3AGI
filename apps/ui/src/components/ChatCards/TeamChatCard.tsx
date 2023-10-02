import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import EyeOpen from '@l3-lib/ui-core/dist/icons/EyeOpen'
import styled, { css } from 'styled-components'

type TeamChatCardProps = {
  onClick: () => void
  onViewClick: (event: any) => void
  onEditClick?: (event: any) => void
  picked: boolean
  team: any
  agents: any
}

const TeamChatCard = ({
  onClick,
  picked,
  onViewClick,
  onEditClick,
  team,
  agents,
}: TeamChatCardProps) => {
  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <AvatarGenerator name={team?.name} size={30} avatar={team.avatar} />
      <MemberText name={team?.name} role={team.team_type} />

      <StyledTeamAgents>
        {agents?.map((agent: any, index: number) => {
          return (
            <StyledAgent key={index}>
              <AvatarGenerator name={agent?.agent?.name} avatar={agent?.agent?.avatar} size={20} />
            </StyledAgent>
          )
        })}
      </StyledTeamAgents>

      <StyledIconButtonWrapper className='hiddenButton'>
        <IconButton
          onClick={onViewClick}
          icon={() => (
            <StyledIconWrapper>
              <EyeOpen size={50} />
            </StyledIconWrapper>
          )}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
          // ariaLabel='View'
        />

        {onEditClick && (
          <IconButton
            onClick={onEditClick}
            icon={() => <Edit />}
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            // ariaLabel='Edit'
          />
        )}
      </StyledIconButtonWrapper>
    </StyledAgentWrapper>
  )
}

export default TeamChatCard

export const StyledAgentWrapper = styled.div<{ picked: boolean }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  padding: 10px;
  width: 350px;

  /* background: rgba(255, 255, 255, 0.1); */

  padding-left: 15px;
  border-radius: 10px;

  :hover {
    background: rgba(0, 0, 0, 0.1);
    .hiddenButton {
      opacity: 1;
    }
  }

  ${props =>
    props.picked &&
    css`
      background: rgba(250, 250, 250, 0.3);
      :hover {
        background: rgba(250, 250, 250, 0.3);
      }
    `}
`

export const StyledIconWrapper = styled.div`
  color: transparent;
`

export const StyledIconButtonWrapper = styled.div`
  margin-left: auto;

  opacity: 0;
  /* transition: opacity 300ms; */

  display: flex;
  align-items: center;
`

export const StyledTeamAgents = styled.div`
  /* height: 100%; */
  display: flex;
`
const StyledAgent = styled.div`
  margin-right: -8px;
`
