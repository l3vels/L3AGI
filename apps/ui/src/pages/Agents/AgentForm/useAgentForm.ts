import { useModelsService } from 'services'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useToolsService } from 'services/tool/useToolsService'

export const useAgentForm = (formik: any) => {
  const { data: datasourcesData } = useDatasourcesService()
  const { data: tools } = useToolsService()
  const { data: models } = useModelsService()

  const modelOptions = models.map(({ id, name, provider }) => ({
    value: id,
    label: `${name} (${provider})`,
  }))

  const datasourceOptions = datasourcesData?.map((datasource: any) => {
    return { value: datasource.id, label: datasource.name }
  })

  const toolOptions = tools
    ?.filter((tool: any) => tool.is_active)
    .map((tool: any) => {
      return { value: tool.toolkit_id, label: tool.name }
    })

  return {
    modelOptions,
    datasourceOptions,
    toolOptions,
  }
}
