import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import TypographyTertiary from 'components/Typography/Tertiary'

const OrDivider = () => {
  const { t } = useTranslation()
  return (
    <StyledOrDivider>
      <StyledLine />
      <TypographyTertiary
        value={t('or')}
        type={Typography.types.label}
        size={Typography.sizes.md}
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
