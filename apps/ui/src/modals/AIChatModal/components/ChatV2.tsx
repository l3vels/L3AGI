import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useContext } from 'react'
import moment from 'moment'
// TODO: remove react icons after adding our icons

import { ApiVersionEnum } from '../types'
import { useChatState } from '../hooks/useChat'

import { useCreateChatMessageService, useChatMessagesService } from 'services'

import SendIconSvg from 'assets/icons/send_icon.svg'

import { StyledOption } from 'components/Spotlight/Spotlight'

// import { useSuggestions } from 'components/Spotlight/useSuggestions'

import { AuthContext, ToastContext } from 'contexts'

import useUploadFile from 'hooks/useUploadFile'
import UploadedFile from 'components/UploadedFile'

import { FILE_TYPES } from '../fileTypes'
import Mentions from 'components/Mentions'
import CommandIcon from 'components/Spotlight/CommandIcon'
import { useLocation, useNavigate } from 'react-router-dom'
import TypingUsers from './TypingUsers'
import { v4 as uuid } from 'uuid'
import useUpdateChatCache from '../hooks/useUpdateChatCache'

import Button from '@l3-lib/ui-core/dist/Button'
import ChatMessageListV2 from './ChatMessageList/ChatMessageListV2'
import ReplyBox, { defaultReplyState, ReplyStateProps } from './ReplyBox'
import Typewriter from 'components/ChatTypingEffect/Typewriter'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'

import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'

import ChatMembers from './ChatMembers'
import { ChatStatus, TeamOfAgentsType } from 'types'
import useStopChatService from 'services/chat/useStopChatService'
import { useConfigsService } from 'services/config/useConfigsService'
import getSessionId from '../utils/getSessionId'

type ChatV2Props = {
  isPrivate?: boolean
}

