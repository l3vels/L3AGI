import { useQuery } from '@apollo/client'
import MESSAGE_BY_GAME from '../../gql/chat/messageByGame.gql'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/fp/isNil'

type UseMessageByGameService = {
  isPrivateChat: boolean
}

export const useMessageByGameService = ({ isPrivateChat }: UseMessageByGameService) => {
  const { data, error, loading, refetch } = useQuery(MESSAGE_BY_GAME, {
    // Omit undefined variables to exclude in query params
    variables: omitBy(
      {
        is_private_chat: isPrivateChat,
      },
      isNil,
    ),
  })

  return {
    data: data?.messageByGame || [],
    error,
    loading,
    refetch,
  }
}
