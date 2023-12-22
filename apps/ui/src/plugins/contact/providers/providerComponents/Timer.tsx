import { useState, useEffect } from 'react'
import TypographyQuaternary from 'components/Typography/Quaternary'

const Timer = () => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Increase seconds by 1
      setSeconds(prevSeconds => (prevSeconds === 59 ? 0 : prevSeconds + 1))

      // Increase minutes if seconds reach 59
      if (seconds === 59) {
        setMinutes(prevMinutes => prevMinutes + 1)
      }
    }, 1000)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerInterval)
  }, [seconds]) // The effect depends on the seconds state

  // Format the time to have leading zeros
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return <TypographyQuaternary value={formattedTime} size={'large'} />
}

export default Timer
