import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import NavigationChevronDown from '@l3-lib/ui-core/dist/icons/NavigationChevronDown'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

const ShowAdvancedButton = ({ onClick, isShow }: { onClick: () => void; isShow: boolean }) => {
  const { t } = useTranslation()
  return (
    <StyledAdvancedButton onClick={onClick}>
      <TypographyPrimary
        value={t('advanced-options')}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
      />
      {isShow ? <StyledNavigationChevronUp /> : <StyledNavigationChevronDown />}
    </StyledAdvancedButton>
  )
}
export default ShowAdvancedButton

const StyledAdvancedButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  gap: 5px;
`

export const StyledNavigationChevronUp = styled(NavigationChevronUp)`
  path {
    color: ${({ theme }) => theme.body.iconColor};
  }
`
export const StyledNavigationChevronDown = styled(NavigationChevronDown)`
  path {
    color: ${({ theme }) => theme.body.iconColor};
  }
`
