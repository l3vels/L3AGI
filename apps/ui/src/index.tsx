import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App'
import reportWebVitals from './reportWebVitals'

const isLocalhost = (url: string) => url.includes('localhost')

Sentry.init({
  dsn: import.meta.env.REACT_APP_SENTRY_DNS,
  integrations: [
    new Sentry.BrowserTracing({
      // tracePropagationTargets: ['localhost', /https?:\/\/[^/]*l3vels\.xyz\//],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: import.meta.env.REACT_APP_ENV,
  enabled: !isLocalhost(window.location.href),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
