import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

const OrDivider = () => {
  return (
    <StyledOrDivider>
      <StyledLine />
      <Typography
        value={'OR'}
        type={Typography.types.label}
        size={Typography.sizes.md}
        customColor={'rgba(255,255,255, 0.6)'}
      />
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
