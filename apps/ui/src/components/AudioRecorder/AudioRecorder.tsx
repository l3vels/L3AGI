import { useState } from 'react'
import styled from 'styled-components'
import useUploadFile from 'hooks/useUploadFile'
import { StyledCallIcon } from 'plugins/contact/pages/Contact/Contacts'

import Loader from '@l3-lib/ui-core/dist/Loader'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'

const AudioRecorder = ({ setRecordedVoice }: { setRecordedVoice: any }) => {
  const [recording, setRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<any>(null)

  const { uploadFile } = useUploadFile()

  const startRecording = async () => {
    setRecordedVoice(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    } catch (err) {
      console.error('Error accessing the microphone:', err)
    }
  }

  const stopRecording = async () => {
    if (!mediaRecorder) return
    setIsLoading(true)
    try {
      await mediaRecorder.stop()
      setRecording(false)

      mediaRecorder.ondataavailable = async (e: any) => {
        if (e.data.size > 0) {
          const blob = new Blob([e.data], { type: 'audio/wav' })

          const formData: any = new FormData()
          await formData.append('audio', blob, 'recorded_audio.wav')

          const audioBlob = await formData.get('audio')

          const uploadedFiles = await uploadFile(
            {
              name: audioBlob.name,
              type: audioBlob.type,
              size: audioBlob.size,
            },
            audioBlob,
          )
          setRecordedVoice(uploadedFiles?.url)
        }
      }
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <StyledRoot>
      {isLoading ? (
        <Loader size={20} />
      ) : (
        <>
          {!recording ? (
            <button onClick={startRecording} disabled={recording} type='button'>
              <StyledCallIcon />
            </button>
          ) : (
            <button onClick={stopRecording} disabled={!recording} type='button'>
              <StyledCloseIcon />
            </button>
          )}
        </>
      )}
    </StyledRoot>
  )
}

export default AudioRecorder

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.body.cardBgColor};

  min-width: 30px;
  min-height: 30px;

  border-radius: 100px;
`
