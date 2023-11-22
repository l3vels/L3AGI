import styled from 'styled-components'

import Heading from 'share-ui/components/Heading/Heading'
import Typography from 'share-ui/components/typography/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import HeadingPrimary from 'components/Heading/Primary'
import { t } from 'i18next'

const HeaderText = () => {
  return (
    <StyledHeadingWrapper>
      <StyledHeadingPrimary type={Heading.types?.h1} value={t('welcome-message')} />
      <TypographySecondary
        value={t('welcome-message-description')}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
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
const StyledHeadingPrimary = styled(HeadingPrimary)`
  font-size: 40px;
`
