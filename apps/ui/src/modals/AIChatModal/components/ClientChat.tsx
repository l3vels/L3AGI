import styled from 'styled-components'
import AIChat from '../AIChat'
import ChatV2 from './ChatV2'

const ClientChat = () => {
  return (
    <StyledRoot>
      <StyledMessages>
        <AIChat />
      </StyledMessages>
    </StyledRoot>
  )
}

export default ClientChat

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`
const StyledMessages = styled.main`
  // flex-grow: 1;
  width: 100%;
  max-width: 900px;
  margin-left: 100px;

  display: flex;
  /* overflow-y: auto; */
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 80px; // To make space for input */
  height: calc(100vh - 240px);
  margin-top: 30px;
`
