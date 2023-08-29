import { useMutation } from '@apollo/client'
import deleteDatasourceByIdGql from '../../gql/ai/datasource/deleteDatasource.gql'

export const useDeleteDatasourcetByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteDatasourceByIdGql)

  const deleteDatasourceById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteDatasource = data?.deleteDatasource || { message: '', success: false }
    return deleteDatasource
  }

  return { deleteDatasourceById, loading }
}
