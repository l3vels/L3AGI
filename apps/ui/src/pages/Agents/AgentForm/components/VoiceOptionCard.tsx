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
      <StyledInnerWrapper>
        <TypographyPrimary value={title} size={'medium'} />

        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
      </StyledInnerWrapper>

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
    </StyledVoiceCard>
  )
}

export default VoiceOptionCard

const StyledVoiceCard = styled.div`
  min-width: 280px;
  width: 280;
  min-height: 50px;
  height: 50px;

  border-radius: 8px;

  background: ${({ theme }) => theme.body.cardBgColor};

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 20px;
`
const StyledInnerWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 15px;
`
