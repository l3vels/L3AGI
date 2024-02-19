/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import user from 'assets/avatars/user.png'
import l3 from 'assets/avatars/l3.png'
import styled from 'styled-components'

import loadingVideo from 'assets/videos/sidebyside-s.mp4'

type ChatMessageProps = {
  message: any
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { id, text, ai = false, loader_type } = message

  const isVideoLoader = loader_type === 'video'

  return (
    <StyledWrapper key={id} className='test_wrapper'>
      <StyledMessageWrapper>
        <StyledInnerGroupHeader>
          {/* <StyledMessagePicWrapper> */}
          {ai ? (
            <>
              {isVideoLoader ? (
                <StyledVideo autoPlay loop muted>
                  <source src={loadingVideo} type='video/mp4' />
                  <source src={loadingVideo} type='video/ogg' />
                  Your browser does not support the video tag.
                </StyledVideo>
              ) : (
                <img src={l3} alt='Page logo' />
              )}
            </>
          ) : (
            <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
          )}

          <StyledReactMarkdown
            isMessageByAi={ai}
            children={text}
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || 'language-js')

                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={atomDark as any}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}{' '}
                  </code>
                )
              },
            }}
          />
        </StyledInnerGroupHeader>
      </StyledMessageWrapper>
    </StyledWrapper>
  )
}

export default memo(ChatMessage)

// const StyledSeparator = styled.div`
//   width: 100%;
//   background: rgba(255, 255, 255, 0.3);
//   border-radius: 3px;
//   height: 1px;
//   margin: 17px 0;
// `

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 0.5rem;
  background-size: cover;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  padding: 0 8px;
`

const StyledMessageWrapper = styled.div`
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const StyledReactMarkdown = styled(ReactMarkdown)<{ isMessageByAi: boolean }>`
  text-align: left;
  font-size: 16px;
  color: #4a5568;
  color: #e5e7eb;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.typography.contentPrimary};
  a {
    color: #fff;
  }
`

const StyledInnerGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
`

const StyledVideo = styled.video`
  width: 32px;
  height: 32px;
  margin-left: -6px;
  background: #000;

  border-radius: 100px 100px 100px 20px;
`
