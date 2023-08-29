import { useApolloClient } from '@apollo/client'
import AI_MEDIA_GQL from '../../gql/chat/aiMedia.gql'
import { IAiMediaPrompt } from 'services/types/chat'

interface Data {
  aiMedia: IAiMediaPrompt
}

interface Variables {
  id: string
}

export const useAiMediaService = () => {
  const client = useApolloClient()

  const fetchAiMedia = (variables: Variables) =>
    new Promise<Data['aiMedia']>((resolve, reject) => {
      const interval = setInterval(() => {
        client
          .query<Data>({
            query: AI_MEDIA_GQL,
            variables,
            fetchPolicy: 'no-cache',
          })
          .then(({ data }) => {
            if (!data) return

            if (data.aiMedia.media) {
              clearInterval(interval)
              resolve(data.aiMedia)
            }
          })
          .catch(reject)
      }, 10000)
    })

  return {
    fetchAiMedia,
  }
}
