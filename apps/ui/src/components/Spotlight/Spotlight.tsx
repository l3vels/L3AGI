import { useContext, useEffect, useRef, useState } from 'react'

import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import TypographyQuaternary from 'components/Typography/Quaternary'
import Search from 'share-ui/components/Icon/Icons/components/SearchOutline'

import SendIcon from 'share-ui/components/Icon/Icons/components/Send'
import SpotlightPlugins from './SpotlightPlugins'
import ChatLoader from './ChatLoader'
import { useCreateChatMessageService, useChatMessagesService } from 'services'

import { useSuggestions } from './useSuggestions'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContext } from 'contexts'
import Mentions from 'components/Mentions'
import CommandIcon from './CommandIcon'
import Typewriter from 'components/ChatTypingEffect/Typewriter'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'

const Spotlight = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { setToast } = useContext(ToastContext)

  const [expanded, setExpanded] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [showPlugins, setShowPlugins] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [typingEffectText, setTypingEffectText] = useState(false)

  const [formValue, setFormValue] = useState('')

  const { chatSuggestions } = useSuggestions()

  const { agentId, teamId } = useParams()

  let route = '/chat'

  if (agentId) {
    route = `/chat?agent=${agentId}`
  } else if (teamId) {
    route = `/chat?team=${teamId}`
  }

  // Prefetch messages
  useChatMessagesService({
    agentId,
    teamId,
  })

  const inputRef = useRef(null as any)
  const outsideClickRef = useRef(null as any)

  const handleChatClick = () => {
    setExpanded(true)
    setShowSuggestion(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 1)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target) &&
        (expanded || showPlugins)
      ) {
        setExpanded(false)
        setShowPlugins(false)
        setShowSuggestion(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [outsideClickRef, expanded, showPlugins])

  const [createChatMessageService] = useCreateChatMessageService()

  const handleSendMessage = async () => {
    try {
      setChatLoading(true)

      setTimeout(() => {
        setExpanded(false)
        setShowSuggestion(false)
      }, 1)

      if (typingEffectText) {
        setTypingEffectText(false)
      }

      await createChatMessageService({
        message: formValue,
        agentId,
        teamId,
      })

      navigate(route)

      setChatLoading(false)
      setFormValue('')
    } catch (e) {
      setToast({
        message: `${t('toast-negative-message')}`,
        type: 'negative',
        open: true,
      })
      setChatLoading(false)
      setFormValue('')
    }
  }

  const postHandler = async () => {
    if (formValue.length !== 0) {
      handleSendMessage()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      e.preventDefault()
      postHandler()
    }
  }

  const handlePickedSuggestion = (value: string) => {
    setShowSuggestion(false)
    setFormValue(value)
    setTypingEffectText(true)
  }

  return (
    <>
      <div ref={outsideClickRef}>
        {/* <StyledPluginsContainer showPlugins={showPlugins}>
          <SpotlightPlugins />
        </StyledPluginsContainer> */}

        <StyledChatOptionsContainer expanded={showSuggestion}>
          <StyledRow>
            {chatSuggestions.slice(0, 2).map((chatSuggestion: string) => {
              return (
                <StyledOption
                  key={chatSuggestion}
                  onClick={() => {
                    handlePickedSuggestion(chatSuggestion)
                  }}
                >
                  {chatSuggestion}
                </StyledOption>
              )
            })}
          </StyledRow>
          <StyledRow>
            {chatSuggestions.slice(-3).map((chatSuggestion: string) => {
              return (
                <StyledOption
                  key={chatSuggestion}
                  onClick={() => {
                    handlePickedSuggestion(chatSuggestion)
                  }}
                >
                  {chatSuggestion}
                </StyledOption>
              )
            })}
          </StyledRow>
        </StyledChatOptionsContainer>

        <StyledFooterChat expanded={expanded} className='blur'>
          {chatLoading ? (
            <>
              <ChatLoader />
              <TypographyQuaternary
                value={t('thinking')}
                type={TypographyTypes.LABEL}
                size={TypographySizes.sm}
                style={{ color: 'red' }}
              />
            </>
          ) : (
            <>
              <StyledIconWrapper>
                {/* <StyledPluginButton
                src={pluginsIcon}
                active={showPlugins}
                onClick={() => setShowPlugins(!showPlugins)}
              /> */}
                <StyledSearchIcon size={28} />
              </StyledIconWrapper>

              <StyledInputWrapper onClick={handleChatClick}>
                {!expanded && (
                  <TypographyQuaternary
                    value={t('search')}
                    type={TypographyTypes.LABEL}
                    size={TypographySizes.sm}
                  />
                )}
                {
                  <>
                    {typingEffectText ? (
                      <StyledTypewriterWrapper>
                        <Typewriter
                          size='small'
                          message={formValue}
                          callFunction={() => {
                            setTypingEffectText(false)
                            setTimeout(() => {
                              inputRef.current?.focus()
                              inputRef.current?.setSelectionRange(
                                formValue.length,
                                formValue.length,
                              )
                            }, 1)
                          }}
                        />
                      </StyledTypewriterWrapper>
                    ) : (
                      <StyledInputCover expanded={expanded}>
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
                      </StyledInputCover>

                      // <StyledInput
                      //
                      //   ref={inputRef}
                      //   onChange={e => {
                      //     setFormValue(e.target.value)
                      //     adjustTextareaHeight()
                      //   }}
                      //   value={formValue}
                      //   onKeyDown={handleKeyDown}
                      //   rows={1}
                      // />
                    )}
                  </>
                }
              </StyledInputWrapper>
              {!expanded ? (
                <CommandIcon />
              ) : (
                <StyledRightIcon
                  onClick={postHandler}
                  disabled={formValue.length === 0 || typingEffectText}
                >
                  <StyledSenIcon size={27} />
                </StyledRightIcon>
              )}
            </>
          )}
        </StyledFooterChat>
      </div>

      {/* <StyledWrapper>
        <StyledInnerContainer>
          <StyledColumnContainer onClick={() => openModal({ name: 'spotlight-modal' })}>
            <SearchIcon size='30' />
            <StyledTypography>Spotlight</StyledTypography>
          </StyledColumnContainer>
          <StyledColumnContainer gap='6'>
            <Toggle
              kind='tertiary'
              isDefaultSelected={show_banner}
              size='small'
              onChange={onHandleChangeTestMode}
              isSelected={show_banner}
            />
            <StyledTypography>Test Mode</StyledTypography>
          </StyledColumnContainer>
          <StyledNotificationContainer onClick={() => openModal({ name: 'ai-chat-modal' })}>
            <StyledColumnContainer>
              <Avatar
                size={Avatar.sizes.SMALL}
                src={defaultAvatar}
                type={Avatar.types.IMG}
                rectangle
                className='notification_avatar'
              />
              <StyledTypography style={{ fontWeight: 700 }}></StyledTypography>
            </StyledColumnContainer>
          </StyledNotificationContainer>
        </StyledInnerContainer>
      </StyledWrapper> */}

      {/* <StyledNotificationsButtonWrapper>
        <Button
          kind={Button.kinds?.TERTIARY}
          onClick={() => openModal({ name: 'notifications-modal' })}
        >
          <StyledNotificationLabelWrapper>
            <Notifications size='20' />
            {notificationsCount}
          </StyledNotificationLabelWrapper>
        </Button>
      </StyledNotificationsButtonWrapper>
    
      <NotificationsModal refetchCount={refetchCount} /> */}
    </>
  )
}

