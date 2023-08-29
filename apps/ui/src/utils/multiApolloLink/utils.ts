import { Operation } from '@apollo/client/core'
import { OperationDefinitionNode, StringValueNode } from 'graphql'

export const getDirectiveArgumentValueFromOperation = (
  operation: Operation,
  directiveName: string,
  argumentName: string,
) =>
  (
    (
      operation.query.definitions.find(
        definition => definition.kind === 'OperationDefinition',
      ) as OperationDefinitionNode
    )?.directives
      ?.find(directive => directive.name?.value === directiveName)
      ?.arguments?.find(argument => argument.name?.value === argumentName)?.value as StringValueNode
  )?.value

export const prefixTypenames = (data: any, apiName: string): any => {
  if (data == null || typeof data !== 'object') {
    return data
  }
  if (Array.isArray(data)) {
    return data.map(item => prefixTypenames(item, apiName))
  }

  const newData = Object.entries(data).reduce(
    (ctx, [itemKey, item]) => ({
      ...ctx,
      [itemKey]: prefixTypenames(item, apiName),
    }),
    {},
  )

  if (data.__typename) {
    return {
      ...newData,
      __typename: `${apiName}:${data.__typename}`,
    }
  }

  return newData
}

export const isFunction = (fn: any) => fn && {}.toString.call(fn) === '[object Function]'

export const createSelectOptions = (option: string) => {
  return
}
