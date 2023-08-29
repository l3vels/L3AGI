import { ApolloLink, NextLink, Operation, RequestHandler } from '@apollo/client/core'
import {
  getMainDefinition,
  hasDirectives,
  removeDirectivesFromDocument,
} from '@apollo/client/utilities'

import { DefaultEndpoints, MultiAPILinkConfig } from './interface'
import { prefixTypenames, getDirectiveArgumentValueFromOperation, isFunction } from './utils'

export class MultiAPILink<
  Endpoints extends DefaultEndpoints = DefaultEndpoints,
> extends ApolloLink {
  httpLink: ApolloLink
  wsLinks: Record<string, ApolloLink>

  config: MultiAPILinkConfig<Endpoints>

  constructor(config: MultiAPILinkConfig<Endpoints>, request?: RequestHandler) {
    super(request)
    this.config = config
    this.httpLink = config.createHttpLink()
    this.wsLinks = {}
  }

  public request(operation: Operation, forward?: NextLink) {
    if (
      (!hasDirectives(['api'], operation.query) && !this.config.defaultEndpoint) ||
      hasDirectives(['rest'], operation.query)
    ) {
      return forward?.(operation) ?? null
    }

    let apiName: string = getDirectiveArgumentValueFromOperation(operation, 'api', 'name')

    if (!apiName) {
      const contextKey = getDirectiveArgumentValueFromOperation(operation, 'api', 'contextKey')

      if (contextKey) {
        apiName = operation.getContext()[contextKey]
      } else if (this.config.defaultEndpoint) {
        apiName = this.config.defaultEndpoint
      }
    }

    const query = removeDirectivesFromDocument([{ name: 'api', remove: true }], operation.query)

    if (!query) {
      throw new Error('Error while removing directive api')
    }

    operation.query = query

    if (this.config.getContext) {
      operation.setContext(this.config.getContext(apiName, operation.getContext))
    }

    if (this.config.endpoints[apiName]) {
      operation.setContext({
        uri: `${this.config.endpoints[apiName]}${this.config.httpSuffix ?? '/graphql'}`,
      })
    } else if (import.meta.env.NODE_ENV === 'development') {
      throw new Error(`${apiName} is not defined in endpoints definitions`)
    }

    const definition = getMainDefinition(operation.query)
    if (definition.kind === 'OperationDefinition' && definition.operation === 'subscription') {
      if (!this.config.createWsLink) {
        throw new Error(
          `You tried to call a subscription without configuring "createWsLink" function:${operation.query}`,
        )
      }
      if (!this.wsLinks[apiName]) {
        const endpoint = this.config.endpoints[apiName]
        const wsEndpoint = endpoint.startsWith('/')
          ? `${window.location.origin}${endpoint}`.replace('http', 'ws')
          : endpoint.replace('http', 'ws')
        this.wsLinks[apiName] = this.config.createWsLink(
          `${wsEndpoint}${this.config.wsSuffix ?? '/graphql/subscriptions'}`,
        )
      }

      const response = this.wsLinks[apiName].request(operation, forward)
      if (this.config.prefixTypenames && isFunction(response?.map)) {
        return response!.map(e => prefixTypenames(e, apiName))
      }
      return response
    }

    const response = this.httpLink.request(operation, forward)
    if (this.config.prefixTypenames && isFunction(response?.map)) {
      return response!.map(e => prefixTypenames(e, apiName))
    }
    return response
  }
}
