import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'

import IconButton from 'share-ui/components/IconButton/IconButton'

import {
  StyledAgentWrapper,
  StyledIconButtonWrapper,
  StyledIconWrapper,
} from 'components/ChatCards/TeamChatCard'
import {
  StyledDeleteIcon,
  StyledEditIcon,
  StyledEyeOpenIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { getAgentTypeText } from 'utils/agentUtils'
import styled from 'styled-components'
import Badge from './chatCardComponents/Badge'

type AgentChatCardProps = {
  onClick: () => void
  onViewClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
  picked: boolean
  agent: any
}

const AgentChatCard = ({
  onClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  picked,
  agent,
}: AgentChatCardProps) => {
  const handleEdit = (event: any) => {
    event.stopPropagation()
    if (onEditClick) {
      onEditClick()
    }
  }

  const handleView = (event: any) => {
    event.stopPropagation()
    if (onViewClick) onViewClick()
  }

  const handleDelete = (event: any) => {
    event.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  const agentType = getAgentTypeText(agent?.agent_type)

  // const agentRole = agent?.role?.length > 0 ? `· ${agent?.role}` : ''

  // const roleText = `${agentType} ${agentRole}`

  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <StyledAvatarWrapper>
        <AvatarGenerator name={agent?.name} size={50} avatar={agent.avatar} />
        <StyledBadgeWrapper>
          <Badge type={agentType} />
        </StyledBadgeWrapper>
      </StyledAvatarWrapper>
      <MemberText name={agent?.name} />

      <StyledIconButtonWrapper className='hiddenButton'>
        {onDeleteClick && (
          <IconButton
            onClick={handleDelete}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            // ariaLabel='Delete'
          />
        )}

        {onViewClick && (
          <IconButton
            onClick={handleView}
            icon={() => (
              <StyledIconWrapper>
                <StyledEyeOpenIcon />
              </StyledIconWrapper>
            )}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            // ariaLabel='View'
          />
        )}

        {onEditClick && (
          <IconButton
            onClick={handleEdit}
            icon={() => <StyledEditIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            // ariaLabel='Edit'
          />
        )}
      </StyledIconButtonWrapper>
    </StyledAgentWrapper>
  )
}

export default AgentChatCard

const StyledAvatarWrapper = styled.div`
  position: relative;
`
const StyledBadgeWrapper = styled.div`
  position: absolute;

  bottom: 0;
  right: -4px;
`
