import { useContext, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { LayoutContext } from 'contexts'
import { includes } from 'lodash'

import GameNavigation from 'pages/Navigation/GameNavigation'

import { Footer, Header } from 'components/Layout'

import {
  StyledAppContainer,
  StyledGroupContainer,
  StyledMainContainer,
} from '../components/Layout/LayoutStyle'

const GameRouteLayout = () => {
  const { expand } = useContext(LayoutContext)

  const outlet = useOutlet()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []
    setActive(pathArr)
  }, [pathname])

  const isCollection = includes(active, 'collection')
  const isPlayers = includes(active, 'players')
  const isTransactions = includes(active, 'transactions')
  const hideNavbar = includes(active, 'collection')

  const isExpandMode =
    (expand && isCollection) || (expand && isPlayers) || (expand && isTransactions)

  return (
    <StyledAppContainer>
      <Header expandMode={isExpandMode} />
      <StyledMainContainer expand={isExpandMode}>
        <StyledGroupContainer
          mt='20'
          id={hideNavbar ? '' : 'inner_navigation'}
          hideNavbar={hideNavbar}
        >
          <GameNavigation />
        </StyledGroupContainer>
        {outlet}
      </StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default GameRouteLayout
