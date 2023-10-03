import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import { StyledAgentWrapper } from './TeamChatCard'

type CustomerChatCardProps = {
  onClick: () => void
  picked: boolean
  name: string
}

const CustomerChatCard = ({ onClick, picked, name }: CustomerChatCardProps) => {
  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      {/* <AvatarGenerator name={team?.name} size={30} avatar={team.avatar} /> */}
      <MemberText name={name} />
    </StyledAgentWrapper>
  )
}

export default CustomerChatCard
