import { useTranslation } from 'react-i18next'

import { StyledHeader, StyledLogoWrapper, StyledNavigationColumn } from './LayoutStyle'

import ArrowNavigation from 'pages/Navigation/ArrowNavigation'

import HeaderButtons from 'components/HeaderButtons'
import Tags from 'share-ui/components/Tags/Tags'

import styled from 'styled-components'
import { useDomainConfig } from 'utils/useDomainConfig'
import { useGetAccountModule } from 'utils/useGetAccountModule'

interface HeaderTypes {
  expandMode?: boolean
  isPublicRoute?: boolean
  hideButtons?: boolean
}

const Header = ({ expandMode = false, isPublicRoute, hideButtons }: HeaderTypes) => {
  const { t } = useTranslation()
  const { getDomainConfig } = useDomainConfig()
  const { getExternalLinksModule } = useGetAccountModule()
  const domainLogo = getDomainConfig('logo')
  const showLinks = getExternalLinksModule()

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
        <StyledLogo src={domainLogo} alt='Logo' />
        {/* <Tags
          label={t('beta')}
          readOnly
          color={'gradient_yellow'}
          size={Tags.sizes?.XS}
          noAnimation
        /> */}
      </StyledLogoWrapper>

      {showLinks && !hideButtons && (
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
