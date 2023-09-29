import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import EyeOpen from '@l3-lib/ui-core/dist/icons/EyeOpen'

import {
  StyledAgentWrapper,
  StyledIconButtonWrapper,
  StyledIconWrapper,
} from 'components/ChatCards/TeamChatCard'

type AgentChatCardProps = {
  onClick: () => void
  onViewClick: (event: any) => void
  onEditClick?: (event: any) => void
  picked: boolean
  agent: any
}

const AgentChatCard = ({
  onClick,
  onViewClick,
  onEditClick,
  picked,
  agent,
}: AgentChatCardProps) => {
  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <AvatarGenerator name={agent?.name} size={30} avatar={agent.avatar} />
      <MemberText name={agent?.name} role={agent?.role} />

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

export default AgentChatCard
