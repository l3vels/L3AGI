import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
// TODO: remove react icons after adding our icons

import { useChatState } from '../hooks/useChat'

import { useCreateChatMessageService, useChatMessagesService } from 'services'

import SendIcon from 'share-ui/components/Icon/Icons/components/Send'

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

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import ChatMessageListV2 from './ChatMessageList/ChatMessageListV2'
import ReplyBox, { defaultReplyState, ReplyStateProps } from './ReplyBox'
import Typewriter from 'components/ChatTypingEffect/Typewriter'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'

import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'

import { ChatStatus, TeamOfAgentsType } from 'types'
import useStopChatService from 'services/chat/useStopChatService'
import { useConfigsService } from 'services/config/useConfigsService'
import getSessionId from '../utils/getSessionId'
import { ButtonPrimary, ButtonSecondary } from 'components/Button/Button'

import { useClientChatMessagesService } from 'services/chat/useChatMessagesService'
import { useCreateClientChatMessageService } from 'services/chat/useCreateClientChatMessage'
import { useChatByIdService } from 'services/chat/useChatByIdService'
import { textSlicer } from 'utils/textSlicer'
import AudioRecorder from 'components/AudioRecorder'
import AudioPlayer from 'components/AudioPlayer'
import Mobile from 'share-ui/components/Icon/Icons/components/Mobile'
import Microphone from 'share-ui/components/Icon/Icons/components/Microphone'
import { useModal } from 'hooks'
import { isVoiceAgent } from 'utils/agentUtils'

