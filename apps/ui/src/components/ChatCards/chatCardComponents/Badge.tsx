import styled from 'styled-components'

import InboundIcon from 'assets/icons/inbound.png'
import OutboundIcon from 'assets/icons/outbound.png'
import ChatbotIcon from 'assets/icons/chatbot.png'

type BadgeProps = {
  type?: 'Inbound' | 'Outbound' | string
}

const Badge = ({ type }: BadgeProps) => {
  let src = ChatbotIcon
  if (type === 'Inbound') src = InboundIcon
  if (type === 'Outbound') src = OutboundIcon

  return <StyledImg src={src} />
}

export default Badge

const StyledImg = styled.img``
