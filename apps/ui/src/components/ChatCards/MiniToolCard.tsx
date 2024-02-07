import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { StyledAgentWrapper } from './TeamChatCard'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import styled from 'styled-components'

type MiniToolCardProps = {
  onClick: () => void
  onViewClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
  picked: boolean
  name: string
  logo: string
}

const MiniToolCard = ({ picked, onClick, logo, name }: MiniToolCardProps) => {
  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <StyledImg src={logo} />

      <MemberText name={name} />
    </StyledAgentWrapper>
  )
}

export default MiniToolCard

const StyledImg = styled.img`
  width: 24px;
  height: 24px;

  border-radius: 8px;
`
