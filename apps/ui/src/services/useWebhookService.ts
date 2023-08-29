import { IWebhookQuery, IWebhooksQuery } from './interfaces/webhook.interface'
import { useMutation, useQuery } from '@apollo/client'

import webhooksGql from '../gql/webhook/webhook.gql'
import createWebhookgql from '../gql/webhook/createWebhook.gql'
import webhookByIdGql from '../gql/webhook/webhookById.gql'
import updateWebhookGql from '../gql/webhook/updateWebhook.gql'

type webhookType = {
  page: number
  limit: number
  search_text: string
}

export const useWebhooksService = ({ page, limit, search_text }: webhookType): IWebhooksQuery => {
  const {
    data: { webhooks } = [],
    error,
    loading,
    refetch,
  } = useQuery(webhooksGql, {
    variables: { filter: { page, limit, search_text } },
    fetchPolicy: 'cache-first',
  })

  return {
    data: webhooks || [],
    error,
    loading,
    refetch,
  }
}

export const useCreateWebhookService = () => {
  const [mutation] = useMutation(createWebhookgql)

  const createWebhookService = async (input: any, callback: () => void) => {
    const {
      data: { createWebhook },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createWebhook
  }

  return [createWebhookService]
}

export const useWebhookByIdService = ({ id }: { id: string }): IWebhookQuery => {
  const {
    data: { webhookById } = [],
    error,
    loading,
    refetch,
  } = useQuery(webhookByIdGql, {
    variables: { id },
    fetchPolicy: 'cache-first',
  })

  return {
    data: webhookById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateWebhookService = () => {
  const [mutation] = useMutation(updateWebhookGql)
  const updateWebhookById = async (id: string, input: any): Promise<{ success: boolean }> => {
    const {
      data: { webhook },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return webhook
  }

  return [updateWebhookById]
}
