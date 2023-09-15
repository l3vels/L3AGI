import { ToastContext } from 'contexts'
import useUploadFile from 'hooks/useUploadFile'
import { FILE_TYPES } from 'modals/AIChatModal/fileTypes'
import { useContext, useState } from 'react'
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'

export const useDatasourceForm = (formik: any) => {
  const { data: dataLoaders } = useDataLoadersService()

  const pickedLoaderFields = dataLoaders
    ?.filter((loader: any) => loader.source_type === formik?.values?.datasource_source_type)
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
    } else {
      const url = await uploadFile(
        {
          name: files[0].name,
          type: files[0].type,
          size: files[0].size,
        },
        files[0],
      )

      formik.setFieldValue('config_value', url)
    }

    setFileLoading(false)
  }

  return {
    pickedLoaderFields,
    handleUploadFile,
    fileLoading,
    dataLoaders,
  }
}
