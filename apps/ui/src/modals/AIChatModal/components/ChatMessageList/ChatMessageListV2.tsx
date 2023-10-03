import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import styled, { css } from 'styled-components'

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

export enum MessageTypeEnum {
  AI_MANUAL = 'AI_MANUAL',
  User = 'User',
}

type ChatMessageListV2Props = {
  data: any
  thinking: boolean
  isNewMessage: boolean
  setIsNewMessage: (state: boolean) => void
  setReply: (state: ReplyStateProps) => void
  reply: ReplyStateProps
  greeting: string | null
  agentName: string
}

const ChatMessageListV2 = ({
  data,
  thinking,
  isNewMessage,
  setIsNewMessage,
  setReply,
  reply,
  greeting,
  agentName,
}: ChatMessageListV2Props) => {
  const [listIsReady, setListIsReady] = useState(false)

  const virtuoso = useRef<VirtuosoHandle>(null)

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

  const loader = useMemo(() => {
    return (
      <ChatMessage
        message={{
          id: uuidv4(),
          ai: true,
          createdOn: Date.now(),
          text: 'Thinking ...',
          loader_type: 'video',
          type: MessageTypeEnum.AI_MANUAL,
        }}
      />
    )
  }, [])

  useEffect(() => {
    if (thinking) {
      setTimeout(() => {
        virtuoso.current?.scrollToIndex({
          index: initialChat.length + 2,
          align: 'end',
        })
      }, 100)

      return
    }

    // eslint-disable-next-line
  }, [thinking])

  useEffect(() => {
    if (listIsReady) return

    if (data.length > 0) {
      setTimeout(() => {
        virtuoso.current?.scrollToIndex({
          index: initialChat.length + 1,
          align: 'end',
        })
        setListIsReady(true)
      }, 100)
    }

    // eslint-disable-next-line
  }, [data])

  return (
    <StyledRoot show={true}>
      <Virtuoso
        ref={virtuoso}
        style={{ height: '100%' }}
        data={initialChat}
        totalCount={data.length}
        overscan={2500}
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
                <StyledReplyMessageContainer className='visible-reply'>
                  {chat?.parent &&
                    (chat.parent.message.type === 'human' ? (
                      <HumanReply
                        messageText={chat.parent.message.data.content}
                        avatarImg={Avatar_3}
                        userId={chat.parent.sender_user_id}
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
                  userName={chat.sender_user?.name}
                  avatarImg={chat.sender_user?.avatar}
                  userId={chat.sender_user_id}
                  messageDate={chat.date}
                  messageText={chat.message}
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
                      avatarImg={Avatar_3}
                      userId={chat.parent.sender_user_id}
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
                  isNewMessage={initialChat.length - 1 === index && isNewMessage}
                  setIsNewMessage={setIsNewMessage}
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
    </StyledRoot>
  )
}

export default memo(ChatMessageListV2)

const StyledRoot = styled.div<{ show: boolean }>`
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
  padding-top: 10px;
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

  width: calc(100% - 50px);
  max-width: 850px;
`
const StyledReplyMessageContainer = styled.div`
  transition: opacity 1000ms;
  opacity: 0;
  height: 30px;
  max-height: 30px;
`
