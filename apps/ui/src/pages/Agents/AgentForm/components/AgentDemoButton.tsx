import DemoButton from 'components/DemoButton'
import { useModal } from 'hooks'

const AgentDemoButton = () => {
  const { openModal } = useModal()

  return (
    <DemoButton
      onClick={() =>
        openModal({
          name: 'video-modal',
          data: { videoSrc: import.meta.env.REACT_APP_YOUTUBE_VIDEO_ID },
        })
      }
    />
  )
}

export default AgentDemoButton