const ChatV2 = ({ isPrivate = false }: ChatV2Props) => {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [formValue, setFormValue] = useState('')
  const [typingEffectText, setTypingEffectText] = useState(false)
  const [fileLoading, setFileLoading] = useState(false)

  const [reply, setReply] = useState<ReplyStateProps>(defaultReplyState)

  const { user, account } = useContext(AuthContext)

  // const { chatSuggestions } = useSuggestions()

  const { setToast } = useContext(ToastContext)

  const { upsertChatMessageInCache } = useUpdateChatCache()

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent')
  const teamId = urlParams.get('team')

  const { apiVersion, setAPIVersion, thinking, setThinking, socket } = useChatState()

  const { data: chatMessages } = useChatMessagesService({
    isPrivateChat: isPrivate,
    agentId,
    teamId,
  })

  const { data: configs } = useConfigsService()

  const { data: agentById } = useAgentByIdService({ id: agentId || '' })
  const agentName = agentById?.agent?.name

  const chatSuggestions = agentById?.configs?.suggestions || []
  const chatGreeting = agentById?.configs?.greeting || ''

  const { data: teamOfAgents } = useTeamOfAgentsByIdService({ id: teamId || '' })

  const [createChatMessageService] = useCreateChatMessageService()
  const { stopChatService, loading: stopChatLoading } = useStopChatService()

  const sessionId = getSessionId({
    user,
    account,
    isPrivateChat: isPrivate,
    agentId,
    teamId,
  })

  const chatStatusConfig = configs?.find((config: any) => config.session_id === sessionId)

  const status = chatStatusConfig?.value

  useEffect(() => {
    if (!status) return

    setThinking(status === ChatStatus.Running)
  }, [status])

  const addMessagesToCache = (prompt: string, message_type: 'human' | 'ai') => {
    // Add message to cache immediately after user sends it. This message will be updated with sockets
    const message = {
      id: uuid(),
      session_id: '',
      thoughts: null,
      user_id: user.id,
      account_id: account.id,
      parent_id: null,
      parent: null,
      agent_id: agentId,
      agent: null,
      team_id: teamId,
      team: null,
      message: {
        data: { content: prompt, example: false, additional_kwargs: {} },
        type: message_type || 'human',
      },
      created_on: moment().add(10, 'seconds').toISOString(), // Fixes local message sorting before waiting for socket
      creator: user,
    }

    upsertChatMessageInCache(message, isPrivate, {
      agentId,
      teamId,
    })

    return message
  }

  const { uploadFile } = useUploadFile()
  const [uploadedFileObject, setUploadedFileObject] = useState<any | null>(null)

  const handleUploadFile = async (event: any) => {
    setFileLoading(true)
    const { files }: any = event.target

    if (!FILE_TYPES.includes(files[0].type)) {
      setToast({
        message: 'Format is not supported!',
        type: 'negative',
        open: true,
      })

      setFileLoading(false)
    } else {
      const fileObj = {
        fileName: files[0].name,
        type: files[0].type,
        fileSize: files[0].size,
        locationField: 'chat',
        // game_id: gameId,
      }

      const fileName = files[0].name

      const res = await uploadFile(fileObj, files)
      setFileLoading(false)

      setUploadedFileObject({ url: res, fileName: fileName })
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(formValue.length, formValue.length)
      }, 1)
    }
  }

  const createMessage = async () => {
    try {
      let message = formValue

      if (uploadedFileObject) {
        message = `${uploadedFileObject.fileName} ${uploadedFileObject.url} ${formValue}`
      }

      const { id: localChatMessageRefId } = addMessagesToCache(message, 'human')

      setThinking(true)
      setFormValue('')
      setUploadedFileObject(null)

      if (typingEffectText) {
        setTypingEffectText(false)
      }

      const parentMessageId = reply.messageId || undefined

      if (reply.isReply) {
        setReply(defaultReplyState)
      }

      await createChatMessageService({
        message,
        isPrivateChat: isPrivate,
        agentId,
        teamId,
        localChatMessageRefId, // Used to update the message with socket
        parentId: parentMessageId,
      })

      setThinking(false)
    } catch (e) {
      setToast({
        message: 'Something went wrong',
        type: 'negative',
        open: true,
      })
      setThinking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !thinking) {
      e.preventDefault()

      if (formValue || uploadedFileObject) {
        createMessage()
      }
    }
  }

  useEffect(() => {
    setAPIVersion(ApiVersionEnum.L3_Conversational)

    setTimeout(() => {
      setFormValue('')
      inputRef.current?.focus()
    }, 1)
  }, [])

  useEffect(() => {
    if (reply.isReply) {
      setTimeout(() => {
        setFormValue('')
        inputRef.current?.focus()
      }, 1)
    }
  }, [reply])

  const handlePickedSuggestion = (value: string) => {
    setFormValue(value)
    setTypingEffectText(true)
  }

  useEffect(() => {
    const versions = [
      ApiVersionEnum.L3_Conversational,
      // ApiVersionEnum.L3_PlanAndExecute,
      ApiVersionEnum.L3_PlanAndExecuteWithTools,
    ]

    if (!versions.includes(apiVersion)) {
      navigate('chat')
    }
  }, [apiVersion])

  useEffect(() => {
    if (formValue.length > 0) {
      socket.sendUserTyping('chat_id')
    }
  }, [formValue])

  const filteredTypingUsers = socket?.typingUsersData?.filter(
    (data: any) => user.id !== data.userId,
  )

  const canStopGenerating =
    status === ChatStatus.Running &&
    (teamOfAgents?.team_type === TeamOfAgentsType.Debates ||
      teamOfAgents?.team_type === TeamOfAgentsType.AuthoritarianSpeaker)

  const handleStopGenerating = async () => {
    await stopChatService({
      input: {
        is_private_chat: isPrivate,
        agent_id: agentId,
        team_id: teamId,
      },
    })
  }

  return (
    <StyledWrapper>
      <StyledMembersWrapper>
        <ChatMembers agentById={agentById} teamOfAgents={teamOfAgents} />
      </StyledMembersWrapper>

      <StyledMessages>
        <StyledChatWrapper>
          <ChatMessageListV2
            data={chatMessages}
            thinking={thinking}
            isNewMessage={socket?.isNewMessage}
            setIsNewMessage={socket?.setIsNewMessage}
            setReply={setReply}
            reply={reply}
            agentName={agentName || ''}
            greeting={
              chatMessages &&
              chatMessages?.length === 0 &&
              (!agentId
                ? `Hello ${user.name}, you can chat with agents and teams on your dashboard.`
                : chatGreeting)
            }
          />
        </StyledChatWrapper>
      </StyledMessages>
      <StyledChatFooter>
        <StyledChatInputWrapper>
          <StyledButtonGroup>
            <StyledSuggestionsContainer>
              {chatSuggestions.map((chatSuggestion: string, index: number) => {
                return (
                  <StyledOption
                    key={index}
                    onClick={() => {
                      handlePickedSuggestion(chatSuggestion)
                    }}
                  >
                    {chatSuggestion}
                  </StyledOption>
                )
              })}
            </StyledSuggestionsContainer>

            {canStopGenerating && (
              <StyledStopGeneratingButton>
                <Button
                  onClick={handleStopGenerating}
                  size={Button.sizes.SMALL}
                  kind={Button.kinds.SECONDARY}
                  disabled={stopChatLoading}
                >
                  Stop Generating
                </Button>
              </StyledStopGeneratingButton>
            )}
          </StyledButtonGroup>

          <StyledForm>
            {reply.isReply && (
              <ReplyBox onClose={() => setReply(defaultReplyState)} reply={reply} />
            )}
            {uploadedFileObject && (
              <StyledFileWrapper>
                <UploadedFile
                  onClick={() => setUploadedFileObject(null)}
                  name={uploadedFileObject.fileName}
                />
              </StyledFileWrapper>
            )}
            <StyledTextareaWrapper>
              {/* {!isProduction && (
                <UploadButton onChange={handleUploadFile} isLoading={fileLoading} />
              )} */}

              {typingEffectText ? (
                <StyledInputWrapper secondary>
                  <Typewriter
                    size='small'
                    message={formValue}
                    callFunction={() => {
                      setTypingEffectText(false)
                      setTimeout(() => {
                        inputRef.current?.focus()
                        inputRef.current?.setSelectionRange(formValue.length, formValue.length)
                      }, 1)
                    }}
                  />
                </StyledInputWrapper>
              ) : (
                // <StyledInput
                //   expanded
                //   ref={inputRef}
                //   value={formValue}
                //   onKeyDown={handleKeyDown}
                //   onChange={e => {
                //     setFormValue(e.target.value)
                //     adjustTextareaHeight()
                //   }}
                //   placeholder='Ask or Generate anything'
                //   rows={1}
                // />
                <StyledInputWrapper>
                  <Mentions
                    inputRef={inputRef}
                    onChange={(e: any) => {
                      setFormValue(e.target.value)
                    }}
                    value={formValue}
                    onKeyDown={handleKeyDown}
                    setValue={setFormValue}
                    agentId={agentId}
                    teamId={teamId}
                  />
                </StyledInputWrapper>
              )}
              <StyledButton
                onClick={() => {
                  if (formValue || uploadedFileObject) {
                    createMessage()
                  }
                }}
                disabled={!formValue || thinking}
              >
                <img src={SendIconSvg} alt='sen' />
              </StyledButton>
              <CommandIcon />
            </StyledTextareaWrapper>
          </StyledForm>
          <StyledChatBottom>
            {/* <button
            onClick={() => {
              console.log('sendUserShare')
              //todo need to replace message_id
              socket.sendUserShare('message_id')
            }}
          >
            Share
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserLikeDislike Like')
              //todo need to replace message_id
              const message_id = 'message_id'
              socket.sendUserLikeDislike(message_id, 'user_like')
            }}
          >
            Like
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserLikeDislike Dislike')
              //todo need to replace message_id
              const message_id = 'message_id'
              socket.sendUserLikeDislike(message_id, 'user_dislike')
            }}
          >
            Dislike
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserTyping')
              //todo need to replace chat_id,
              socket.sendUserTyping('chat_id')
            }}
          >
            Send User Typing
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserStopTyping')
              //todo need to replace chat_id,
              socket.sendUserStopTyping('chat_id')
            }}
          >
            Send User stop typing
          </button> */}

            <TypingUsers usersData={filteredTypingUsers} />
          </StyledChatBottom>
        </StyledChatInputWrapper>
      </StyledChatFooter>
    </StyledWrapper>
  )
}

