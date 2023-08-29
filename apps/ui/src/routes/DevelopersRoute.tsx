import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

import Navbar from 'components/Navbar'
import { DEVELOPERS_ITEM_LIST } from 'helpers/navigationHelper'

import developerBackgroundImage from 'assets/backgrounds/overview.jpeg'

const DevelopersRoute = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)
  const outlet = useOutlet()
  const params = useParams()
  const gameId = params.gameId

  const [theme] = useState(defaultTheme)

  const navigate = useNavigate()
  if (!user) return <Navigate to='/login' />

  //   const onCheckedChange = (isDefaultTheme: boolean) => {
  //     setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  //   }

  const onClickGoBack = () => {
    navigate('../')
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledAppContainer backgroundImage={developerBackgroundImage}>
        {/* <Header setShowMenu={setShowMenu} onCheckedChange={onCheckedChange}/> */}
        <StyledMainLayout showMenu={showMenu}>
          <Navbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navbarTitle={name}
            logo={''}
            navbarItems={DEVELOPERS_ITEM_LIST}
            onClickGoBack={onClickGoBack}
            backText={'Developers'}
          />
          {/* <GameRouteNavbar showMenu={showMenu} gameName={name} /> */}
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default DevelopersRoute

// import React, { useContext, useState } from 'react'
// import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'
// import { AuthContext, ToastContext } from 'contexts'
// import { ThemeProvider } from 'styled-components'
// import { defaultTheme } from 'styles/theme'

// import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'
// import { useGameByIdService, useUpdateGameByIdService } from 'services/useGameService'

// import Navbar from 'components/Navbar'
// import { developersItemList } from 'helper/navigationHelper'

// const DevelopersRoute = () => {
//   const outlet = useOutlet()
//   const params = useParams()
//   const { user } = useContext(AuthContext)
//   const { setToast } = useContext(ToastContext)

//   const [showMenu, setShowMenu] = useState(false)
//   const [theme] = useState(defaultTheme)

//   const gameId = params.gameId

//   const { data: developer, refetch } = useGameByIdService({ id: gameId })

//   const { game_id, name, logo_image } = developer

//   const navigate = useNavigate()

//   const [updateDeveloperById] = useUpdateGameByIdService()

//   const updateHeader = async (name: string) => {
//     const updatedValues = {
//       name: name,
//     }
//     await updateDeveloperById(gameId, { ...updatedValues })

//     setToast({
//       message: `Developer Title updated!`,
//       type: 'positive',
//       open: true,
//     })
//   }

//   const updateLogo = async (logo: string) => {
//     const updatedValues = {
//       logo_image: logo,
//     }
//     await updateDeveloperById(gameId, { ...updatedValues })

//     setToast({
//       message: `developer Logo updated!`,
//       type: 'positive',
//       open: true,
//     })
//     refetch()
//   }

//   const onClickGoBack = () => {
//     navigate(`/developer/${game_id || gameId}/api-keys`)
//   }

//   if (!user) return <Navigate to='/login' />
//   return (
//     <ThemeProvider theme={theme}>
//       <StyledAppContainer>
//         <StyledMainLayout showMenu={showMenu}>
//           <Navbar
//             showMenu={showMenu}
//             setShowMenu={setShowMenu}
//             navbarItems={developersItemList}
//             navbarTitle={name}
//             updateHeader={updateHeader}
//             logo={logo_image}
//             updateLogo={updateLogo}
//             onClickGoBack={onClickGoBack}
//             backText={'Developer'}
//           />
//           <StyledMainSection>{outlet}</StyledMainSection>
//         </StyledMainLayout>
//       </StyledAppContainer>
//     </ThemeProvider>
//   )
// }

// export default DevelopersRoute
