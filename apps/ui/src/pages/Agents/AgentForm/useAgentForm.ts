import { useDatasource } from 'pages/Datasource/useDatasource'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useProvidersService } from 'services/llm/useProvidersService'

export const useAgentForm = (formik: any) => {
  const { data: providersData } = useProvidersService()
  const { data: datasourcesData } = useDatasourcesService()

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

  return {
    providerOptions,
    modelOptions,
    datasourceOptions,
  }
}
