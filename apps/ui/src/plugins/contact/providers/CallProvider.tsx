import { ReactNode, useEffect, useState } from 'react'
import { CallContext } from '../contexts'
import styled, { css } from 'styled-components'
import { ButtonPrimary } from 'components/Button/Button'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import TypographySecondary from 'components/Typography/Secondary'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'
import TypographyQuaternary from 'components/Typography/Quaternary'
import { Mute, Sound } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { useContacts } from '../pages/Contact/useContacts'

const CallProvider = ({ children }: { children: ReactNode }) => {
  const [shoWCall, setShowCall] = useState(false)

  const [callIds, setCallIds] = useState<{ agentId: string; contactId: string } | null>(null)

  const [isMuted, setIsMuted] = useState(false)

  const { handleCall, status, stop } = useContacts()

  const contextValue = {
    shoWCall,
    setShowCall,
    setCallIds,
  }

  const [isSpeaking, setIsSpeaking] = useState(false)

  const initializeMicrophone = async () => {
    let audioContext: any
    let analyser: any
    let microphoneStream: any

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContext = new window.AudioContext()
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 256

      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)

      microphoneStream = stream

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateMicrophoneStatus = () => {
        analyser.getByteFrequencyData(dataArray)

        const averageVolume = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length

        setIsSpeaking(averageVolume > 45) // Adjust this threshold based on your requirements

        requestAnimationFrame(updateMicrophoneStatus)
      }

      updateMicrophoneStatus()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  // useEffect(() => {
  //   if (!shoWCall) return

  //   initializeMicrophone()
  // }, [shoWCall])

  useEffect(() => {
    if (!callIds) return

    initializeMicrophone()
    handleCall({ agent_id: callIds.agentId, contact_id: callIds.contactId, type: 'browser' })
    setShowCall(true)
  }, [callIds])

  let callTitle = 'Wait for agent'

  if (status === 'connected') callTitle = 'Connected'

  return (
    <CallContext.Provider value={contextValue}>
      {children}
      {shoWCall && (
        <StyledCallWindow>
          <StyledWindowHeader>
            <TypographyQuaternary value={callTitle} size={'large'} />
          </StyledWindowHeader>
          <StyledWindowBody>
            <StyledAvatarWrapper isConnected>
              <StyledSpeakIndicator isSpeaking={isSpeaking}>
                <AvatarGenerator name={'Test Person'} size={50} />
              </StyledSpeakIndicator>
              <TypographyQuaternary value={'Test Person'} size={'small'} />
            </StyledAvatarWrapper>

            <StyledAvatarWrapper isConnected={status === 'connected'}>
              <AvatarGenerator name={'Test Agent'} size={50} />
              <TypographyQuaternary value={'Test Agent'} size={'small'} />
            </StyledAvatarWrapper>
          </StyledWindowBody>

          <StyledWindowFooter>
            <IconButton
              onClick={() => setIsMuted(!isMuted)}
              size={'small'}
              ariaLabel={isMuted ? 'Unmute' : 'Mute'}
              icon={() => {
                return <>{isMuted ? <Mute /> : <Sound />}</>
              }}
            />

            <ButtonPrimary
              onClick={() => {
                setShowCall(false)
                setCallIds(null)
                stop()
              }}
              size={'small'}
            >
              Hung up
            </ButtonPrimary>
          </StyledWindowFooter>
        </StyledCallWindow>
      )}
    </CallContext.Provider>
  )
}

export default CallProvider

const StyledCallWindow = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;

  width: 350px;
  height: 200px;

  border-radius: 10px;

  background-color: #000;

  z-index: 10000000;

  display: flex;
  flex-direction: column;
`

const StyledWindowHeader = styled.div`
  height: 40px;
  /* background-color: red; */
  background-color: rgba(255, 255, 255, 0.1);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */

  width: 100%;

  padding: 12px 16px;

  border-radius: 10px 10px 0 0;

  display: flex;
  align-items: center;
`

const StyledWindowBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: space-around;
  align-items: center;

  padding: 8px;
`

const StyledWindowFooter = styled.div`
  height: 100px;
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
