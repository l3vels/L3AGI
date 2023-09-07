import { AuthContext, ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useToolsService } from 'services/tool/useToolsService'

export const useSettings = () => {
  const { setToast } = useContext(ToastContext)
  const { account: currentAccount, user: currentUser } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const openApiKeyConfig = configsData?.filter(
    (config: any) => config.account_id === currentAccount.id && config.key === 'open_api_key',
  )
  const huggingFaceConfig = configsData?.filter(
    (config: any) => config.account_id === currentAccount.id && config.key === 'hugging_face_token',
  )

  let initialValues = {
    open_api_key: '',
    hugging_face_token: '',
  }

  if (openApiKeyConfig?.length > 0 || huggingFaceConfig?.length > 0) {
    initialValues = {
      open_api_key: openApiKeyConfig[0]?.value || '',
      hugging_face_token: huggingFaceConfig[0]?.value || '',
    }
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const openApiKeyValues = {
        key: 'open_api_key',
        key_type: 'string',
        value: values.open_api_key,
        account_id: currentAccount.id,
        is_secret: true,
        is_required: true,
      }
      const huggingFaceTokenValues = {
        key: 'hugging_face_token',
        key_type: 'string',
        value: values.hugging_face_token,
        account_id: currentAccount.id,
        is_secret: true,
        is_required: true,
      }

      if (openApiKeyConfig?.length > 0) {
        await updateConfig(openApiKeyConfig[0]?.id, { ...openApiKeyValues })
      } else {
        await createConfig(openApiKeyValues)
      }
      if (huggingFaceConfig?.length > 0) {
        await updateConfig(huggingFaceConfig[0]?.id, { ...huggingFaceTokenValues })
      } else {
        await createConfig(huggingFaceTokenValues)
      }

      await refetchConfigs()
      setToast({
        message: 'Settings updated!',
        type: 'positive',
        open: true,
      })
    } catch (e) {
      console.log(e)
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
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    handleSubmit,
    isLoading,
  }
}
