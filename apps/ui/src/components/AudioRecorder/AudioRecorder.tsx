import useUploadFile from 'hooks/useUploadFile'
import { useState } from 'react'
import styled from 'styled-components'

const AudioRecorder = ({ setRecordedVoice }: { setRecordedVoice: any }) => {
  const [recording, setRecording] = useState(false)
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
  }

  //   const uploadRecording = async () => {
  //     if (recordedChunks.length) {
  //       const blob = new Blob(recordedChunks, { type: 'audio/wav' })

  //       const formData: any = new FormData()
  //       await formData.append('audio', blob, 'recorded_audio.wav')

  //       const audioBlob = await formData.get('audio')

  //       const uploadedFiles = await uploadFile(
  //         {
  //           name: audioBlob.name,
  //           type: audioBlob.type,
  //           size: audioBlob.size,
  //         },
  //         audioBlob,
  //       )
  //       setRecordedVoice(uploadedFiles?.url)
  //       console.log('uploadedFiles', uploadedFiles)
  //     }
  //   }

  return (
    <StyledRoot>
      {!recording ? (
        <button onClick={startRecording} disabled={recording} type='button'>
          Start
        </button>
      ) : (
        <button onClick={stopRecording} disabled={!recording} type='button'>
          Stop
        </button>
      )}
      {/* <button onClick={uploadRecording} disabled={recordedChunks.length === 0} type='button'>
        Play Recording
      </button> */}
    </StyledRoot>
  )
}

export default AudioRecorder

const StyledRoot = styled.div`
  display: flex;
  background: grey;
`
