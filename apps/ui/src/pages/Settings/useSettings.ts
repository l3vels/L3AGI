import { AuthContext, ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'

import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'

export const SETTINGS_FIELDS = [
  {
    key: 'open_api_key',
    label: 'OpenAI API key',
  },
  {
    key: 'hugging_face_access_token',
    label: 'Hugging Face Access Token',
  },
  {
    key: 'replicate_api_token',
    label: 'Replicate API Token',
  },
  {
    key: 'pinecone_api_key',
    label: 'Pinecone API key',
  },
  {
    key: 'pinecone_environment',
    label: 'Pinecone Environment',
  },
  {
    key: 'weaviate_url',
    label: 'Weaviate Url',
  },
  {
    key: 'weaviate_api_key',
    label: 'Weaviate Api Key',
  },
]

export const useSettings = () => {
  const { setToast } = useContext(ToastContext)
  const { account: currentAccount } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const initialValues = SETTINGS_FIELDS.reduce<Record<string, string>>((prev, field) => {
    const config = configsData?.find(
      (config: any) => config.account_id === currentAccount?.id && config.key === field.key,
    )

    prev[field.key] = config?.value || ''
    return prev
  }, {})

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      const promises = SETTINGS_FIELDS.map(async field => {
        const value = values[field.key]

        const config = configsData.find(
          (config: any) => config.account_id === currentAccount?.id && config.key === field.key,
        )

        const data = {
          key: field.key,
          key_type: 'string',
          is_secret: true,
          is_required: true,
          value,
        }

        if (config) {
          return updateConfig(config.id, data)
        } else {
          return createConfig(data)
        }
      })

      await Promise.all(promises)
      await refetchConfigs()

      setToast({
        message: 'Settings updated!',
        type: 'positive',
        open: true,
      })
    } catch (e) {
      // console.log(e)

      setToast({
        message: 'Failed to save!',
        type: 'negative',
        open: true,
      })
    }

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    handleSubmit,
    isLoading,
    configsData,
  }
}
