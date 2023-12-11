import ChatV2 from 'modals/AIChatModal/components/ChatV2'
import { ChatContextProvider } from 'modals/AIChatModal/context/ChatContext'
import styled from 'styled-components'

const ChatWindow = () => {
  return (
    <StyledChatWindow>
      <ChatContextProvider>
        <ChatV2 chatSessionId='11af2cae-3423-42f6-a5d5-29a555dac424' />
      </ChatContextProvider>
    </StyledChatWindow>
  )
}

export default ChatWindow

const StyledChatWindow = styled.div`
  width: calc(100vw - 30px);
  max-width: 450px;

  border-radius: 10px;

  background-color: #fff;
  /* border: 1px solid #000; */

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

  padding: 0 10px;
`