export default ChatV2

const StyledWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  transition: background-color 300ms ease-in-out;
  position: relative;
  margin: 0 auto;
  /* padding-bottom: 50px; */
  /* height: calc(100% - 80px); */
  /* margin-bottom: 100px; */
`

const StyledMessages = styled.main`
  // flex-grow: 1;
  width: 100%;
  display: flex;
  /* overflow-y: auto; */
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 80px; // To make space for input */
  height: calc(100vh - 240px);
  margin-top: 30px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: flex-start;
  padding: 0px 23px 0px 16px;
  /* gap: 12px; */

  background: rgba(0, 0, 0, 0.1);
  /* Style */

  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(100px);

  /* Note: backdrop-filter has minimal browser support */

  border-radius: 100px;

  /* cursor: pointer; */

  width: fit-content;
  min-height: 48px;
  height: fit-content;
  max-height: 250px;
`

const StyledSelect = styled.select`
  outline: none;
  border: none;
  padding-left: 24px;
  height: 100%;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
`

const StyledTextareaWrapper = styled.div`
  /* background: rgba(255, 255, 255, 0.2); */
  /* border-radius: 100px;
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto; */
  width: 100%;
  /* width: 800px; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  padding-left: 20px;
`

const StyledButton = styled.div<{ disabled: boolean }>`
  margin: 0 20px;
  cursor: pointer;
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: auto;
    `};
`

const StyledChatFooter = styled.div`
  position: fixed;
  left: 50%;
  z-index: 100001;
  bottom: -135px;
  transform: translateX(-50%);

  display: flex;
  /* flex-direction: column; */
  justify-content: center;

  width: 100%;
