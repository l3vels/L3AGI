import React from 'react'

// import { IUser } from 'interfaces'
import { useAccountService, useUserService } from 'services'
import { AuthContext } from 'contexts'
import Loader from 'atoms/Loader'
import WelcomeLoader from 'components/Loader/WelcomeLoader'
// import { useLocation } from 'react-router-dom'

// type AuthProviderProps = {
//   children: (user: any) => React.ReactElement
// }

const AuthProvider = ({ children }: any) => {
  const { data: user, loading } = useUserService({})
  // const {i18n} = useTranslation()
  const { data: account } = useAccountService()

  const isAuthenticated = Boolean(user?.id)

  const contextValue = {
    user,
    loading,
    isAuthenticated,
    account,
  }

  if (loading) {
    return <WelcomeLoader />
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
