import { ToastContext } from 'contexts'
import useUploadFile from 'hooks/useUploadFile'
import { FILE_TYPES } from 'modals/AIChatModal/fileTypes'
import { useContext, useState } from 'react'
import { useModelsService } from 'services'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useTeamTypesService } from 'services/team/useTeamTypesService'
import { useToolsService } from 'services/tool/useToolsService'

export const useTeamOfAgentsForm = (formik: any) => {
  const { data: datasourcesData } = useDatasourcesService()
  const { data: tools } = useToolsService()
  const { data: models } = useModelsService()

  const modelOptions = models.map(({ id, name, provider }) => ({
    value: id,
    label: `${name} (${provider})`,
  }))
  const datasourceOptions = datasourcesData?.map(datasource => {
    return { value: datasource.id, label: datasource.name }
  })
  const toolOptions = tools
    ?.filter((tool: any) => tool.is_active)
    .map((tool: any) => {
      return { value: tool.toolkit_id, label: tool.name }
    })

  const { data: teamTypes } = useTeamTypesService()

  const pickedLoaderFields = teamTypes
    ?.filter((loader: any) => loader.team_type === formik?.values?.teamOfAgents_team_type)
    .map((loader: any) => {
      return { fields: loader.fields, category: loader.category }
    })[0] || { category: '', fields: [] }

  const { setToast } = useContext(ToastContext)

  const { uploadFile } = useUploadFile()

  const [fileLoading, setFileLoading] = useState(false)

  const handleUploadFile = async (event: any) => {
    formik.setFieldValue('config_value', null)

    setFileLoading(true)
    const { files }: any = event.target

    if (!FILE_TYPES.includes(files[0].type)) {
      setToast({
        message: 'Format is not supported!',
        type: 'negative',
        open: true,
      })

      setFileLoading(false)
    } else {
      const fileObj = {
        fileName: files[0].name,
        type: files[0].type,
        fileSize: files[0].size,
        locationField: 'chat',
        game_id: 'ce134c05-5be7-4cc0-8515-86908cce0753',
      }

      const res = await uploadFile(fileObj, files)
      setFileLoading(false)

      formik.setFieldValue('config_value', res)
    }
  }

  return {
    pickedLoaderFields,
    handleUploadFile,
    fileLoading,
    teamTypes,
    modelOptions,
    datasourceOptions,
    toolOptions,
  }
}
