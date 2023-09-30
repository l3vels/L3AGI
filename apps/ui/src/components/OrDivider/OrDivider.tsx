import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyTertiary from 'components/Typography/Tertiary'

const OrDivider = () => {
  return (
    <StyledOrDivider>
      <StyledLine />
      <TypographyTertiary value={'OR'} type={Typography.types.label} size={Typography.sizes.md} />
      <StyledLine />
    </StyledOrDivider>
  )
}

export default OrDivider

const StyledOrDivider = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`
const StyledLine = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
`
