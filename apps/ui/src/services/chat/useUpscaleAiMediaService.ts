import { useMutation } from '@apollo/client'
import UPSCALE_AI_MEDIA_GQL from '../../gql/chat/upscaleAiMedia.gql'
import { IAiMediaPrompt } from 'services/types'

interface Data {
  upscaleAiMedia: IAiMediaPrompt
}

interface Variables {
  id: string
  button: string
}

export const useUpscaleAiMediaService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(UPSCALE_AI_MEDIA_GQL)

  const upscaleAiMediaService = async (variables: Variables) => {
    const { data, errors } = await mutation({
      variables,
    })

    if (errors?.length || !data) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return data.upscaleAiMedia
  }

  return {
    upscaleAiMediaService,
    loading,
  }
}
