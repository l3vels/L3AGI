import { BrowserRouter } from 'react-router-dom'
import Route from './Route'

import { ApolloProvider } from '@apollo/client'
import * as Sentry from '@sentry/react'

import './i18n'
import { SnackbarProvider } from 'notistack'

import useDetectMobile from 'hooks/useDetectMobile'
import useApollo from 'hooks/useApollo'

import ToastProvider from 'providers/ToastProvider'
import ModalsProvider from 'providers/ModalsProvider'
import AuthProvider from 'providers/AuthProvider'

import './App.css'

// import '@l3-lib/ui-core/dist/main.css'
import { LayoutProvider } from 'providers/LayoutProvider'
import { AppModeContextProvider } from 'context/AppModeContext'

function App() {
  useDetectMobile()

  const client = useApollo()

  return (
    <Sentry.ErrorBoundary>
      <ApolloProvider client={client}>
        <ModalsProvider>
          <BrowserRouter>
            <SnackbarProvider>
              <ToastProvider>
                <AuthProvider>
                  <AppModeContextProvider>
                    <LayoutProvider>
                      <Route />
                    </LayoutProvider>
                  </AppModeContextProvider>
                </AuthProvider>
              </ToastProvider>
            </SnackbarProvider>
          </BrowserRouter>
        </ModalsProvider>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}

export default App
