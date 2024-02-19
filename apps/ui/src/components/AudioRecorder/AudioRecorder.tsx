import { useContext, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { StyledCallIcon } from 'plugins/contact/pages/Contact/Contacts'

import { ToastContext } from 'contexts'
import { StyledTimeIndicator } from 'components/AudioPlayer/AudioPlayer'

const AudioRecorder = ({
  setVoicePreview,
  setStartedRecording,
}: {
  setVoicePreview: (value: string | null) => void
  setStartedRecording: (value: boolean) => void
}) => {
  const { setToast } = useContext(ToastContext)

  const [recording, setRecording] = useState(false)

  const [mediaRecorder, setMediaRecorder] = useState<any>(null)

  const [timer, setTimer] = useState('00:00') // Timer state
  const timerIntervalRef = useRef<any>(null)

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Permission is granted if getUserMedia resolves without an error
      stream.getTracks().forEach(track => track.stop()) // Stop the tracks after checking
      return true
    } catch (error) {
      // Permission is denied or an error occurred
      setToast({
        message: 'Microphone access denied!',
        type: 'negative',
        open: true,
      })

      return false
    }
  }

  const startRecording = async () => {
    setVoicePreview(null)

    const isMicrophone = await checkMicrophonePermission()

    try {
      if (!isMicrophone) return
      setStartedRecording(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    } catch (err) {
      // console.error('Error accessing the microphone:', err)
      setToast({
        message: 'Error accessing the microphone!',
        type: 'negative',
        open: true,
      })
    }
  }

  const stopRecording = async () => {
    if (!mediaRecorder) return

    try {
      await mediaRecorder.stop()

      setRecording(false)

      mediaRecorder.ondataavailable = async (e: any) => {
        if (e.data.size > 0) {
          const blob = new Blob([e.data], { type: 'audio/wav' })
          const audioURL = URL.createObjectURL(blob)

          setVoicePreview(audioURL)
        }
      }
    } catch (e) {
      setToast({
        message: 'Failed to stop recording',
        type: 'negative',
        open: true,
      })
    }

    setStartedRecording(false)
  }

  useEffect(() => {
    if (recording) {
      let seconds = 0
      timerIntervalRef.current = setInterval(() => {
        seconds = seconds + 1
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
          remainingSeconds,
        ).padStart(2, '0')}`
        setTimer(formattedTime)
      }, 1000)
    } else {
      clearInterval(timerIntervalRef.current)
      setTimer('00:00')
    }

    return () => {
      clearInterval(timerIntervalRef.current)
    }
  }, [recording])

  return (
    <StyledRoot recording={recording}>
      <>
        {!recording ? (
          <button onClick={startRecording} disabled={recording} type='button'>
            <StyledCallIcon />
          </button>
        ) : (
          <>
            <StyledTimeIndicator>{timer}</StyledTimeIndicator>
            <StyledButton onClick={stopRecording} disabled={!recording} type='button'>
              <StyledTimeIndicator>Stop recording</StyledTimeIndicator>
              <StyledCallIcon />
            </StyledButton>
            {/* Display the formatted time */}
          </>
        )}
      </>
    </StyledRoot>
  )
}

export default AudioRecorder

const StyledRoot = styled.div<{ recording: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.body.cardBgColor};

  min-width: 30px;
  min-height: 30px;

  border-radius: 100px;

  ${p =>
    p.recording &&
    css`
      width: 100%;
      justify-content: space-between;
      padding: 0 20px;
      padding-right: 5px;
    `};
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
`
