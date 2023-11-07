import { useEffect, useRef, useState } from 'react'

import Button from '@l3-lib/ui-core/dist/Button'
import Play from '@l3-lib/ui-core/dist/icons/PlayOutline'
import Pause from '@l3-lib/ui-core/dist/icons/Pause'
import styled from 'styled-components'
import { t } from 'i18next'

const PlayAudioButton = ({ audioUrl }: { audioUrl: string }) => {
  const audioRef = useRef(null as any)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onplaying = () => {
        setIsPlaying(true)
      }
      audioRef.current.onpause = () => {
        setIsPlaying(false)
      }
    }
  }, [])

  return (
    <StyledRoot>
      <>
        {isPlaying ? (
          <Button onClick={pauseAudio} size={Button.sizes.XS} kind={Button.kinds.PRIMARY}>
            <StyledButtonTextWrapper>
              <span>{`${t('pause-voice')}`}</span> <Pause size={20} />
            </StyledButtonTextWrapper>
          </Button>
        ) : (
          <Button onClick={playAudio} size={Button.sizes.XS} kind={Button.kinds.PRIMARY}>
            <StyledButtonTextWrapper>
              <span>{`${t('play-voice')}`}</span> <Play size={15} />
            </StyledButtonTextWrapper>
          </Button>
        )}
      </>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <StyledAudio ref={audioRef} controls={false}>
        <source src={audioUrl} type='audio/mpeg' />
        Your browser does not support the audio element.
      </StyledAudio>
    </StyledRoot>
  )
}

export default PlayAudioButton

const StyledRoot = styled.div`
  min-height: 24px;
  max-height: 24px;
  overflow: hidden;
`

const StyledButtonTextWrapper = styled.div`
  min-width: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledAudio = styled.audio`
  display: none;
`
