import { AuthContext, ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'

import { useConfigsService } from 'services/config/useConfigsService'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'

export const useSettingView = ({ settingSlug }: { settingSlug: string }) => {
  const { setToast } = useContext(ToastContext)
  const { account: currentAccount } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)

  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const [createConfig] = useCreateConfigService()
  const [updateConfig] = useUpdateConfigService()

  const existingSettingConfig = configsData?.find(
    (config: any) => config.account_id === currentAccount?.id && config.key === settingSlug,
  )

  const initialValue = {
    configValue: existingSettingConfig?.value,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const value = values.configValue

    try {
      const data = {
        key: settingSlug,
        key_type: 'string',
        is_secret: true,
        is_required: true,
        value,
      }

      if (existingSettingConfig) {
        updateConfig(existingSettingConfig.id, data)
      } else {
        createConfig(data)
      }

      await refetchConfigs()
      setToast({
        message: 'Settings updated!',
        type: 'positive',
        open: true,
      })
    } catch (e) {
      // console.log(e)

      setToast({
        message: 'Failed to save!',
        type: 'negative',
        open: true,
      })
    }

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
  }
}
