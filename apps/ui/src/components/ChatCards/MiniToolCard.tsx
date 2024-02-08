import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { StyledAgentWrapper, StyledIconButtonWrapper } from './TeamChatCard'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import styled from 'styled-components'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledDeleteIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

type MiniToolCardProps = {
  onClick: () => void
  onViewClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
  picked?: boolean
  name: string
  logo: string
}

const MiniToolCard = ({
  picked = false,
  onClick,
  logo,
  name,
  onDeleteClick,
}: MiniToolCardProps) => {
  const handleDelete = (event: any) => {
    event.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <StyledImg src={logo} />

      <MemberText name={name} />

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

export default MiniToolCard

const StyledImg = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 8px;
`
