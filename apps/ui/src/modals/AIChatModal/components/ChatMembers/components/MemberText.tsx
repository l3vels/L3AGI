import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { textSlicer } from 'utils/textSlicer'

type MemberTextProps = {
  name: string
  role?: string
}

const MemberText = ({ name, role }: MemberTextProps) => {
  const { shortText: shortName } = textSlicer(name, 20)

  let shortRole
  if (role) {
    const { shortText } = textSlicer(role, 30)
    shortRole = shortText
  }

  return (
    <StyledNameWrapper>
      <TypographyPrimary
        value={shortName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />

      <TypographySecondary
        value={shortRole}
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
      />
    </StyledNameWrapper>
  )
}

export default MemberText

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
