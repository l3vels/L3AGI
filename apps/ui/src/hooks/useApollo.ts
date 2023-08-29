import React from 'react'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  RequestHandler,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { RestLink } from 'apollo-link-rest'
import axios, { AxiosRequestConfig } from 'axios'
import { createUploadLink } from 'apollo-upload-client'
import { useCookies } from 'react-cookie'
import { cleanCookie } from 'helpers/authHelper'

const locations = ['/login', '/register', '/forgot-password', '/reset-password', '/cheat-code']

const useApollo = () => {
  const [cookies] = useCookies([''])
  // @ts-expect-error TODO: fix cookie types
  const { accountId, authorization, 'x-refresh-token': refreshToken } = cookies

  let authConfig: any = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accountId,
    },
  }
  if (import.meta.env.REACT_APP_AUTH_BY_HEADER === 'true') {
    authConfig = {
      headers: {
        'x-refresh-token': refreshToken,
        authorization,
        accountId,
      },
    }
  }

  const apollo = React.useMemo(
    () => {
      const logout = async () => {
        const request: AxiosRequestConfig = {
          method: 'POST',
          url: `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}/auth/logout`,
          withCredentials: true,
        }

        if (import.meta.env.REACT_APP_AUTH_BY_HEADER === 'true') {
          request.headers = authConfig.headers
        }

        await axios(request)
        cleanCookie()

        //todo need review when redirect to login page
        if (!locations.includes(window.location.pathname)) {
          window.location.href = '/login'
        }
      }

      const errorLink = onError(context => {
        const { graphQLErrors, networkError } = context

        if (graphQLErrors) {
          graphQLErrors.map(({ extensions }: any) => {
            if (extensions?.exception?.status === 401) {
              logout()
            }

            //eslint-disable-next-line
            if (extensions?.response?.statusCode === 401) {
              logout()
            }

            if (extensions?.code === 'UNAUTHENTICATED') {
              logout()
            }
            return true
          })
        }

        // @ts-expect-error TODO: fix status check
        if (networkError && (networkError.statusCode === 401 || networkError.statusCode === 500)) {
          console.log('network error', networkError)
          // logout()
        }
      })

      const mLink = new MultiAPILink({
        endpoints: {
          game: `${import.meta.env.REACT_APP_SERVICES_URL}`,
          account: `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}`,
          ai: `${import.meta.env.REACT_APP_AI_SERVICES_URL}`,
        },
        createHttpLink: () => createHttpLink({}),
        getContext: endpoint => {
          return authConfig
        },
      })

      const requestHandler: RequestHandler = (operation, forward) => {
        operation.setContext(() => {
          let credentials: string | null = 'include'
          if (
            [
              'registration',
              'resendCode',
              'forgotPassword',
              'resetPassword',
              'resendVerifyEmail',
              'activateAccount',
              'verifyEmail',
            ].includes(operation.operationName)
          ) {
            credentials = null
          }
          return {
            credentials,
          }
        })
        return forward(operation)
      }

      const authRestLink = new ApolloLink(requestHandler)

      const restLink = new RestLink({
        endpoints: {
          game: `${import.meta.env.REACT_APP_SERVICES_URL}`,
          account: `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}`,
          ai: `${import.meta.env.REACT_APP_AI_SERVICES_URL}`,
        },
        ...authConfig,
      })

      const upConfig: createUploadLink.UploadLinkOptions = {
        uri: `${import.meta.env.REACT_APP_SERVICES_URL}/graphql`,
        ...authConfig,
      }

      const uploadLink = createUploadLink(upConfig)

      const apolloLink = ApolloLink.from([
        errorLink,
        authRestLink,
        ApolloLink.from([restLink, mLink, uploadLink]),
      ])

      return new ApolloClient({
        link: apolloLink,
        cache: new InMemoryCache(),

        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'cache-and-network',
          },
          query: {
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
          },
          mutate: {
            errorPolicy: 'all',
          },
        },
      })
    },
    [], // eslint-disable-line
  )

  return apollo
}

export default useApollo
