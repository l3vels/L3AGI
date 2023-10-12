import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import HeadingPrimary from 'components/Heading/Primary'

const HeaderText = () => {
  return (
    <StyledHeadingWrapper>
      <HeadingPrimary type={Heading.types.h1} value='BUILD TEAMS OF AI AGENTS' />
      <TypographySecondary
        value='Open-source tool that enables AI agents to collaborate as effectively as human teams'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    </StyledHeadingWrapper>
  )
}

export default HeaderText

const StyledHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 10px;
`
