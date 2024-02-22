import styled from 'styled-components'

import { ButtonSecondary } from 'components/Button/Button'

import TypographyPrimary from 'components/Typography/Primary'

import AudioPlayer from 'components/AudioPlayer'
import { t } from 'i18next'

type VoiceOptionCardProps = {
  title: string
  audioUrl: string
  onAddClick?: () => void
  onRemoveClick?: () => void
}

const VoiceOptionCard = ({ title, audioUrl, onAddClick, onRemoveClick }: VoiceOptionCardProps) => {
  return (
    <StyledVoiceCard>
      <StyledCardHeader>
        <TypographyPrimary value={title} size={'medium'} />
      </StyledCardHeader>

      <StyledCardHeader>
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

        {onAddClick && (
          <ButtonSecondary size={'small'} onClick={onAddClick}>
            {t('add')}
          </ButtonSecondary>
        )}

        {onRemoveClick && (
          <ButtonSecondary size={'small'} onClick={onRemoveClick}>
            {t('remove')}
          </ButtonSecondary>
        )}
      </StyledCardHeader>
    </StyledVoiceCard>
  )
}

export default VoiceOptionCard

const StyledVoiceCard = styled.div`
  min-width: 280px;
  width: 280;
  min-height: 100px;
  height: 100px;

  border-radius: 8px;

  background: white;

  display: flex;
  flex-direction: column;

  gap: 20px;

  padding: 20px;

  cursor: pointer;

  :hover {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
  }
`
const StyledCardHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`
