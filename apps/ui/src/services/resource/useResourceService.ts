import { useQuery, useMutation } from '@apollo/client'
import getResourcesGql from 'gql/resource/getResources.gql'


export const useGetResources = () => {
    const { data, error, loading, refetch } = useQuery(getResourcesGql)

    try {
        if (error) {
            // Handle error here
            console.error("Error fetching user access:", error)
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("An unexpected error occurred:", error)
    }

    return {
        data: data?.getResources || [],
        error,
        loading,
        refetch,
    }
}