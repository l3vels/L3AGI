import ChatV2 from 'modals/AIChatModal/components/ChatV2'
import { ChatContextProvider } from 'modals/AIChatModal/context/ChatContext'

import { useState } from 'react'

import styled from 'styled-components'

import ChatWindowHeader from './chatWidgetComponents/ChatWindowHeader'

const ChatWindow = ({ closeWindow }: { closeWindow: () => void }) => {
  const [chatStarted, setChatStarted] = useState(false)

  return (
    <StyledChatWindow>
      <ChatWindowHeader closeWindow={closeWindow} />

      <ChatContextProvider>
        {chatStarted && <ChatV2 chatSessionId='11af2cae-3423-42f6-a5d5-29a555dac424' />}
      </ChatContextProvider>
    </StyledChatWindow>
  )
}

export default ChatWindow

const StyledChatWindow = styled.div`
  width: calc(100vw - 30px);
  max-width: 450px;

  height: calc(75vh);

  border-radius: 10px;

  background-color: #fff;
  /* border: 1px solid #000; */

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

  /* padding: 0 10px; */
`
