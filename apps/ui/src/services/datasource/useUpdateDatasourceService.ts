import { useMutation } from '@apollo/client'
import updateDatasourceGql from '../../gql/ai/datasource/updateDatasource.gql'

import { DatasourceInput } from './useCreateDatasourceService'

export const useUpdateDatasourceService = () => {
  const [mutation] = useMutation(updateDatasourceGql)
  const updateDatasource = async (id: string, input: DatasourceInput) => {
    const { name, description, source_type } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name: name,
          description: description,
          source_type: source_type,
        },
      },
    })
    return data
  }

  return [updateDatasource]
}
