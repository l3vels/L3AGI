import { Route as Router, Routes, BrowserRouter } from 'react-router-dom'

import styled, { ThemeProvider, css } from 'styled-components'
import { lightTheme } from 'styles/theme'
import ChatWindow from './ChatWindow'
import { useState } from 'react'

import useApollo from 'hooks/useApollo'
import { ApolloProvider } from '@apollo/client'
import { ChatContextProvider } from 'modals/AIChatModal/context/ChatContext'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

const ChatWidget = () => {
  const client = useApollo()

  const [showChat, setShowChat] = useState(false)
  const [chatDetails, setChatDetails] = useState<any>(null)

  const getChatDetails = (name: string, avatar: string) => {
    setChatDetails({ name: name, avatar: avatar })
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <StyledRoot>
          <BrowserRouter>
            <StyledHiddenChat hidden={!showChat}>
              <Routes>
                <Router
                  element={
                    <>
                      <ChatContextProvider>
                        <ChatWindow
                          closeWindow={() => setShowChat(false)}
                          getChatDetails={getChatDetails}
                        />
                      </ChatContextProvider>
                    </>
                  }
                  path='/'
                />
              </Routes>
            </StyledHiddenChat>
          </BrowserRouter>

          {chatDetails && (
            <StyledChatWidget onClick={() => setShowChat(!showChat)}>
              <AvatarGenerator
                name={chatDetails.name}
                avatar={chatDetails.avatar}
                size={50}
                isRound
              />
            </StyledChatWidget>
          )}
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

  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease; /* Add transition for smooth animation */

  /* &:hover {
    width: 60px;
    height: 60px;
  } */
`
const StyledHiddenChat = styled.div<{ hidden: boolean }>`
  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`
