import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import { StyledAgentWrapper, StyledIconButtonWrapper } from './TeamChatCard'

import IconButton from 'share-ui/components/IconButton/IconButton'

import { StyledDeleteIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

type CustomerChatCardProps = {
  onClick: () => void
  picked: boolean
  name: string
  subTitle?: string
  onDeleteClick?: () => void
}

const CustomerChatCard = ({
  onClick,
  picked,
  name,
  subTitle,
  onDeleteClick,
}: CustomerChatCardProps) => {
  const handleDelete = (event: any) => {
    event.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <AvatarGenerator name={name} size={30} />
      <MemberText name={name} role={subTitle} />

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
      </StyledIconButtonWrapper>
    </StyledAgentWrapper>
  )
}

export default CustomerChatCard
