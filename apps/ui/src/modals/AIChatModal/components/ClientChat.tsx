import styled from 'styled-components'
import AIChat from '../AIChat'
import ChatV2 from './ChatV2'

const ClientChat = () => {
  return (
    <StyledRoot>
      <ChatV2 />
    </StyledRoot>
  )
}

export default ClientChat

const StyledRoot = styled.div`
  margin-left: 550px;
`
