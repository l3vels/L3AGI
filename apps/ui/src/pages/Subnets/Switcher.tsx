import { useState } from 'react'
import styled from 'styled-components'

const Switcher = () => {
  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => setIsOn(!isOn)

  return (
    <SwitchContainer onClick={toggleSwitch} isOn={isOn}>
      <SwitchBall isOn={isOn} />
    </SwitchContainer>
  )
}

export default Switcher

const SwitchContainer = styled.div<{ isOn: boolean }>`
  width: 40px; // Reduced from 50px to 40px
  height: 20px; // Reduced from 25px to 20px
  background-color: ${({ isOn }) => (isOn ? '#3bbe3b' : '#D3D3D3')};
  border-radius: 20px; // Adjusted for smaller size
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
`

const SwitchBall = styled.div<{ isOn: boolean }>`
  width: 16px; // Reduced from 20px to 16px
  height: 16px; // Reduced from 20px to 16px
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
  transform: ${({ isOn }) =>
    isOn ? 'translateX(20px)' : 'translateX(0px)'}; // Adjusted translateX for smaller container
`
