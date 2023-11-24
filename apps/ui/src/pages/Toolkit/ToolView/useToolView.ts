import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useToolsService } from 'services/tool/useToolsService'

export const useToolView = ({ toolSlug }: { toolSlug?: string }) => {
  const { setToast } = useContext(ToastContext)

  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const { slug } = params

  const { data: toolkits } = useToolsService()

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const tool = toolkits?.find((toolkit: any) => slug === toolkit.slug || toolSlug === toolkit.slug)

  const filteredConfig = configsData?.filter(
    (config: any) => config.toolkit_id === tool?.toolkit_id,
  )

  const initialValues: Record<string, string> = {}

  tool?.fields?.forEach((field: any) => {
    initialValues[field.key] = filteredConfig?.find(
      (config: any) => config.key === field.key,
    )?.value
  })

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
  })

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const configs = []

    for (const key in values) {
      const value = values[key]
      const field = tool?.fields.find((field: any) => field.key === key)

      configs.push({
        key,
        value,
        key_type: field.type,
        is_required: field.is_required,
        is_secret: field.is_secret,
        tool_id: tool.toolkit_id,
      })
    }

    try {
      const promises = tool?.fields.map((field: any) => {
        const existingConfig = filteredConfig?.find((config: any) => config.key === field.key)
        const config = {
          key: field.key,
          value: values[field.key],
          key_type: field.type,
          is_required: field.is_required,
          is_secret: field.is_secret,
          tool_id: tool.toolkit_id,
        }

        if (!existingConfig) return createConfig(config)
        return updateConfig(existingConfig.id, config)
      })

      await Promise.all(promises)

      await refetchConfigs()
      setToast({
        message: 'Toolkit was updated!',
        type: 'positive',
        open: true,
      })
    } catch (e) {
      setToast({
        message: 'Failed to save!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  return { tool, formik, handleSubmit, isLoading, refetchConfigs, configsData }
}
