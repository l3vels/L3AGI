import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import NavigationChevronUp from 'share-ui/components/Icon/Icons/components/NavigationChevronUp'
import NavigationChevronDown from 'share-ui/components/Icon/Icons/components/NavigationChevronDown'

import Typography from 'share-ui/components/typography/Typography'
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
