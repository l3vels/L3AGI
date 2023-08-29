import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createPropertyGql from '../gql/property/createProperty.gql'
import propertiesGql from '../gql/property/properties.gql'
import propertyByIdGql from '../gql/property/propertyById.gql'
import updatePropertyByIdGql from '../gql/property/updatePropertyById.gql'
import deletePropertyByIdGql from '../gql/property/deletePropertyById.gql'
import updatePropertyMediaGql from '../gql/property/updatePropertyMedia.gql'

// type createGameType = {
//   name: String
//   category: String
//   description: String
// }

type PropertiesType = {
  page: number
  limit: number
  search_text: string
  game_id?: string
}

type PropertyMediasType = {
  is_main: boolean
  url: string
  format: string
}

export const useCreatePropertyService = () => {
  const [mutation] = useMutation(createPropertyGql)
  const createPropertyService = async (input: any, callback: any) => {
    const {
      data: { createProperty },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createProperty
  }

  return [createPropertyService]
}

export const useCreatePropertyInCacheThenServerService = ({ filter }: any) => {
  const [createInCacheThenInServer] = useMutation(createPropertyGql, {
    update(cache, { data: { createProperty } }) {
      const options: any = {
        query: propertiesGql,
        variables: { filter },
      }

      const existingProperties: any = cache.readQuery(options)
      const newProperties = {
        ...existingProperties.properties,
        items: [createProperty.property, ...existingProperties?.properties?.items],
      }
      cache.writeQuery({
        ...options,
        data: { properties: newProperties },
      })
    },
  })

  const createPropertyService = async (input: any) => {
    const { data } = await createInCacheThenInServer({
      variables: {
        input,
      },
      optimisticResponse: {
        createProperty: {
          property: {
            ...input,
            config: null,
            status: 'Pending',
            id: 'TEMP-ID',
            parent_id: null,
            modified_by: null,
            modified_on: new Date().toString(),
            created_by: '36',
            account_id: '36',
            created_on: new Date().toString(),
            __typename: 'Property',
          },
          success: true,
          message: 'The property was added in cache',
        },
      },
    })

    return data
  }

  return [createPropertyService]
}

export const usePropertiesService = ({ page, limit, search_text, game_id }: PropertiesType) => {
  const {
    data: { properties } = [],
    error,
    loading,
    refetch,
  } = useQuery(propertiesGql, {
    variables: {
      filter: {
        game_id,

        search_text,
        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
    skip: !game_id,
    fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-only',
  })

  return {
    data: properties || [],
    error,
    loading,
    refetch,
  }
}

export const usePropertyIdService = ({ id }: { id?: any }) => {
  const {
    data: { propertyById } = [],
    error,
    loading,
    refetch,
  } = useQuery(propertyByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: propertyById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdatePropertyByIdService = () => {
  const [mutation] = useMutation(updatePropertyByIdGql)
  const updatePropertyById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { asset },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return asset
  }

  return [updatePropertyById]
}

export const useUpdateCacheThenServerProperty = () => {
  const [updateCacheThenServer] = useMutation(updatePropertyByIdGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updatePropertyByIdGql,
        data: {
          updateProperty: {
            property: {
              ...data.updateProperty.property,
            },
            success: true,
            message: 'The property was successfully updated',
          },
        },
        variables: {
          id: data.updateProperty.property.id,
        },
      })
    },
  })

  const updateFn = ({ field, newValue, params }: { field: string; newValue: any; params: any }) => {
    updateCacheThenServer({
      variables: {
        id: params.data.id,
        input: {
          [field]: newValue,
          game_id: params.data.game_id,
        },
      },
      optimisticResponse: {
        updateProperty: {
          property: {
            ...params.data,
            id: params.data.id,
            [field]: newValue,
          },
          success: true,
          message: 'The property was successfully updated',
        },
      },
    })
  }

  return updateFn
}

// export const useUpdatePropertyByIdInCache = (client: any) => {
//   const writeQuery = client.writeQuery;
//   const [mutation] = writeQuery(updatePropertyByIdGql);
//   const updatePropertyByIdInCache = async (
//     id: any,
//     input: any
//   ): Promise<{ success: boolean }> => {
//     const {
//       data: { asset },
//     } = await mutation({
//       variables: {
//         id,
//         input,
//       },
//     });
//     return asset;
//   };

//   return [updatePropertyByIdInCache];
// };

export const useDeletePropertyByIdService = () => {
  const [mutation] = useMutation(deletePropertyByIdGql)

  const deletePropertyById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteProperty },
    } = await mutation({ variables: { id } })
    return deleteProperty
  }
  return [deletePropertyById]
}

export const useUpdatePropertyMedia = () => {
  const [mutation] = useMutation(updatePropertyMediaGql)
  const updatePropertyMedia = async (
    id: string,
    input: PropertyMediasType[],
  ): Promise<{ success: boolean }> => {
    const {
      data: { updatePropertyMedia },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return updatePropertyMedia
  }

  return [updatePropertyMedia]
}
