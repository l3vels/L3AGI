import DemoButton from 'components/DemoButton'
import { useModal } from 'hooks'
import styled from 'styled-components'

const DatasourceDemoButton = () => {
  const { openModal } = useModal()

  return (
    <StyledCustomButtonWrapper>
      <DemoButton
        onClick={() =>
          openModal({
            name: 'video-modal',
            data: { videoSrc: import.meta.env.REACT_APP_YOUTUBE_VIDEO_DATA_SOURCE_ID },
          })
        }
      />
    </StyledCustomButtonWrapper>
  )
}

export default DatasourceDemoButton

const StyledCustomButtonWrapper = styled.div`
  margin-right: auto;
`
