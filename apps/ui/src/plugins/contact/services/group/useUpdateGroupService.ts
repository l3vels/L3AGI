import { useMutation } from '@apollo/client'
import UPDATE_GROUP_GQL from '../../gql/group/updateGroup.gql'
import { GroupInput } from './useCreateGroupService'

export const useUpdateGroupService = () => {
  const [mutation] = useMutation(UPDATE_GROUP_GQL)
  const updateGroup = async (id: string, input: GroupInput) => {
    const { name, description } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name,
          description,
        },
      },
    })
    return data
  }

  return [updateGroup]
}
