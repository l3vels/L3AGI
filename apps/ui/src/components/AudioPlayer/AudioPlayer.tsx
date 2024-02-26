import { useEffect, useRef, useState } from 'react'

import Play from 'share-ui/components/Icon/Icons/components/PlayOutline'

import Pause from 'share-ui/components/Icon/Icons/components/Pause'
import styled, { css } from 'styled-components'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'

const AudioPlayer = ({
  audioUrl,
  onCloseClick,
}: {
  audioUrl: string
  onCloseClick?: () => void
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  const togglePlay = () => {
    if (audioRef.current === null) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current === null) return
    if (progressBarRef.current === null) return

    setCurrentTime(audioRef.current.currentTime)
    // setDuration(audioRef.current.duration)

    // Calculate the percentage of audio played
    const percentage = (audioRef.current.currentTime / duration) * 100
    progressBarRef.current.style.background = `linear-gradient(to right, #D6EBFF ${percentage}%, transparent 0)`

    if (percentage === 100) {
      setIsPlaying(false)
      // progressBarRef.current.style.background = `transparent`
    }
  }

  const handleSeek = (e: any) => {
    if (audioRef.current === null) return
    if (progressBarRef.current === null) return

    const seekTime = (e.nativeEvent.offsetX / progressBarRef.current.clientWidth) * duration
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  // useEffect(() => {
  //   getDuration(audioUrl, function (duration: number) {
  //     setDuration(duration)
  //   })
  // }, [])

  // const getDuration = function (url: string, next: any) {
  //   const _player = new Audio(url)
  //   _player.addEventListener(
  //     'durationchange',
  //     function (e) {
  //       if (this.duration != Infinity) {
  //         const duration = this.duration
  //         _player.remove()
  //         next(duration)
  //       }
  //     },
  //     false,
  //   )
  //   _player.load()
  //   _player.currentTime = 24 * 60 * 60 //fake big time
  //   _player.volume = 0
  //   _player.play()
  //   //waiting...
  // }

  const handleMetadata = (e: any) => {
    setDuration(e.target.duration)
  }

  return (
    <StyledRoot hasClose={onCloseClick ? true : false}>
      <StyledButton onClick={togglePlay} className='play-pause-button' type='button'>
        {isPlaying ? <StyledPauseIcon size={25} /> : <StyledPlayIcon size={20} />}
      </StyledButton>

      <StyledProgress
        className='player-controls'
        ref={progressBarRef}
        onClick={handleSeek}
        hasClose={onCloseClick ? true : false}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleMetadata}
        />

        <StyledTimeIndicator>
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </StyledTimeIndicator>
      </StyledProgress>

      {onCloseClick && (
        <StyledButton onClick={onCloseClick} className='play-pause-button' type='button'>
          <StyledCloseIcon size='18' />
        </StyledButton>
      )}
    </StyledRoot>
  )
}

export default AudioPlayer

const StyledRoot = styled.div<{ hasClose: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;

  /* border: 1px solid black; */
  border-radius: 100px;

  padding: 2px;
  padding-left: 10px;

  width: 160px;
  min-width: 160px;
  min-height: 30px;
  max-height: 30px;

  overflow: hidden;

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.body.cardBgColor};

  ${props =>
    props.hasClose &&
    css`
      width: 100%;
      min-width: 200px;
    `}
`
const StyledProgress = styled.div<{ hasClose: boolean }>`
  height: 100%;
  width: 100%;

  border-radius: 0 100px 100px 0;

  cursor: pointer;
  padding: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background: ${({ theme }) => theme.body.backgroundColorPrimary}; */

  ${props =>
    props.hasClose &&
    css`
      border-radius: 0px;
    `}
`

export const StyledTimeIndicator = styled.div`
  pointer-events: none;
  user-select: none;
  opacity: 0.4;

  color: #000;

  font-size: 14px;
`
const StyledButton = styled.button`
  width: 30px;
  height: 100%;
`

const StyledPlayIcon = styled(Play)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledPauseIcon = styled(Pause)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
