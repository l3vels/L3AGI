import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useProvidersService } from 'services/llm/useProvidersService'
import { useToolsService } from 'services/tool/useToolsService'

export const useAgentForm = (formik: any) => {
  const { data: providersData } = useProvidersService()
  const { data: datasourcesData } = useDatasourcesService()
  const { data: tools } = useToolsService()

  const providerOptions = providersData?.map((item: any) => {
    return { value: item.provider, label: item.provider, isActive: item.isActive }
  })

  const modelOptions = providersData
    ?.filter((item: any) => item.provider === formik?.values?.agent_mode_provider)
    ?.map((filteredItem: any) => filteredItem.models)[0]
    ?.map((model: any) => {
      return { value: model, label: model }
    })

  const datasourceOptions = datasourcesData?.map((datasource: any) => {
    return { value: datasource.id, label: datasource.name }
  })

  const toolOptions = tools
    ?.filter((tool: any) => tool.is_active)
    .map((tool: any) => {
      return { value: tool.toolkit_id, label: tool.name }
    })

  return {
    providerOptions,
    modelOptions,
    datasourceOptions,
    toolOptions,
  }
}
