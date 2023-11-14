import { useState, useEffect, useRef, memo } from 'react'
import styled, { css } from 'styled-components'

type TypewriterProps = {
  message: string
  delay?: number
  callFunction: () => void
  size?: 'small' | 'large'
}

// Custom Typewriter component
const Typewriter = ({ message, delay = 20, callFunction, size = 'large' }: TypewriterProps) => {
  const [text, setText] = useState('')
  const requestRef = useRef<any>()
  const startTimeRef = useRef<any>()

  // Request animation frame recursion function for running the typewriter effect, this will type out each character in single function call and the function will trigger till all the characters are typed out
  const animate = (time: any) => {
    // Check if startTimeRef.current does not exists and set it to the requestAnimationFrame provided timestamp
    if (!startTimeRef.current) {
      startTimeRef.current = time
      //   callFunction(true)
    }

    // Calculate the elapsed time since the start of the animation
    const elapsedTime = time - startTimeRef.current
    // Calculate the number of characters to show based on the elapsed time and delay
    const charactersToShow = Math.floor(elapsedTime / delay)
    setText(message.slice(0, charactersToShow))

    // If there are still characters to show, request another animation frame
    if (charactersToShow < message.length) {
      requestRef.current = requestAnimationFrame(animate)
    } else {
      callFunction()
    }
  }

  useEffect(() => {
    startTimeRef.current = null
    requestRef.current = requestAnimationFrame(animate)

    // Cancel the animation loop on unmount
    return () => {
      cancelAnimationFrame(requestRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, delay])

  return <StyledTypewriterWrapper size={size}>{text}</StyledTypewriterWrapper>
}

export default memo(Typewriter)

const StyledTypewriterWrapper = styled.div<{ size: string }>`
  width: 100%;
  color: ${({ theme }) => theme.body.textColorPrimary};

  white-space: pre-line;

  ${p =>
    p.size === 'small' &&
    css`
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
    `};
`
