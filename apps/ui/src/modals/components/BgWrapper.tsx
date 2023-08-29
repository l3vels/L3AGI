import styled, { css } from 'styled-components'

type BgWrapperProps = {
  children: any
  dark?: boolean
}

const BgWrapper = ({ children, dark = false }: BgWrapperProps) => {
  return (
    <StyledBackground>
      <StyledBlurEffect dark={dark}>{children}</StyledBlurEffect>
    </StyledBackground>
  )
}

export default BgWrapper

const StyledBackground = styled.div`
  /* background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${p => p.theme.body.backgroundImageSecondary}); */
  background: #3981f6;

  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  width: 100%;
  height: 100%;
`
const StyledBlurEffect = styled.div<{ dark: boolean }>`
  ${props =>
    props.dark &&
    css`
      background: rgba(0, 0, 0, 0.7);
    `}
  backdrop-filter: blur(100px);
`
