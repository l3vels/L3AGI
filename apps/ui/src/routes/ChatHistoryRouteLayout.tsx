import { useOutlet } from 'react-router-dom'

import { StyledAppContainer } from '../components/Layout/LayoutStyle'
import styled from 'styled-components'

const ChatHistoryRouteLayout = () => {
  const outlet = useOutlet()

  return (
    <StyledAppContainer className='app_container'>
      <StyledBodyContainer>{outlet}</StyledBodyContainer>
    </StyledAppContainer>
  )
}

export default ChatHistoryRouteLayout

const StyledBodyContainer = styled.div`
  width: 100%;
`
