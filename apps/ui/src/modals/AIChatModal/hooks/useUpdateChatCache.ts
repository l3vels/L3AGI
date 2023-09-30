import { useApolloClient } from '@apollo/client'
import { useContext } from 'react'
import isNil from 'lodash/fp/isNil'
import omitBy from 'lodash/omitBy'
import CHAT_MESSAGES_GQL from '../../../gql/chat/userChatMessages.gql'
import CONFIGS_GQL from '../../../gql/ai/config/configs.gql'
import { AuthContext } from 'contexts'
import { Nullable } from 'types'

const useUpdateChatCache = () => {
  const apolloClient = useApolloClient()
  const { user } = useContext(AuthContext)

  const upsertChatMessageInCache = (
    newChatMessage: Record<string, unknown>,
    is_private_chat: boolean,
    {
      localChatMessageRefId,
      agentId,
      teamId,
    }: {
      localChatMessageRefId?: Nullable<string>
      agentId?: Nullable<string>
      teamId?: Nullable<string>
    } = {},
  ) => {
    const queryVariables = omitBy(
      {
        is_private_chat: is_private_chat,
        agent_id: agentId,
        team_id: teamId,
      },
      isNil,
    )

    apolloClient.cache.updateQuery(
      { query: CHAT_MESSAGES_GQL, variables: queryVariables },
      data => {
        const chatMessages = data?.chatMessages || []
        const newChatMessages = [...chatMessages]
        newChatMessage = {
          __typename: 'ChatMessage',
          parent: null,
          agent: null,
          team: null,
          ...newChatMessage,
        }

        if (localChatMessageRefId && user.id === newChatMessage.user_id) {
          // If the message is from the current user, we need to update the local message

          const index = newChatMessages.findIndex(
            (chatMessage: any) => chatMessage.id === localChatMessageRefId,
          )

          if (index !== -1) {
            newChatMessages[index] = newChatMessage
          }
        } else {
          // Otherwise upsert message

          const chatMessageIndex = newChatMessages.findIndex(
            (chatMessage: any) => chatMessage.id === newChatMessage.id,
          )

          if (chatMessageIndex !== -1) {
            newChatMessages[chatMessageIndex] = newChatMessage
          } else {
            newChatMessages.push(newChatMessage)
          }
        }

        newChatMessages.sort((a, b) => {
          return new Date(a.created_on).getTime() - new Date(b.created_on).getTime()
        })

        return {
          chatMessages: newChatMessages,
        }
      },
    )
  }

  const upsertChatStatusConfig = (
    config: Record<string, unknown>,
    {
      is_private_chat,
      agentId,
      teamId,
    }: {
      is_private_chat?: boolean
      agentId?: Nullable<string>
      teamId?: Nullable<string>
    } = {},
  ) => {
    apolloClient.cache.updateQuery({ query: CONFIGS_GQL }, data => {
      const configs = data?.configs || []
      const newConfigs = [...configs]

      const newConfig = {
        __typename: 'Config',
        ...config,
      }

      const configIndex = newConfigs.findIndex((config: any) => config.id === newConfig.id)

      if (configIndex !== -1) {
        newConfigs[configIndex] = newConfig
      } else {
        newConfigs.push(newConfig)
      }

      return {
        configs: newConfigs,
      }
    })
  }

  return {
    upsertChatMessageInCache,
    upsertChatStatusConfig,
  }
}

export default useUpdateChatCache
