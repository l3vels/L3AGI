import styled from 'styled-components'
import BgImage from 'assets/backgrounds/collection_bg.jpg'
import { ReactNode } from 'react'

type WrapperSecondaryProps = {
  children: ReactNode
}

const WrapperSecondary = ({ children }: WrapperSecondaryProps) => {
  return (
    <StyledMainWrapper className='wrapper_secondary'>
      <StyledWrapperLayout>{children}</StyledWrapperLayout>
    </StyledMainWrapper>
  )
}

export default WrapperSecondary

const StyledMainWrapper = styled.div`
  background-image: url(${BgImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  //   min-height: 100vh;
  height: auto;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
`

const StyledWrapperLayout = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  width: 100%;
  height: 100%;
  padding: 27px 20px;
`