export default Spotlight

const StyledFooterChat = styled.div<{ expanded: boolean }>`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 0px 23px 0px 16px;
  gap: 8px;

  min-width: 180px;
  width: 180px;
  height: 48px;

  background: rgba(0, 0, 0, 0.1);
  /* Style */

  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(100px);

  /* Note: backdrop-filter has minimal browser support */

  border-radius: 100px;

  /* cursor: pointer; */

  ${props =>
    props.expanded &&
    css`
      width: fit-content;
      min-height: 48px;
      height: fit-content;
      max-height: 150px;
    `}
`

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`
const StyledRightIcon = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-left: auto;

  width: fit-content;

  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
`
export const StyledInput = styled.textarea<{ expanded: boolean }>`
  display: none;

  width: 600px;
  max-height: 100px;
  background-color: transparent;
  border: none;

  margin: 5px 0px;

  resize: none;

  &:focus-visible {
    outline: none;
  }

  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  ${props =>
    props.expanded &&
    css`
      display: block;
    `}
`
const StyledInputCover = styled.div<{ expanded: boolean }>`
  display: none;
  width: 250px;

  ${props =>
    props.expanded &&
    css`
      display: block;
    `}
`

const StyledChatOptionsContainer = styled.div<{ expanded: boolean }>`
  display: none;
  ${props =>
    props.expanded &&
    css`
      position: fixed;
      bottom: 70px;

      left: 50%;
      transform: translateX(-50%);

      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 100;
    `}
`
export const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  gap: 10px;

  min-width: 400px;
  width: fit-content;
  height: 36px;

  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(100px);
  border-radius: 60px;

  color: ${({ theme }) => theme.body.textColorPrimary};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  font-family: 'Circular', 'Roboto';
  cursor: pointer;

  :hover {
    background: rgba(0, 0, 0, 0.3);
  }
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
`

const StyledTypewriterWrapper = styled.div`
  width: 600px;
  padding-left: 2px;
`
const StyledIconWrapper = styled.div`
  opacity: 0.6;
`

const StyledSearchIcon = styled(Search)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledSenIcon = styled(SendIcon)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
