import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import moment from 'moment'

import l3 from 'assets/avatars/l3.png'
import { Avatar_3 } from 'assets/avatars'

import HumanMessage from './components/HumanMessage'
import AiMessage from './components/AiMessage'
import ChatMessage from '../ChatMessage'
import { v4 as uuidv4 } from 'uuid'
import HumanReply from './components/HumanReply'
import AiReply from './components/AiReply'
import { ReplyStateProps } from '../ReplyBox'

import { ArrowDown } from 'share-ui/components/Icon/Icons'

export enum MessageTypeEnum {
  AI_MANUAL = 'AI_MANUAL',
  User = 'User',
}

type ChatMessageListV2Props = {
  data: any
  thinking: boolean
  setReply: (state: ReplyStateProps) => void
  reply: ReplyStateProps
  greeting: string | null
  agentName: string
  sessionId?: string
}

const ChatMessageListV2 = ({
  data,
  thinking,
  setReply,
  reply,
  greeting,
  agentName,
  sessionId,
}: ChatMessageListV2Props) => {
  const { t } = useTranslation()
  const [listIsReady, setListIsReady] = useState(false)

  const virtuoso = useRef<VirtuosoHandle>(null)
  const scrollerRef = useRef<any>(null)

  const filteredData = data?.map((chat: any) => {
    const chatDate = moment(chat?.created_on).format('HH:mm')

    return {
      id: chat?.id,
      message: chat?.message?.data?.content,
      type: chat?.message?.type,
      date: chatDate,
      thoughts: chat?.thoughts,
      sender_user_id: chat?.sender_user_id,
      version: chat?.version,
      parent: chat?.parent,
      username: chat.message.data.additional_kwargs.name,
      agentName: chat.agent?.name,
      teamName: chat.team?.name,
      avatar: chat?.agent?.avatar,
      sender_user: chat?.sender_user,
      sender_name: chat?.sender_name,
      run_id: chat?.run_id,
      voice: chat?.voice_url,
    }
  })

  let initialChat

  if (greeting) {
    const currentDate = new Date()
    const chatDate = moment(currentDate).format('HH:mm')

    initialChat = [
      {
        message: greeting,
        type: 'ai',
        date: chatDate,
        agentName: agentName,
        isGreeting: true,
      },
      ...filteredData,
    ]
  } else {
    initialChat = filteredData
  }

  const scrollToEnd = () => {
    virtuoso.current?.scrollToIndex({
      index: initialChat.length + 2,
      align: 'end',
    })
  }

  const loader = useMemo(() => {
    return (
      <ChatMessage
        message={{
          id: uuidv4(),
          ai: true,
          createdOn: Date.now(),
          text: t('thinking'),
          loader_type: 'video',
          type: MessageTypeEnum.AI_MANUAL,
        }}
      />
    )
  }, [])

  useEffect(() => {
    if (thinking) {
      setTimeout(() => {
        scrollToEnd()
      }, 100)

      return
    }

    // eslint-disable-next-line
  }, [thinking])

  useEffect(() => {
    if (listIsReady) return

    if (data.length > 0) {
      setTimeout(() => {
        scrollToEnd()
        setListIsReady(true)
      }, 100)
    }

    // eslint-disable-next-line
  }, [data])

  useEffect(() => {
    if (data.length > 0) {
      scrollToEnd()
    } else {
      setListIsReady(false)
    }

    // eslint-disable-next-line
  }, [sessionId])

  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollerRef.current
        const bottomScrollPosition = scrollTop + clientHeight
        const isScrollable = scrollHeight - bottomScrollPosition > 1 // Using 1 as a threshold
        setShowScrollButton(isScrollable)
      }
    }

    const scrollContainer = scrollerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)

      // Initial check in case the list is already scrollable
      handleScroll()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [initialChat])

  const appendInterval = useRef(null as any)
  const [atBottom, setAtBottom] = useState(false)
  const showButtonTimeoutRef = useRef(null as any)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    return () => {
      clearInterval(appendInterval.current)
      clearTimeout(showButtonTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    clearTimeout(showButtonTimeoutRef.current)
    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500)
    } else {
      setShowButton(false)
    }
  }, [atBottom, setShowButton])

  // useEffect(() => {
  //   if (!showButton) scrollToEnd()
  // }, [data[data?.length - 1]])

  return (
    <StyledRoot show={true}>
      <Virtuoso
        ref={virtuoso}
        scrollerRef={ref => {
          scrollerRef.current = ref
        }}
        style={{ height: '100%' }}
        data={initialChat}
        totalCount={data.length}
        overscan={2500}
        followOutput
        atBottomStateChange={bottom => {
          clearInterval(appendInterval.current)
          setAtBottom(bottom)
        }}
        atBottomThreshold={6}
        components={{
          Footer: () => {
            return (
              <>
                <StyledWrapper isHidden={!thinking}>
                  <StyledLoaderWrapper>{loader}</StyledLoaderWrapper>
                </StyledWrapper>
              </>
            )
          },
        }}
        itemContent={(index, chat) => (
          <>
            {chat?.type === 'human' && (
              <StyledWrapper isReplying={chat.id === reply.messageId}>
                <StyledReplyMessageContainer className='reply'>
                  {chat?.parent &&
                    (chat.parent.message.type === 'human' ? (
                      <HumanReply
                        messageText={chat.parent.message.data.content}
                        avatarImg={chat.parent.sender_user.avatar}
                        userId={chat.parent.sender_user_id}
                        userName={chat.parent.sender_name}
                      />
                    ) : (
                      <AiReply
                        author={chat.parent?.agent?.name}
                        avatarImg={l3}
                        messageText={chat.parent.message.data.content}
                        thoughts={chat.parent.thoughts}
                        version={chat.parent.version}
                      />
                    ))}
                </StyledReplyMessageContainer>
                <HumanMessage
                  userName={chat.sender_name}
                  avatarImg={chat.sender_user?.avatar}
                  userId={chat.sender_user_id}
                  messageDate={chat.date}
                  messageText={chat.message}
                  runId={chat.run_id}
                  voice={chat.voice}
                  onReplyClick={() => {
                    setReply({
                      isReply: true,
                      messageId: chat.id,
                      userId: chat.sender_user_id,
                      messageText: chat.message,
                      isHuman: true,
                    })
                  }}
                />
              </StyledWrapper>
            )}
            {chat?.type === 'ai' && (
              <StyledWrapper isReplying={chat.id === reply.messageId && !chat.isGreeting}>
                <StyledReplyMessageContainer className='reply'>
                  {chat?.parent && (
                    <HumanReply
                      messageText={chat.parent.message.data.content}
                      avatarImg={chat.parent.sender_user.avatar}
                      userId={chat.parent.sender_user_id}
                      userName={chat.parent.sender_name}
                    />
                  )}
                </StyledReplyMessageContainer>
                <AiMessage
                  agentName={chat.agentName}
                  teamName={chat.teamName}
                  avatarImg={chat.avatar}
                  messageDate={chat.date}
                  messageText={chat.message}
                  thoughts={chat.thoughts}
                  runId={chat.run_id}
                  voice={chat.voice}
                  onReplyClick={
                    chat.isGreeting
                      ? undefined
                      : () => {
                          setReply({
                            isReply: true,
                            messageId: chat.id,
                            version: chat.version,
                            messageText: chat.message,
                          })
                        }
                  }
                />
              </StyledWrapper>
            )}
          </>
        )}
      />

      {showButton && (
        <StyledScrollButton onClick={scrollToEnd}>
          <ArrowDown size={18} />
        </StyledScrollButton>
      )}
    </StyledRoot>
  )
}

