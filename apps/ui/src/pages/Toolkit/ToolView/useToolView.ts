import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useToolsService } from 'services/tool/useToolsService'

export const useToolView = () => {
  const params = useParams()

  const { toolId } = params

  const { data: toolsData } = useToolsService()

  const { data: configsData } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const tool = toolsData?.filter((tool: any) => toolId === tool.toolkit_id)

  const filteredConfig = configsData?.filter((config: any) => config.toolkit_id === toolId)
  console.log('configsData', configsData)
  console.log('filteredConfig', filteredConfig)
  const initialValues = {
    tool_key: filteredConfig[0]?.key || '',
    tool_value: filteredConfig[0]?.value || '',
    tool_key_type: filteredConfig[0]?.key_type || '',
  }

  const handleSubmit = async (values: any) => {
    try {
      const toolFieldInput = {
        key: values.tool_key,
        value: values.tool_value,
        key_type: values.tool_key_type,
        tool_id: toolId,
      }
      console.log('toolFieldInput', toolFieldInput)

      if (filteredConfig.length === 0) {
        await createConfig(toolFieldInput)
      } else {
        await updateConfig(filteredConfig[0]?.id, {
          ...toolFieldInput,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: gameValidationSchema,
    // enableReinitialize: true,
  })

  //   const initialValues = {
  //    tool_key: "",
  //    tool_
  //   }

  return { tool, formik, handleSubmit }
}
