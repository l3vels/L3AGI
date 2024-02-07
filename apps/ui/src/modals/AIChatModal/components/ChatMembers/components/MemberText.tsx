import styled from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { textSlicer } from 'utils/textSlicer'

type MemberTextProps = {
  name: string
  role?: string
}

const MemberText = ({ name, role }: MemberTextProps) => {
  const { shortText: shortName } = textSlicer(name, 15)

  let shortRole
  if (role) {
    const { shortText } = textSlicer(role, 25)
    shortRole = shortText
  }

  return (
    <StyledNameWrapper>
      <TypographyPrimary
        value={shortName}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
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
  font-weight: 500;
  opacity: 0.8;
`
