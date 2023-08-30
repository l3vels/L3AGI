import styled from 'styled-components'

import loadingVideo from 'assets/videos/chatLoading.mp4'

const ChatLoader = () => {
  return (
    <StyledVideoWrapper>
      <StyledVideo autoPlay loop muted>
        <source src={loadingVideo} type='video/mp4' />
        <source src={loadingVideo} type='video/ogg' />
      </StyledVideo>
    </StyledVideoWrapper>
  )
}

export default ChatLoader

const StyledVideo = styled.video`
  width: 32px;
  height: 32px;
  object-fit: cover;
  transform: scale(1.6);
`
const StyledVideoWrapper = styled.div`
  max-width: 32px;
  max-height: 32px;
  border-radius: 100px;
  overflow: hidden;
`
