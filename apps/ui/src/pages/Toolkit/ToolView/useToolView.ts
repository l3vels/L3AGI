import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useToolsService } from 'services/tool/useToolsService'

export const useToolView = () => {
  const { setToast } = useContext(ToastContext)

  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const { slug } = params

  const { data: toolkits } = useToolsService()

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const tool = toolkits?.find((toolkit: any) => slug === toolkit.slug)

  const filteredConfig = configsData?.filter((config: any) => config.toolkit_id === tool.toolkit_id)

  const initialValues = {
    tool_key: filteredConfig[0]?.key,
    tool_value: filteredConfig[0]?.value,
    tool_key_type: filteredConfig[0]?.key_type,
    tool_is_secret: filteredConfig[0]?.is_secret,
    tool_is_required: filteredConfig[0]?.is_required,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      const toolFieldInput = {
        key: values.tool_key,
        value: values.tool_value,
        key_type: values.tool_key_type,
        is_required: values.tool_is_required,
        is_secret: values.tool_is_secret,
        tool_id: tool.toolkit_id,
      }

      if (filteredConfig.length === 0) {
        await createConfig(toolFieldInput)
      } else {
        await updateConfig(filteredConfig[0]?.id, {
          ...toolFieldInput,
        })
      }
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

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
  })

  return { tool, formik, handleSubmit, isLoading }
}
