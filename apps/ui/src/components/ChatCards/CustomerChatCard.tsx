import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import { StyledAgentWrapper, StyledIconButtonWrapper } from './TeamChatCard'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import { StyledDeleteIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

type CustomerChatCardProps = {
  onClick: () => void
  picked: boolean
  name: string
  onDeleteClick?: () => void
}

const CustomerChatCard = ({ onClick, picked, name, onDeleteClick }: CustomerChatCardProps) => {
  const handleDelete = (event: any) => {
    event.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      {/* <AvatarGenerator name={team?.name} size={30} avatar={team.avatar} /> */}
      <MemberText name={name} />

      <StyledIconButtonWrapper className='hiddenButton'>
        {onDeleteClick && (
          <IconButton
            onClick={onDeleteClick}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            // ariaLabel='Delete'
          />
        )}
      </StyledIconButtonWrapper>
    </StyledAgentWrapper>
  )
}

export default CustomerChatCard
