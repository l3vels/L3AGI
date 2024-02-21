import { useQuery } from '@apollo/client'
import VOICE_OPTIONS_GQL from '../../gql/voice/voiceOptions.gql'

export const useVoiceOptionsService = () => {
  const { data, error, loading, refetch } = useQuery(VOICE_OPTIONS_GQL)

  return {
    data: data?.getVoiceOptions || [],
    error,
    loading,
    refetch,
  }
}
