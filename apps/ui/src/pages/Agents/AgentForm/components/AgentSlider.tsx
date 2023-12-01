import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import Slider from 'share-ui/components/Slider/Slider'

const AgentSlider = ({ onChange, value }: { value: number; onChange: (value: number) => void }) => {
  const { t } = useTranslation()
  return (
    <StyledSliderWrapper>
      <StyledSliderHeader>
        <TypographyPrimary
          value={t('temperature')}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
        />
        {value ? value : 0}/{1}
      </StyledSliderHeader>
      <StyledSlide
        className='slider'
        color={Slider.colors?.POSITIVE}
        defaultValue={value * 10 || 2}
        value={value * 10}
        min={0}
        max={10}
        onChange={onChange}
      />
    </StyledSliderWrapper>
  )
}

export default AgentSlider

const StyledSliderWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  .l3-slider__base--positive .l3-slider__track {
    background: ${({ theme }) => theme.body.sliderBackgroundColor} !important;
  }
`
const StyledSliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.body.textColorPrimary};
`
const StyledSlide = styled(Slider)`
  max-width: 100%;
`
