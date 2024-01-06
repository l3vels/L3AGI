import { ReactNode, useEffect, useRef, useState } from 'react'
import { CallContext } from '../contexts'
import styled, { css } from 'styled-components'
import { ButtonPrimary } from 'components/Button/Button'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import TypographyQuaternary from 'components/Typography/Quaternary'
import { Fullscreen, FullscreenClose, Microphone } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { useContacts } from '../pages/Contact/useContacts'
import Timer from './providerComponents/Timer'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'

import TypographySecondary from 'components/Typography/Secondary'

const CallProvider = ({ children }: { children: ReactNode }) => {
  const [shoWCall, setShowCall] = useState(false)
  const [callIds, setCallIds] = useState<{ agentId: string; contactId: string } | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const { handleCall, status, handleEndCall, currentSpeaker, error, transcripts } = useContacts()

  const { data: callAgent } = useAgentByIdService({ id: callIds?.agentId || '' })

  const contextValue = {
    shoWCall,
    setShowCall,
    setCallIds,
  }

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isAgentSpeaking, setAgentIsSpeaking] = useState(false)

  const microphoneStreamRef = useRef<any>(null)

  const initializeMicrophone = async () => {
    let audioContext: any
    let analyser: any
    // let microphoneStream: any
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContext = new window.AudioContext()
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 256

      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)

      stream.getAudioTracks()[0].enabled = !isMuted

      microphoneStreamRef.current = stream

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateMicrophoneStatus = () => {
        analyser.getByteFrequencyData(dataArray)

        const averageVolume = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length

        setIsSpeaking(averageVolume > 40) // Adjust this threshold based on your requirements

        requestAnimationFrame(updateMicrophoneStatus)
      }

      updateMicrophoneStatus()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  useEffect(() => {
    let agentTimeOutId: any

    if (currentSpeaker === 'agent') {
      setAgentIsSpeaking(true)
      clearTimeout(agentTimeOutId) // Clear existing timeout

      agentTimeOutId = setTimeout(() => {
        setAgentIsSpeaking(false)
      }, 1000) // Set new timeout
    }
  }, [currentSpeaker])

  // useEffect(() => {
  //   let userTimeOutId: any

  //   if (currentSpeaker === 'user') {
  //     setIsSpeaking(true)
  //     clearTimeout(userTimeOutId) // Clear existing timeout

  //     userTimeOutId = setTimeout(() => {
  //       setIsSpeaking(false)
  //     }, 1000) // Set new timeout
  //   }
  // }, [currentSpeaker])

  useEffect(() => {
    if (!callIds) return

    initializeMicrophone()
    handleCall({ agent_id: callIds.agentId, contact_id: callIds.contactId, type: 'browser' })
    setShowCall(true)
  }, [callIds])

  //todo fix mute
  const muteMicrophone = () => {
    if (callIds) {
      const stream = microphoneStreamRef.current
      if (stream) {
        const audioTracks = stream.getAudioTracks()
        // console.log('audioTracks', audioTracks)
        if (audioTracks.length > 0) {
          // Toggle the enabled property to mute/unmute the microphone
          audioTracks[0].enabled = isMuted
          setIsMuted(!isMuted)
        }
      }
    }
  }

  useEffect(() => {
    if (!error) return
    setCallIds(null)
    setShowCall(false)
  }, [error])

  const callTitle = 'Connecting...'

  return (
    <CallContext.Provider value={contextValue}>
      {children}
      {shoWCall && (
        <StyledRoot>
          <StyledCallWindow isShowDialog={showDialog}>
            <StyledWindowHeader>
              {status === 'connected' ? (
                <Timer />
              ) : (
                <TypographyQuaternary value={callTitle} size={'large'} />
              )}
            </StyledWindowHeader>
            <StyledWindowBody>
              <StyledAvatarWrapper isConnected>
                <StyledSpeakIndicator isSpeaking={isSpeaking}>
                  <AvatarGenerator name={'Test Person'} size={50} />
                </StyledSpeakIndicator>
                <TypographyQuaternary value={'Test Person'} size={'small'} />
              </StyledAvatarWrapper>

              <StyledAvatarWrapper isConnected={status === 'connected'}>
                <StyledSpeakIndicator isSpeaking={isAgentSpeaking}>
                  <AvatarGenerator name={callAgent?.agent?.name || ''} size={50} />
                </StyledSpeakIndicator>
                <TypographyQuaternary value={callAgent?.agent?.name} size={'small'} />
              </StyledAvatarWrapper>
            </StyledWindowBody>

            {showDialog && (
              <StyledDialogWindow>
                {transcripts?.map((transcript: any, index: number) => {
                  return (
                    <StyledDialogItem isBot={transcript.sender === 'bot'} key={index}>
                      <TypographySecondary value={transcript.text} size={'small'} />
                    </StyledDialogItem>
                  )
                })}
              </StyledDialogWindow>
            )}

            <StyledWindowFooter>
              <IconButton
                onClick={() => setShowDialog(!showDialog)}
                size={'small'}
                ariaLabel={!showDialog ? 'Show Dialog' : 'Hide Dialog'}
                icon={() => {
                  return <>{!showDialog ? <Fullscreen /> : <FullscreenClose />}</>
                }}
              />
              <IconButton
                onClick={() => setIsMuted(!isMuted)}
                size={'small'}
                ariaLabel={isMuted ? 'Unmute' : 'Mute'}
                icon={() => {
                  return (
                    <>
                      {isMuted ? (
                        <DiagonalLine>
                          <Microphone />
                        </DiagonalLine>
                      ) : (
                        <Microphone />
                      )}
                    </>
                  )
                }}
              />

              <ButtonPrimary
                onClick={() => {
                  setShowCall(false)
                  setCallIds(null)
                  handleEndCall()
                }}
                size={'small'}
              >
                Hung up
              </ButtonPrimary>
            </StyledWindowFooter>
          </StyledCallWindow>
        </StyledRoot>
      )}
    </CallContext.Provider>
  )
}

