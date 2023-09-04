import { useParams } from 'react-router-dom'
import { useToolsService } from 'services/tool/useToolsService'

export const useToolView = () => {
  const params = useParams()

  const { toolId } = params

  const { data: toolsData } = useToolsService()

  const tool = toolsData?.filter((tool: any) => toolId === tool.toolkit_id)

  //   const initialValues = {
  //    tool_key: "",
  //    tool_
  //   }

  return { tool }
}
