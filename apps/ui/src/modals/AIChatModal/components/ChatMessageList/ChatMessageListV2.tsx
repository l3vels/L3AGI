import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import styled, { css } from 'styled-components'

import moment from 'moment'

import l3 from '../../assets/l3.png'
import { Avatar_3 } from 'assets/avatars'

import HumanMessage from './components/HumanMessage'
import AiMessage from './components/AiMessage'
import ChatMessage from '../ChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { MessageTypeEnum } from 'modals/AIChatModal/types'
import HumanReply from './components/HumanReply'
import AiReply from './components/AiReply'
import { ReplyStateProps } from '../ReplyBox'

type ChatMessageListV2Props = {
  data: any
  thinking: boolean
  isNewMessage: boolean
  setIsNewMessage: (state: boolean) => void
  setReply: (state: ReplyStateProps) => void
  reply: ReplyStateProps
}

const ChatMessageListV2 = ({
  data,
  thinking,
  isNewMessage,
  setIsNewMessage,
  setReply,
  reply,
}: ChatMessageListV2Props) => {
  const [listIsReady, setListIsReady] = useState(true)

  const virtuoso = useRef<VirtuosoHandle>(null)

  const initialChat = data?.map((chat: any) => {
    const chatDate = moment(chat?.created_on).format('HH:mm')
    return {
      id: chat?.id,
      message: chat?.message?.data?.content,
      type: chat?.message?.type,
      date: chatDate,
      thoughts: chat?.thoughts,
      user_id: chat?.user_id,
      version: chat?.version,
      parent: chat?.parent,
      username: chat.message.data.additional_kwargs.name,
    }
  })

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
          index: data.length + 1,
          align: 'end',
        })
      }, 100)
      setListIsReady(true)

      return
    }

    if (!data.length) return

    // TODO: why do we need to scroll three times?
    // setTimeout(() => {
    //   virtuoso.current?.scrollToIndex({
    //     index: data.length,
    //     align: 'end',
    //   })

    setTimeout(() => {
      virtuoso.current?.scrollToIndex({
        index: data.length,
        align: 'end',
      })

      if (!listIsReady) {
        setTimeout(() => {
          setListIsReady(true)

          virtuoso.current?.scrollToIndex({
            index: data.length,
            align: 'end',
          })
        }, 1000)
      }
    }, 100)
    // }, 100)

    // eslint-disable-next-line
  }, [thinking, data])

  return (
    <StyledRoot show={listIsReady}>
      <Virtuoso
        ref={virtuoso}
        style={{ height: '100%' }}
        data={initialChat}
        totalCount={data.length}
        overscan={20}
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
                        userId={chat.parent.user_id}
                      />
                    ) : (
                      <AiReply
                        avatarImg={l3}
                        messageText={chat.parent.message.data.content}
                        thoughts={chat.parent.thoughts}
                        version={chat.parent.version}
                      />
                    ))}
                </StyledReplyMessageContainer>
                <HumanMessage
                  avatarImg={Avatar_3}
                  userId={chat.user_id}
                  messageDate={chat.date}
                  messageText={chat.message}
                  onReplyClick={() => {
                    setReply({
                      isReply: true,
                      messageId: chat.id,
                      userId: chat.user_id,
                      messageText: chat.message,
                      isHuman: true,
                    })
                  }}
                />
              </StyledWrapper>
            )}
            {chat?.type === 'ai' && (
              <StyledWrapper isReplying={chat.id === reply.messageId}>
                <StyledReplyMessageContainer className='reply'>
                  {chat?.parent && (
                    <HumanReply
                      messageText={chat.parent.message.data.content}
                      avatarImg={Avatar_3}
                      userId={chat.parent.user_id}
                    />
                  )}
                </StyledReplyMessageContainer>
                <AiMessage
                  avatarImg={l3}
                  messageDate={chat.date}
                  messageText={chat.message}
                  thoughts={chat.thoughts}
                  version={chat.version}
                  isNewMessage={initialChat.length - 1 === index && isNewMessage}
                  setIsNewMessage={setIsNewMessage}
                  onReplyClick={() => {
                    setReply({
                      isReply: true,
                      messageId: chat.id,
                      version: chat.version,
                      messageText: chat.message,
                    })
                  }}
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
  align-items: center;
  gap: 5px;

  margin-top: 10px;
  margin-right: 50px;

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
  width: 850px;
  display: flex;
  margin-top: 30px;
`
const StyledReplyMessageContainer = styled.div`
  transition: opacity 1000ms;
  opacity: 0;
  height: 30px;
  max-height: 30px;
`
