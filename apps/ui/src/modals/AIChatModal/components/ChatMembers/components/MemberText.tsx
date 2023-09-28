import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type MemberTextProps = {
  name: string
  role?: string
}

const MemberText = ({ name, role }: MemberTextProps) => {
  return (
    <StyledNameWrapper>
      <StyledTypographyNameWrapper>
        <Typography value={name} type={Typography.types.LABEL} size={Typography.sizes.sm} />
      </StyledTypographyNameWrapper>
      <StyledTypographyRole>
        <Typography value={role} type={Typography.types.LABEL} size={Typography.sizes.xss} />
      </StyledTypographyRole>
    </StyledNameWrapper>
  )
}

export default MemberText

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const StyledTypographyNameWrapper = styled.div`
  color: ${({ theme }) => theme.body.textColorPrimary};
`
const StyledTypographyRole = styled.div`
  color: ${({ theme }) => theme.body.mainNavColor};
`
