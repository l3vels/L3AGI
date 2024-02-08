import { Link, useLocation, useOutlet } from 'react-router-dom'
import includes from 'lodash/includes'

import {
  StyledAppContainer,
  StyledGroupContainer,
  StyledMainContainer,
} from '../components/Layout/LayoutStyle'

import { AuthContext, LayoutContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'

import DevelopersNavigation from 'pages/Navigation/DevelopersNavigation'

import { Footer } from 'components/Layout'

const DevelopersRouteLayout = () => {
  const { user } = useContext(AuthContext)
  const { expand } = useContext(LayoutContext)

  const { first_name } = user
  const outlet = useOutlet()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []
    setActive(pathArr)
  }, [pathname])

  const isCollection = includes(active, 'collection')

  const hideNavbar = includes(active, 'collection')

  const isExpandMode = expand && isCollection

  return (
    <StyledAppContainer>
      {/* <StyledMainLayout> */}

      <StyledMainContainer expand={isExpandMode} id='main_container_test'>
        {!hideNavbar && (
          <StyledGroupContainer mt='24'>
            <div id='inner_navigation'>
              <DevelopersNavigation />
            </div>
          </StyledGroupContainer>
        )}
        {outlet}
      </StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default DevelopersRouteLayout
