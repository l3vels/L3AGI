import logo from 'assets/images/l3_logo.png'
import { useTranslation } from 'react-i18next'

import { StyledHeader, StyledLogoWrapper, StyledNavigationColumn } from './LayoutStyle'

import ArrowNavigation from 'pages/Navigation/ArrowNavigation'

import HeaderButtons from 'components/HeaderButtons'
import Tags from '@l3-lib/ui-core/dist/Tags'

import styled from 'styled-components'

interface HeaderTypes {
  expandMode?: boolean
  isPublicRoute?: boolean
  hideButtons?: boolean
}

const Header = ({ expandMode = false, isPublicRoute, hideButtons }: HeaderTypes) => {
  const { t } = useTranslation()
  return (
    <StyledHeader id='main_header'>
      <StyledNavigationColumn>
        {!isPublicRoute && (
          <>
            <ArrowNavigation />
            {/* <Breadcrumbs /> */}
          </>
        )}
      </StyledNavigationColumn>

      <StyledLogoWrapper to='/'>
        <StyledLogo src={logo} alt='Logo' />
        <StyledTags
          label={t('beta')}
          readOnly
          color={'gradient_yellow'}
          size={'small'}
          noAnimation
        />
      </StyledLogoWrapper>

      {!hideButtons && (
        <>
          <StyledHeaderButtonWrapper>
            <HeaderButtons />
          </StyledHeaderButtonWrapper>
        </>
      )}
    </StyledHeader>
  )
}

export default Header

const StyledHeaderButtonWrapper = styled.div`
  margin-left: auto;
`
const StyledLogo = styled.img`
  width: 48px;
  height: 48px;
`

const StyledTags = styled(Tags)`
  div {
    font-size: x-small !important;
    padding: 0px 2px !important;
  }
`
