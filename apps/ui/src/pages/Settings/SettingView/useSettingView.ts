import { AuthContext, ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'

import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'

export const SETTINGS_FIELDS = [
  {
    title: 'OpenAI',
    slug: 'openai',
    group: 'llm',
    description:
      'Advancing artificial intelligence for the benefit of humanity, fostering innovation and collaboration in AI research and development.',
    configs: [
      {
        key: 'open_api_key',
        label: 'OpenAI API key',
      },
    ],
  },
  {
    title: 'Hugging Face',
    slug: 'huggingface',
    group: 'llm',
    description:
      'A leading platform for natural language processing, providing cutting-edge models and tools to fuel NLP projects and innovations.',
    configs: [{ key: 'hugging_face_access_token', label: 'Hugging Face Access Token' }],
  },
  {
    title: 'Replicate',
    slug: 'replicate',
    group: 'llm',
    description:
      'Your solution for effortless data replication and synchronization, ensuring seamless data consistency across multiple platforms.',
    configs: [
      {
        key: 'replicate_api_token',
        label: 'Replicate API Token',
      },
    ],
  },
  {
    title: 'Pinecone',
    slug: 'pinecone',
    description:
      'Empowering developers with lightning-fast vector similarity search for real-time applications, revolutionizing data retrieval and analysis.',
    group: 'vectorDb',
    configs: [
      {
        key: 'pinecone_api_key',
        label: 'Pinecone API key',
      },
      {
        key: 'pinecone_environment',
        label: 'Pinecone Environment',
      },
    ],
  },
  {
    title: 'Weaviate',
    slug: 'weaviate',
    description:
      'A powerful knowledge graph engine for organizing and querying complex data, unlocking insights and enhancing applications with contextual understanding.',
    group: 'vectorDb',
    configs: [
      {
        key: 'weaviate_url',
        label: 'Weaviate Url',
      },
      {
        key: 'weaviate_api_key',
        label: 'Weaviate Api Key',
      },
    ],
  },
]

export const useSettingView = ({ fields }: { fields: any }) => {
  const { setToast } = useContext(ToastContext)
  const { account: currentAccount } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const initialValue = fields?.reduce((acc: any, field: any) => {
    acc[field.key] = configsData?.find(
      (config: any) => config.account_id === currentAccount?.id && config.key === field.key,
    ).value
    return acc
  }, {})

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      const promises = fields.map(async (field: any) => {
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
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
    handleSubmit,
  }
}
