import { useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import { useModelsService } from 'services'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useToolsService } from 'services/tool/useToolsService'

export const useAgentForm = (formik: any) => {
  const [avatarIsLoading, setAvatarLoader] = useState(false)

  const { uploadFile } = useUploadFile()

  const { data: dataSources } = useDatasourcesService()
  const { data: tools } = useToolsService()
  const { data: models } = useModelsService()

  const modelOptions = models?.map(({ id, name, provider }) => ({
    value: id,
    label: `${name} (${provider})`,
  }))

  const datasourceOptions = dataSources?.map(({ id, name }) => {
    return { value: id, label: name }
  })

  const toolOptions = tools
    ?.filter((tool: any) => tool.is_active)
    .map((tool: any) => {
      return { value: tool.toolkit_id, label: tool.name }
    })

  const handleUploadAvatar = async (event: any) => {
    setAvatarLoader(true)
    const { files } = event.target
    if (!files) return

    const promises = []

    for (const file of files) {
      promises.push(
        uploadFile(
          {
            name: file.name,
            type: file.type,
            size: file.size,
          },
          file,
        ),
      )
    }

    const uploadedFiles = await Promise.all(promises)

    formik?.setFieldValue('agent_avatar', uploadedFiles?.[0].url)
    setAvatarLoader(false)
  }

  return {
    modelOptions,
    datasourceOptions,
    toolOptions,
    handleUploadAvatar,
    avatarIsLoading,
  }
}
