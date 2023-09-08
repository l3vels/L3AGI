import { Link } from 'react-router-dom'
import logo from 'assets/images/l3_logo.png'

import { StyledHeader, StyledLogoWrapper, StyledNavigationColumn } from './LayoutStyle'

import ArrowNavigation from 'pages/Navigation/ArrowNavigation'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import HeaderShare from 'components/HeaderShare/HeaderShare'
import HeaderButtons from 'components/HeaderButtons'
import styled from 'styled-components'

interface HeaderTypes {
  expandMode?: boolean
  isPublicRoute?: boolean
}

const Header = ({ expandMode = false, isPublicRoute }: HeaderTypes) => {
  return (
    <StyledHeader id='main_header'>
      <StyledNavigationColumn>
        {!isPublicRoute && (
          <>
            <ArrowNavigation />
            <Breadcrumbs />
          </>
        )}
      </StyledNavigationColumn>
      {!expandMode && (
        <StyledLogoWrapper to='/'>
          <img src={logo} alt='Logo' />
        </StyledLogoWrapper>
      )}
      {!expandMode && (
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
