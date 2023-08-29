import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { StyledPublicRouteWrapper, StyledPublicRouteWrapperLayer } from './ProviderStyle'

const PublicRoute = () => {
  // const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()
  // if (user) return <Navigate to='/' />

  return (
    <StyledPublicRouteWrapper>
      <StyledPublicRouteWrapperLayer>{outlet}</StyledPublicRouteWrapperLayer>
    </StyledPublicRouteWrapper>
  )
}

export default PublicRoute