export default memo(ChatMessageListV2)

const StyledRoot = styled.div<{ show: boolean }>`
  position: relative;

  opacity: 0;
  width: 100%;

  height: 100%;
  ${p =>
    p.show &&
    css`
      opacity: 1;
    `};
`

const StyledWrapper = styled.div<{ isHidden?: boolean; isReplying?: boolean }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 5px;

  padding-bottom: 6px;
  /* margin-right: 50px; */
  .visible-reply {
    opacity: 1;
  }

  :hover {
    .reply {
      opacity: 1;
    }
  }

  ${p =>
    p.isHidden &&
    css`
      opacity: 0;
      height: 0px;
      overflow: hidden;
    `};
  ${p =>
    p.isReplying &&
    css`
      background: rgba(0, 0, 0, 0.1);
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    `};
`

const StyledLoaderWrapper = styled.div`
  display: flex;
  margin-top: 30px;

  align-items: flex-start;
  padding-right: 10px;
  min-width: 400px;
  width: 100%;
`
const StyledReplyMessageContainer = styled.div`
  transition: opacity 1000ms;
  opacity: 0;
  /* width: 100%; */
  /* height: 20px;
  max-height: 20px; */

  min-height: 20px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`
const StyledScrollButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  cursor: pointer;

  width: 38px;
  height: 38px;
  border-radius: 100px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Add box shadow here

  display: flex;
  align-items: center;
  justify-content: center;
`