`

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  padding: 16px 0;
  width: 100%;
`

const StyledChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`

const StyledSuggestionsContainer = styled.div`
  display: flex;
  width: calc(100vw - 50px);

  max-width: 800px;
  align-items: center;
  gap: 12px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`

const StyledStopGeneratingButton = styled.div`
  margin-right: 94px;
`

const StyledFileWrapper = styled.div`
  display: flex;

  margin-top: 10px;
  margin-left: 270px;
`

const StyledInputWrapper = styled.div<{ secondary?: boolean }>`
  width: calc(100vw - 200px);
  max-width: 600px;
  padding-bottom: 2px;

  ${p =>
    p.secondary &&
    css`
      padding-left: 2px;
      padding-bottom: 0;
    `};

  /* @media (max-width: 1200px) {
    width: 400px;
  } */
`
const StyledChatInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledChatBottom = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 50px;
  width: 100%;
`
const StyledReplyBox = styled.div`
  position: absolute;
  /* z-index: 100000000; */
  /* background: var(--primitives-gray-800, #383f4b); */
  width: 100%;
  height: 40px;
  top: -40px;
  left: 0;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(100px);
  /* box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25); */

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 8px;
`
const StyledReplyText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const StyledMembersWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 5px;

  z-index: 12000000;

  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  /* background: rgba(0, 0, 0, 0.3); */

  height: calc(100vh - 240px);

  @media only screen and (max-width: 1400px) {
    display: none;
  }
`
