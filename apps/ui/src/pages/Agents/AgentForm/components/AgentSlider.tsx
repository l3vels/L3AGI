import styled from 'styled-components'

import Slider from '@l3-lib/ui-core/dist/Slider'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

const AgentSlider = ({ formik }: { formik: any }) => {
  return (
    <StyledSliderWrapper>
      <StyledSliderHeader>
        <TypographyPrimary
          value='Temperature'
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
        />
        {formik?.values.agent_temperature ? formik?.values.agent_temperature : 0}/{1}
      </StyledSliderHeader>
      <StyledSlide
        className='slider'
        color={Slider.colors.POSITIVE}
        defaultValue={2}
        min={0}
        max={10}
        onChange={(value: number) => formik?.setFieldValue('agent_temperature', value / 10)}
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
`
const StyledSliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
`
const StyledSlide = styled(Slider)`
  max-width: 100%;
`