const ChatV2 = ({ chatSessionId }: { chatSessionId?: string }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [formValue, setFormValue] = useState('')

  const [voicePreview, setVoicePreview] = useState<string | null>(null)
  const [startedRecording, setStartedRecording] = useState(false)
  const [voiceLoading, setVoiceLoading] = useState(false)

  const [typingEffectText, setTypingEffectText] = useState(false)
  const [fileLoading, setFileLoading] = useState(false)

  const [reply, setReply] = useState<ReplyStateProps>(defaultReplyState)

  const { user, account } = useContext(AuthContext)

  // const { chatSuggestions } = useSuggestions()

  const { setToast } = useContext(ToastContext)
  const { openModal } = useModal()

  const { upsertChatMessageInCache } = useUpdateChatCache()

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent')
  const teamId = urlParams.get('team')
  const chatId = urlParams.get('chat') || urlParams.get('session') || chatSessionId

  const { thinking, setThinking, socket } = useChatState()

  const { data: chatMessages, loading: messagesLoading } = useChatMessagesService({
    agentId,
    teamId,
    chatId,
  })

  const { data: teamOfAgents } = useTeamOfAgentsByIdService({ id: teamId || '' })

  const { data: chatById } = useChatByIdService({ id: chatId || '' })

  const { data: configs } = useConfigsService()

  const { data: agentById } = useAgentByIdService({ id: agentId || '' })

  const isCallBased = isVoiceAgent(agentById?.agent?.agent_type)

  const agentName =
    agentById?.agent?.name || teamOfAgents?.name || chatById?.agent?.agent?.name || ''

  const chatSuggestions =
    agentById?.configs?.suggestions ||
    chatById?.agent?.configs?.suggestions ||
    teamOfAgents?.configs?.suggestions ||
    []

  const chatGreeting =
    agentById?.configs?.greeting ||
    chatById?.agent?.configs?.greeting ||
    teamOfAgents?.configs?.greeting ||
    `Hello ${user?.name || ''} , you can chat with agents and teams on your dashboard.`

  const [createClientChatMessage] = useCreateClientChatMessageService({
    agentName,
    agentAvatar: agentById?.agent?.avatar,
  })

  const [createChatMessageService] = useCreateChatMessageService({
    agentName,
    agentAvatar: agentById?.agent?.avatar,
  })
  const { stopChatService, loading: stopChatLoading } = useStopChatService()

  const sessionId = getSessionId({
    user,
    account,
    agentId,
    teamId,
    chatId: chatId || '',
  })

  const chatStatusConfig = configs?.find((config: any) => config.session_id === sessionId)

  const status = chatStatusConfig?.value

  useEffect(() => {
    if (!status) return

    setThinking(status === ChatStatus.Running)
  }, [status])

  const addMessagesToCache = (
    prompt: string,
    message_type: 'human' | 'ai',
    recordedVoiceUrl: string | null,
  ) => {
    // Add message to cache immediately after user sends it. This message will be updated with sockets
    const message = {
      id: uuid(),
      session_id: '',
      thoughts: null,
      sender_user_id: user?.id || '',
      sender_account_id: account?.id || '',
      sender_name: user?.name || 'Guest',
      parent_id: null,
      parent: null,
      agent_id: agentId,
      agent: null,
      team_id: teamId,
      team: null,
      chat_id: chatId,
      message: {
        data: { content: prompt, example: false, additional_kwargs: {} },
        type: message_type || 'human',
      },
      // created_on: moment().add(10, 'seconds').toISOString(), // Fixes local message sorting before waiting for socket for team collaboration
      created_on: new Date().toISOString(),
      sender_user: user || '',
      run_id: null,
      voice_url: recordedVoiceUrl,
    }

    upsertChatMessageInCache(message, {
      agentId,
      teamId,
      chatId,
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
        message: t('format-is-not-supported'),
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
      let voiceUrl = null

      if (uploadedFileObject) {
        message = `${uploadedFileObject.fileName} ${uploadedFileObject.url} ${formValue}`
      }

      if (voicePreview) {
        setVoiceLoading(true)
        const voiceResponse = await fetch(voicePreview)
        const voiceBlob = await voiceResponse.blob()

        const formData: any = new FormData()
        await formData.append('audio', voiceBlob, 'recorded_audio.wav')

        const audioBlob = await formData.get('audio')

        const uploadedFile = await uploadFile(
          {
            name: audioBlob.name,
            type: audioBlob.type,
            size: audioBlob.size,
          },
          audioBlob,
        )
        voiceUrl = uploadedFile?.url
        setVoicePreview(null)
        setVoiceLoading(false)
      }

      const { id: localChatMessageRefId } = addMessagesToCache(message, 'human', voiceUrl)

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
      if (chatId) {
        await createClientChatMessage({
          chat_id: chatId,
          prompt: message,
          localChatMessageRefId,
          voice_url: voiceUrl,
        })
      } else {
        await createChatMessageService({
          message,
          agentId,
          teamId,
          localChatMessageRefId, // Used to update the message with socket
          parentId: parentMessageId,
          voice_url: voiceUrl,
        })
      }

      setThinking(false)
    } catch (e) {
      console.log(e)
      setToast({
        message: t('toast-negative-message'),
        type: 'negative',
        open: true,
      })
      setThinking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !thinking && !voiceLoading) {
      e.preventDefault()

      if (formValue || uploadedFileObject || voicePreview) {
        createMessage()
      }
    }
  }

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
    if (formValue.length > 0) {
      socket.sendUserTyping('chat_id')
    }
  }, [formValue])

  const filteredTypingUsers = socket?.typingUsersData?.filter(
    (data: any) => user?.id !== data.userId,
  )

  const canStopGenerating =
    status === ChatStatus.Running &&
    (teamOfAgents?.team_type === TeamOfAgentsType.Debates ||
      teamOfAgents?.team_type === TeamOfAgentsType.AuthoritarianSpeaker ||
      teamOfAgents?.team_type === TeamOfAgentsType.DecentralizedSpeaker)

  const handleStopGenerating = async () => {
    await stopChatService({
      input: {
        agent_id: agentId,
        team_id: teamId,
      },
    })
  }

  return (
    <StyledWrapper>
      <StyledMessages>
        <ChatMessageListV2
          data={chatMessages}
          thinking={thinking}
          sessionId={sessionId}
          setReply={setReply}
          reply={reply}
          agentName={agentName}
          greeting={!messagesLoading && chatMessages && chatMessages?.length === 0 && chatGreeting}
        />
      </StyledMessages>

      {isCallBased ? (
        <StyledCallInputContainer>
          <ButtonPrimary
            onClick={() => {
              openModal({ name: 'contact-list-modal', data: { callType: 'browser' } })
            }}
            size={Button.sizes?.MEDIUM}
            rightIcon={Microphone}
          >
            {t('call-browser')}
          </ButtonPrimary>
          {agentById?.agent?.agent_type === 'outbound' && (
            <ButtonPrimary
              onClick={() => {
                openModal({ name: 'contact-list-modal', data: { callType: 'outbound' } })
              }}
              size={Button.sizes?.MEDIUM}
              rightIcon={Mobile}
            >
              {t('call-phone')}
            </ButtonPrimary>
          )}
        </StyledCallInputContainer>
      ) : (
        <StyledChatFooter>
          <StyledButtonGroup>
            {!canStopGenerating && (
              <StyledSuggestionsContainer>
                {chatSuggestions.map((chatSuggestion: string, index: number) => {
                  const { shortText: shortSuggestion } = textSlicer(chatSuggestion, 110)

                  return (
                    <StyledOption
                      key={index}
                      onClick={() => {
                        handlePickedSuggestion(chatSuggestion)
                      }}
                    >
                      {shortSuggestion}
                    </StyledOption>
                  )
                })}
              </StyledSuggestionsContainer>
            )}

            {canStopGenerating && (
              <StyledStopGeneratingButton>
                <ButtonSecondary
                  onClick={handleStopGenerating}
                  size={Button.sizes?.SMALL}
                  disabled={stopChatLoading}
                >
                  {t('stop-generating')}
                </ButtonSecondary>
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

              {!startedRecording && !voicePreview && (
                <>
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
                </>
              )}

              <StyledChatInputRightSide fullWidth={voicePreview || startedRecording ? true : false}>
                {!teamId && (
                  <AudioRecorder
                    setVoicePreview={setVoicePreview}
                    setStartedRecording={setStartedRecording}
                  />
                )}

                {voicePreview && (
                  <AudioPlayer
                    audioUrl={voicePreview || ''}
                    onCloseClick={() => setVoicePreview(null)}
                  />
                )}

                {voiceLoading ? (
                  <StyledLoaderWrapper>
                    <Loader size={20} />
                  </StyledLoaderWrapper>
                ) : (
                  <StyledButton
                    onClick={() => {
                      if (formValue || uploadedFileObject || voicePreview) {
                        createMessage()
                      }
                    }}
                    disabled={(!formValue && !voicePreview) || thinking}
                  >
                    <StyledSenIcon />
                  </StyledButton>
                )}

                {/* {user && <CommandIcon />} */}
              </StyledChatInputRightSide>
            </StyledTextareaWrapper>
          </StyledForm>
          <StyledChatBottom>
            <TypingUsers usersData={filteredTypingUsers} />
          </StyledChatBottom>
        </StyledChatFooter>
      )}
    </StyledWrapper>
  )
}

export default ChatV2

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  /* overflow-y: auto; */
  transition: background-color 300ms ease-in-out;
  position: relative;
  /* margin: 0 auto; */
  /* padding-bottom: 50px; */
  /* height: calc(100% - 80px); */
  /* margin-bottom: 100px; */
`

const StyledMessages = styled.main`
  // flex-grow: 1;
  width: 100%;
  height: 100%;

  /* margin-bottom: 80px; // To make space for input */
  /* height: calc(100vh - 220px); */
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  /* align-items: center; */
  padding: 10px 30px;
  /* gap: 12px; */
  /* padding-top: 5px; */

  background: #fff;
  /* Style */

  /* box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25); */

  /* backdrop-filter: blur(100px); */

  /* Note: backdrop-filter has minimal browser support */

  /* border-radius: 100px; */
  /* cursor: pointer; */

  border-radius: 8px;
  border: 3px solid var(--border-soft, rgba(0, 0, 0, 0.1));
  background: var(--background-background-primary, #fff);

  width: 100%;
  /* max-width: 800px; */
  min-height: 54px;
  height: fit-content;
  max-height: 250px;

  /* @media only screen and (max-width: 1750px) {
    max-width: 600px;
  } */
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
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  /* padding: 10px 0px;
  padding-left: 20px; */
`

const StyledButton = styled.div<{ disabled: boolean }>`
  /* margin: 0 10px; */
  cursor: pointer;
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: auto;
    `};
`

const StyledChatFooter = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-end;

  width: 100%;

  padding-right: 24px;
`

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  padding: 16px 0;
  width: 100%;

  height: 70px;
`

const StyledSuggestionsContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;

  align-items: center;
  gap: 12px;

  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`

const StyledStopGeneratingButton = styled.div`
  margin-right: 94px;

  position: absolute;
  backdrop-filter: blur(100px);
`

const StyledFileWrapper = styled.div`
  display: flex;

  margin-top: 10px;
  margin-left: 270px;
`

const StyledInputWrapper = styled.div<{ secondary?: boolean }>`
  /* width: calc(100vw - 600px);
  max-width: 600px; */
  overflow: hidden;

  width: 100%;
  ${p =>
    p.secondary &&
    css`
      padding-left: 2px;
    `};
`

const StyledChatBottom = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 50px;
  width: 100%;
`
const StyledSenIcon = styled(SendIcon)`
  min-width: 30px;
  path {
    fill: ${({ theme }) => theme.body.iconColor};
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledLoaderWrapper = styled.div`
  padding: 0 5px;
`
const StyledChatInputRightSide = styled.div<{ fullWidth: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  justify-content: flex-end;

  width: 100%;
  min-width: 30px;

  width: fit-content;
  ${p =>
    p.fullWidth &&
    css`
      width: 100%;
    `};
`
const StyledCallInputContainer = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  gap: 10px;

  height: 70px;
`
