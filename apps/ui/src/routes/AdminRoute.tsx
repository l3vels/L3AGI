import React, { useState } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import Header from 'components/Header'

import { AuthContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'

import { StyledAppContainer, StyledMainSection, StyledAdminLayoutEdit } from './ProviderStyle'

const AdminRoute = () => {
  const [setShowMenu] = useState(false)
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledAppContainer>
        <Header setShowMenu={setShowMenu} />
        <StyledAdminLayoutEdit showMenu={false}>
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledAdminLayoutEdit>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default AdminRoute
