import { useMutation } from '@apollo/client'

import createDatasourceGql from '../../gql/ai/datasource/createDatasource.gql'

export type DatasourceInput = {
  name: string
  description: string
  source_type: string
}

export const useCreateDatasourceService = () => {
  const [mutation] = useMutation(createDatasourceGql)

  const createDatasourceService = async (input: DatasourceInput) => {
    const { name, description, source_type } = input

    const {
      data: { createDatasource },
    } = await mutation({
      variables: {
        input: {
          name,
          description,
          source_type,
        },
      },
    })

    return createDatasource
  }

  return [createDatasourceService]
}
