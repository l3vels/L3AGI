// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'universal-cookie'

const cookies: any = new Cookies()

export const setAccountId = (accountId: string) => {
  localStorage.setItem('account_id', accountId)
  cookies.set('account_id', accountId, {
    path: '/',
  })
  cookies.addChangeListener(history.go(0))
}

export const setTokens = (data: any) => {
  cookies.set('authorization', data.access_token)
  // cookies.set('x-refresh-token', data.refresh_token)
}

export const cleanCookie = () => {
  cookies.remove('authorization')
  // cookies.remove('x-refresh-token')
  cookies.remove('account_id')
}

export const removeAccountId = () => {
  cookies.remove('account_id')
  cookies.addChangeListener(history.go(0))
}

export const logout = () => {
  removeAccountId()
  cleanCookie()
}
