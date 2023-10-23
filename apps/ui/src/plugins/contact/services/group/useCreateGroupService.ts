import { useMutation } from '@apollo/client'

import CREATE_GROUP_GQL from '../../gql/group/createGroup.gql'

export interface GroupInput {
  name: string
  description: string
}

export const useCreateGroupService = () => {
  const [mutation] = useMutation(CREATE_GROUP_GQL)

  const createGroupService = async (input: GroupInput) => {
    const { name, description } = input

    const {
      data: { createGroup },
    } = await mutation({
      variables: {
        input: {
          name,
          description,
        },
      },
    })

    return createGroup
  }

  return [createGroupService]
}
