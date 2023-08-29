import styled, { keyframes } from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'

import Logo from 'assets/icons/2.svg'
import { useEffect } from 'react'

export const WelcomeLoader = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.href = '/'
  //   }, 5000)
  // }, [])

  return (
    <StyledMainWraper>
      <StyledFirstFigure />
      <StyledSecondFigure />
      <StyledThirdFigure />
      <StyledCenterContainer>
        <img src={Logo} alt='' />
        <Heading
          value={'Welcome to L3vels'}
          type={Heading.types.h1}
          customColor='#fff'
          style={{ fontSize: 90, lineHeight: 'normal' }}
        />
      </StyledCenterContainer>
    </StyledMainWraper>
  )
}
export default WelcomeLoader

const StyledMainWraper = styled.div`
  position: relative;
  background-color: #0d0a2c;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`

const figureOneAnimation = keyframes`
0% {transform: translate(-25%, 25%) rotate(45deg)}
18% {transform: translate(10%, 30%) rotate(90deg)}
25% {transform: translate(25%, 45%) rotate(135deg)}
33% {transform: translate(50%, 50%) rotate(250deg) }
50% {transform: translate(70%, 90%) rotate(360deg)}
75% {transform: translate(50%, 100%) rotate(135deg)}
100% {transform: translate(5%, 60%) rotate(0deg)}
`

const figureSecondAnimation = keyframes`
0% {transform: translate(40%, -25%) rotate(-45deg)}
18% {transform: translate(20%, 0%) rotate(90deg)}
25% {transform: translate(10%, 25%) rotate(190deg)}
33% {transform: translate(-30%, 50%) rotate(235deg) }
50% {transform: translate(0%, 25%) rotate(280deg)}
75% {transform: translate(25%, 25%) rotate(320deg)}
100% {transform: translate(40%, -25%) rotate(360deg)}
`

const figureThirdAnimation = keyframes`
0% {translate(100%, 30%)}
18% {transform: translate(70%, 20%) }
25% {transform: translate(40%, 10%) }
33% {transform: translate(10%, 0%) }
50% {transform: translate(40%, -20%) }
75% {transform: translate(80%, 0%) }
100% {transform: translate(100%, 50%) }
`

const StyledFirstFigure = styled.div`
  background: #07d2fb;
  filter: blur(210px);
  width: 1642px;
  height: 686px;
  position: absolute;
  border-radius: 50%;

  animation-name: ${figureOneAnimation};
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`

const StyledSecondFigure = styled.div`
  background: rgb(33, 252, 199);
  filter: blur(310px);
  width: 1642px;
  height: 686px;
  position: absolute;
  border-radius: 50%;

  //   right: -25%;
  //   top: -50%;

  animation-name: ${figureSecondAnimation};
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`
const StyledThirdFigure = styled.div`
  background: #0819b5;
  filter: blur(310px);
  width: 1324px;
  height: 1324px;
  position: absolute;
  border-radius: 50%;
  animation-name: ${figureThirdAnimation};
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`

const StyledCenterContainer = styled.div`
  top: 35%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  display: grid;
  align-items: center;
  justify-items: center;
`
