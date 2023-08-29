import { ToastContext } from 'contexts'
import useUploadFile from 'hooks/useUploadFile'
import { FILE_TYPES } from 'modals/AIChatModal/fileTypes'
import { useContext, useState } from 'react'
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'

export const useDatasourceForm = (formik: any) => {
  const { data: dataLoaders } = useDataLoadersService()

  const dataLoaderOptions = dataLoaders?.map((loader: any) => {
    const { source_type } = loader
    return { value: source_type, label: source_type }
  })

  const pickedLoaderFields = dataLoaders
    ?.filter((loader: any) => loader.source_type === formik?.values?.datasource_source_type)
    .map((loader: any) => {
      return { fields: loader.fields, category: loader.Category }
    })[0] || { category: '', fields: [] }

  // console.log('dataLoaders', dataLoaders)
  // console.log('dataLoaderOptions', dataLoaderOptions)
  // console.log('pickedLoaderFields', pickedLoaderFields)

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
    dataLoaderOptions,
    pickedLoaderFields,
    handleUploadFile,
    fileLoading,
  }
}
