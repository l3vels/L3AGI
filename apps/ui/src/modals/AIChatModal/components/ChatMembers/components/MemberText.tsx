import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

type MemberTextProps = {
  name: string
  role?: string
}

const MemberText = ({ name, role }: MemberTextProps) => {
  return (
    <StyledNameWrapper>
      <TypographyPrimary value={name} type={Typography.types.LABEL} size={Typography.sizes.sm} />

      <TypographySecondary value={role} type={Typography.types.LABEL} size={Typography.sizes.xss} />
    </StyledNameWrapper>
  )
}

export default MemberText

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
