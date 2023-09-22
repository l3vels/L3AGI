import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type MemberTextProps = {
  name: string
  role?: string
}

const MemberText = ({ name, role }: MemberTextProps) => {
  return (
    <StyledNameWrapper>
      <Typography
        value={name}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value={role}
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
        customColor={'rgba(255,255,255,0.6)'}
      />
    </StyledNameWrapper>
  )
}

export default MemberText

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