export default CallProvider

const StyledRoot = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;

  z-index: 10000000;

  display: flex;
  flex-direction: column;
`

const StyledCallWindow = styled.div<{ isShowDialog: boolean }>`
  width: 350px;
  height: 200px;

  border-radius: 10px;

  background-color: #000;

  display: flex;
  flex-direction: column;

  ${props =>
    props.isShowDialog &&
    css`
      height: 600px;
    `};
`

const StyledDialogWindow = styled.div`
  width: 350px;
  height: 100%;

  /* background-color: red; */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 12px 24px;

  overflow: auto;
`

const StyledWindowHeader = styled.div`
  height: 40px;
  /* background-color: red; */
  background-color: rgba(255, 255, 255, 0.1);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */

  width: 100%;

  padding: 12px 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledWindowBody = styled.div`
  display: flex;
  width: 100%;
  height: 200px;

  justify-content: space-around;
  align-items: center;

  padding: 8px;
`

const StyledWindowFooter = styled.div`
  max-height: 50px;
  min-height: 50px;

  width: 100%;

  background-color: rgba(255, 255, 255, 0.1);

  display: flex;
  justify-content: center;
  gap: 4px;

  padding: 4px;

  border-radius: 0 0 10px 10px;
`
const StyledAvatarWrapper = styled.div<{ isConnected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  ${props =>
    !props.isConnected &&
    css`
      opacity: 0.6;
    `};
`
const StyledSpeakIndicator = styled.div<{ isSpeaking: boolean }>`
  width: fit-content;
  height: fit-content;

  border-radius: 100px;

  ${props =>
    props.isSpeaking &&
    css`
      outline: 4px solid #74faa1;
    `};
`
const StyledDialogItem = styled.div<{ isBot: boolean }>`
  width: fit-content;
  max-width: 80%;

  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px;
  border-radius: 10px;

  background-color: rgba(255, 255, 255, 0.1);

  ${props =>
    props.isBot &&
    css`
      margin-left: auto;
    `};
`
const DiagonalLine = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transform: translateY(-50%) rotate(-45deg);
  }
`
