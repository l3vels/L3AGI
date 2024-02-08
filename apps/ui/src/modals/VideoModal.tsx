import withRenderModal from 'hocs/withRenderModal'

import { useModal } from 'hooks'
import styled from 'styled-components'
import { StyledButtonWrapper } from './AgentViewModal'
import Modal from 'share-ui/components/Modal/Modal'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'

type VideoModalProps = {
  data: {
    videoSrc: string
  }
}

const VideoModal = ({ data }: VideoModalProps) => {
  const { closeModal } = useModal()

  const { videoSrc } = data

  return (
    <StyledModal onClose={() => closeModal('video-modal')} show backgroundColor='dark'>
      <StyledModalBody>
        <StyledIframe
          width='900'
          height='600'
          src={`https://www.youtube.com/embed/${videoSrc}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></StyledIframe>
      </StyledModalBody>
    </StyledModal>
  )
}

export default withRenderModal('video-modal')(VideoModal)

const StyledModalBody = styled.div`
  padding-top: 10px;
`

const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }
`
const StyledIframe = styled.iframe`
  border-radius: 10px;
  margin: auto;
`
