import { Link } from 'react-router-dom'
import logo from 'assets/images/l3_logo.png'

import { StyledHeader, StyledLogoWrapper, StyledNavigationColumn } from './LayoutStyle'

import ArrowNavigation from 'pages/Navigation/ArrowNavigation'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import HeaderShare from 'components/HeaderShare/HeaderShare'

interface HeaderTypes {
  expandMode?: boolean
  hideUsers?: boolean
  activeUsers?: any
}

const Header = ({ expandMode = false, hideUsers = false, activeUsers = [] }: HeaderTypes) => {
  return (
    <StyledHeader id='main_header'>
      <StyledNavigationColumn>
        <ArrowNavigation />
        <Breadcrumbs />
      </StyledNavigationColumn>
      {!expandMode && (
        <StyledLogoWrapper to='/'>
          <img src={logo} alt='Logo' />
        </StyledLogoWrapper>
      )}
      {!expandMode && (
        <>
          {!hideUsers && (
            <div style={{ justifySelf: 'end' }}>
              <HeaderShare activeUsers={activeUsers} />
            </div>
          )}
        </>
      )}
    </StyledHeader>
  )
}

export default Header
