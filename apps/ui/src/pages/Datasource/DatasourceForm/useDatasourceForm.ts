import useUploadFile from 'hooks/useUploadFile'
import { ChangeEvent, useState } from 'react'
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'

export const useDatasourceForm = (formik: any) => {
  const { data: dataLoaders } = useDataLoadersService()

  const { setFieldValue, values } = formik

  const pickedLoaderFields = dataLoaders
    ?.filter((loader: any) => loader.source_type === values?.datasource_source_type)
    .map((loader: any) => {
      return { fields: loader.fields, category: loader.category }
    })[0] || { category: '', fields: [] }

  const { uploadFile } = useUploadFile()
  const [fileLoading, setFileLoading] = useState(false)

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('config_value', null)
    setFileLoading(true)

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

    setFieldValue('files', [...values.files, ...uploadedFiles])

    event.target.value = ''

    setFileLoading(false)
  }

  return {
    pickedLoaderFields,
    handleUploadFile,
    fileLoading,
    dataLoaders,
  }
}
