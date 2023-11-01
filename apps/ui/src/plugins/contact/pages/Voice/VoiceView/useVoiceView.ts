import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useVoicesService } from 'plugins/contact/services/voice/useVoicesService'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useToolsService } from 'services/tool/useToolsService'

export const useVoiceView = ({ voiceSlug }: { voiceSlug?: string }) => {
  const { setToast } = useContext(ToastContext)

  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const { slug } = params

  const { data: voicesData } = useVoicesService()

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const voice = voicesData?.find((voice: any) => slug === voice.slug || voiceSlug === voice.slug)

  const filteredConfig = configsData?.filter((config: any) => config.voice_id === voice?.id)

  const initialValues: Record<string, string> = {}

  voice?.fields?.forEach((field: any) => {
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
      const field = voice?.fields.find((field: any) => field.key === key)

      configs.push({
        key,
        value,
        key_type: field.type,
        is_required: field.is_required,
        is_secret: field.is_secret,
        tool_id: voice.id,
      })
    }

    try {
      if (filteredConfig.length === 0) {
        const promises = configs.map((config: any) => createConfig(config))
        await Promise.all(promises)
      } else {
        const promises = configs.map((config: any) =>
          updateConfig(filteredConfig.find((cfg: any) => cfg.key === config.key).id, config),
        )

        await Promise.all(promises)
      }
      await refetchConfigs()
      setToast({
        message: 'Voice was updated!',
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

  return { voice, formik, handleSubmit, isLoading, refetchConfigs, configsData }
}
