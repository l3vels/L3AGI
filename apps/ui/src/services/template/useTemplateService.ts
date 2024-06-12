import { useQuery, useMutation } from '@apollo/client'
import getTemplatesGql from 'gql/template/getTemplates.gql'


export const useGetTemplates = () => {
    const { data, error, loading, refetch } = useQuery(getTemplatesGql)

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
        data: data?.getTemplates || [],
        error,
        loading,
        refetch,
    }
}