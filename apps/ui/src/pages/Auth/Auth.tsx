import React from 'react'
import Loading from 'atoms/Loader'
import useAuth from './useAuth'
import WelcomeLoader from 'components/Loader/WelcomeLoader'

const Auth = () => {
  const { loading } = useAuth()
  return <>{loading && <WelcomeLoader />}</>
}

export default Auth
