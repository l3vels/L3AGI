import { useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import { useModelsService } from 'services'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useToolsService } from 'services/tool/useToolsService'
import { useIntegrationsToolService } from 'services/integrations/useIntegrationsToolService'
import { useVoicesService } from 'plugins/contact/services/voice/useVoicesService'

export const useAgentForm = (formik: any) => {
  const [avatarIsLoading, setAvatarLoader] = useState(false)

  const { uploadFile } = useUploadFile()

  const { data: dataSources } = useDatasourcesService()
  const { data: tools } = useToolsService()
  const { data: models } = useModelsService()
  const { data: voices } = useVoicesService()
  const { data: integrations } = useIntegrationsToolService()

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

  const voiceSynthesizerOptions = voices
    ?.filter((voice: any) => voice.is_active && voice.is_synthesizer)
    .map((voice: any) => {
      return { value: voice.id, label: voice.name }
    })
  const voiceTranscriberOptions = voices
    ?.filter((voice: any) => voice.is_active && voice.is_transcriber)
    .map((voice: any) => {
      return { value: voice.id, label: voice.name }
    })

  const integrationOptions = integrations
    ?.filter((integration: any) => integration.is_active)
    .map((integration: any) => {
      return {
        value: integration.id,
        label: integration.name,
        fields: integration.fields.map((field: any) => {
          return {
            key: field.key,
            label: field.label,
            type: field.type,
            value: field.default_value || '',
            is_secret: field.is_secret,
            is_required: field.is_required,
          }
        }),
      }
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
    integrationOptions,

    handleUploadAvatar,
    avatarIsLoading,
    voiceSynthesizerOptions,
    voiceTranscriberOptions,
  }
}
