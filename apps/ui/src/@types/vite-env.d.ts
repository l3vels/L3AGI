interface ImportMetaEnv {
  readonly PORT: number
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean

  readonly REACT_APP_ENV: string
  readonly REACT_APP_SERVICES_URL: string
  readonly REACT_APP_DOMAIN_NAME: string
  readonly REACT_APP_ACCOUNT_SERVICES_URL: string
  readonly REACT_APP_PR_SERVICES_URL: string
  readonly REACT_APP_PR_SERVICES_WS_URL: string
  readonly REACT_APP_SENTRY_DNS: string
  readonly REACT_APP_SENTRY_WEBPACK_AUTH_TOKEN: string
  readonly REACT_APP_DISCORD_LINK: string
  readonly REACT_APP_GITHUB_LINK: string
  readonly REACT_APP_TWITTER_LINK: string
  readonly REACT_APP_YOUTUBE_LINK: string
  readonly REACT_APP_YOUTUBE_VIDEO_ID: string
  readonly REACT_APP_YOUTUBE_VIDEO_DATA_SOURCE_ID: string
  readonly REACT_APP_TERMS_LINK: string
  readonly REACT_APP_PRIVACY: string
  readonly REACT_APP_BASICS_LINK: string
  readonly REACT_APP_API_KEYS_LINK: string
  readonly REACT_APP_AGENTS_LINK: string
  readonly REACT_APP_DATASOURCES_LINK: string
  readonly REACT_APP_TOOLS_LINK: string
  readonly REACT_APP_PLAN_AND_EXECUTE_LINK: string
  readonly REACT_APP_AUTHORITARIAN_SPEAKER_LINK: string
  readonly REACT_APP_DEBATES_LINK: string
  readonly REACT_APP_DECENTRALIZED_SPEAKER_LINK: string
  readonly REACT_APP_TEAM_LINK: string
  readonly REACT_APP_INDEX_TYPES_LINK: string
  readonly REACT_APP_RESPONSE_MODES_LINK: string
  readonly REACT_APP_VECTOR_STORES_LINK: string
  readonly REACT_APP_TWILIO_PHONE_NUMBER_SID_LINK: string
  readonly REACT_APP_STATIC_URL: string
  readonly REACT_APP_DATA_TEST_MODE: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
