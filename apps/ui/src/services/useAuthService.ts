import { useMutation } from '@apollo/client'
// import { loader } from 'graphql.macro'
import * as authHelper from 'helpers/authHelper'

import authByCodeMutation from '../gql/user/authByCode.gql'
import logoutMutation from '../gql/user/logout.gql'
import registrationMutation from '../gql/user/registration.gql'
import authLoginMutation from '../gql/user/authLogin.gql'
import activateAccountGql from '../gql/user/activateAccount.gql'
import forgotPasswordMutation from '../gql//user/forgotPassword.gql'
import resetPasswordMutation from '../gql/user/resetPassword.gql'
import resendVerifyEmailMutation from '../gql/user/resendVerifyEmail.gql'
import loginCompleteMutation from '../gql/user/loginComplete.gql'
import githubLoginCompleteMutation from '../gql/user/githubLoginComplete.gql'
import githubLoginMutation from '../gql/user/githubLogin.gql'
import resendCodeMutation from '../gql/user/resendCode.gql'
import updatePasswordMutation from '../gql/user/updatePassword.gql'

export const useAuthService = () => {
  const [auth] = useMutation(authByCodeMutation)

  const getAuthByCode = async (
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string; exp: any }> => {
    const {
      data: { authByCode },
    } = await auth({ variables: { body: { code } } })
    return authByCode
  }

  return [getAuthByCode]
}

export const useLogoutService = () => {
  const [logoutM] = useMutation(logoutMutation)

  const logout = async (): Promise<{
    accessToken: string
    refreshToken: string
    exp: any
  }> => {
    const {
      data: { logout },
    } = await logoutM({ variables: { body: {} } })
    return logout
  }

  return [logout]
}

export const useRegistrationService = () => {
  const [mutation, { loading }] = useMutation(registrationMutation)
  const registrationComplete = async (data: object) => {
    try {
      const {
        data: { registration },
      } = await mutation({ variables: { body: { ...data } } })


      return registration
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }

  return [registrationComplete]
}



export const useLoginService = () => {
  const [mutation, { loading }] = useMutation(authLoginMutation)
  const authLoginComplete = async (email: string, password: string) => {
    try {
      const {
        data: { login },
      } = await mutation({ variables: { body: { email, password } } })

      // if (import.meta.env.REACT_APP_AUTH_BY_HEADER === 'true') {
       
      // }
      if(login?.access_token){
        authHelper.setTokens(login)
      }
      return login
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }

  return { authLoginComplete, loading }
}

export const useActivateAccountService = () => {
  const [mutation, { loading }] = useMutation(activateAccountGql)
  const activateAccount = async (token: string, callback: Function) => {
    try {
      const {
        data: { activateAccount },
      } = await mutation({ variables: { body: { token } } })
      callback(activateAccount)

      return activateAccount
    } catch (error) {
      callback()
    }
  }

  return { activateAccount, loading }
}

export const useForgotPasswordService = () => {
  const [mutation] = useMutation(forgotPasswordMutation)

  const forgotPassword = async (
    email: string,
    callback: Function,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { forgotPassword },
    } = await mutation({ variables: { body: { email } } })
    callback()
    return forgotPassword
  }

  return [forgotPassword]
}

export const useRestPasswordService = () => {
  const [mutation] = useMutation(resetPasswordMutation)

  const resetPassword = async (
    password: string,
    confirm_password: string,
    token: string,
    callback: Function,
  ) => {
    const {
      data: { resetPassword },
    } = await mutation({
      variables: { body: { password, confirm_password, token } },
    })
    callback()
    return resetPassword
  }

  return [resetPassword]
}

export const useUpdatePasswordService = () => {
  const [mutation] = useMutation(updatePasswordMutation)

  const updatePassword = async (body: any) => {
    const {
      data: { updatePassword },
    } = await mutation({
      variables: { body },
    })
    return updatePassword
  }

  return [updatePassword]
}

export const useResendVerifyEmailService = () => {
  const [mutation, { loading }] = useMutation(resendVerifyEmailMutation)

  const resendVerifyEmail = async (
    email: string,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { resendVerifyEmail },
    } = await mutation({ variables: { body: { email } } })
    return resendVerifyEmail
  }

  return { resendVerifyEmail, loading }
}

export const useLoginCompleteService = () => {
  const [mutation] = useMutation(loginCompleteMutation)

  const loginComplete = async (
    code: string,
    twoFactorId: string,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { loginCompleted },
    } = await mutation({ variables: { body: { code, twoFactorId } } })
    return loginCompleted
  }

  return [loginComplete]
}

export const useResendCodeService = () => {
  const [mutation] = useMutation(resendCodeMutation)

  const resendCode = async (
    twoFactorId: string,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { resendCode },
    } = await mutation({ variables: { body: { twoFactorId } } })
    return resendCode
  }

  return [resendCode]
}


export const useGithubLoginService = () => {
  const [mutation] = useMutation(githubLoginMutation)

  const githubLogin = async (
   
  ): Promise<{ auth_url: string}> => {
    const {
      data: { githubLogin },
    } = await mutation({ variables: { body: {  } } })

    return githubLogin
  }

  return [githubLogin]
}

export const useGithubLoginCompleteService = () => {
  const [mutation] = useMutation(githubLoginCompleteMutation)

  const githubLoginComplete = async (
    code: string
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { githubLoginCompleted },
    } = await mutation({ variables: { body: { code } } })

    if(githubLoginCompleted.access_token){
      authHelper.setTokens(githubLoginCompleted)
    }
    return githubLoginCompleted
  }

  return [githubLoginComplete]
}