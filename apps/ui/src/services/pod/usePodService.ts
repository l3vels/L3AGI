
import { useQuery, useMutation } from '@apollo/client'
import getPodsGql from 'gql/pod/getPods.gql'
import createPodGql from 'gql/pod/createPod.gql'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { PodInput } from 'types/pod'


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


/**
 * Returns an object with a `createPod` function and a `loading` boolean indicating if the mutation is in progress.
 * The `createPod` function accepts a `PodInput` object and creates a new pod using the `createPodGql` mutation.
 * If the mutation is successful, the created pod is returned. If an error occurs, a toast message is displayed
 * and the error is rethrown.
 *
 * @return {{ createPod: (input: PodInput) => Promise<PodMessage>, loading: boolean }}
 */
export const useCreatePodService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createPodGql)

    const createPod = async (input: PodInput) => {
        try {
            const {
                data: { createPod },
            } = await mutation({
                variables: {
                    input: input,
                },
            })

            return createPod
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createPod, loading }
}