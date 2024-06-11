
import { useQuery, useMutation } from '@apollo/client'
import getPodsGql from 'gql/pod/getPods.gql'


/**
 * Fetches the pods data using the `getPodsGql` query and returns the result.
 *
 * @return {{ data: Pod[] | undefined, error: ApolloError | null, loading: boolean, refetch: () => void }}
 */
export const useGetPods = () => {
    const { data, error, loading, refetch } = useQuery(getPodsGql)

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
        data: data?.getPods || [],
        error,
        loading,
        refetch,
    }
}