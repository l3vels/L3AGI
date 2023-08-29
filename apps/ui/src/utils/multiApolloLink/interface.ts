import { ApolloLink } from '@apollo/client/core'

export type DefaultEndpoints = Record<string, string>

export interface MultiAPILinkConfig<Endpoints extends DefaultEndpoints> {
  /**
   * Dictionary of your endpoints.
   * Keys will be used as name identifier in the `@api` directive
   */
  endpoints: DefaultEndpoints
  /**
   * Optional default endpoint to fallback to if no `@api` directive is explicitly provided
   */
  defaultEndpoint?: Extract<keyof Endpoints, string>
  /**
   * Init http apollo link
   */
  createHttpLink: () => ApolloLink
  /**
   * Init websocket apollo link
   * @param endpoint
   */
  createWsLink?: (endpoint: string) => ApolloLink
  /**
   * Suffix to add to your endpoint for websocket subscriptions
   */
  wsSuffix?: string
  /**
   * Suffix to add to your endpoint for http calls
   */
  httpSuffix?: string
  /**
   *
   * @param endpoint
   * @param getCurrentContext
   * Callback function to set context like headers according to your endpoint.
   */
  getContext?: (
    endpoint: string,
    getCurrentContext: () => Record<string, any>,
  ) => Record<string, any>
  /**
   * Add apiName passed in `api` directive to every `__typename` contained in network data response
   * eg: with `@api(name: 'v1')` directive in your query, an initial typename `Game` would become `v1:Game`
   */
  prefixTypenames?: boolean
}
