import { Route as Router, Routes, BrowserRouter } from 'react-router-dom'

import styled, { ThemeProvider } from 'styled-components'
import { lightTheme } from 'styles/theme'
import ChatWindow from './ChatWindow'
import { useState } from 'react'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import Robot from 'share-ui/components/Icon/Icons/components/Robot'
import useApollo from 'hooks/useApollo'
import { ApolloProvider } from '@apollo/client'

const ChatWidget = () => {
  const client = useApollo()

  const [showChat, setShowChat] = useState(false)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <StyledRoot>
          <BrowserRouter>
            {showChat && (
              <Routes>
                <Router element={<ChatWindow closeWindow={() => setShowChat(false)} />} path='/' />
              </Routes>
            )}
          </BrowserRouter>

          <StyledChatWidget onClick={() => setShowChat(!showChat)}>
            <Robot size={40} />
          </StyledChatWidget>
        </StyledRoot>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default ChatWidget

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  gap: 10px;
`

const StyledChatWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: #ca7af7;
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease; /* Add transition for smooth animation */

  /* &:hover {
    width: 60px;
    height: 60px;
  } */
`
