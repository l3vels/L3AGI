import { ToastContext } from 'contexts'
import useUploadFile from 'hooks/useUploadFile'
import React, { useContext } from 'react'

const useImportFile = ({ setFieldValue }: { setFieldValue: any }) => {
  const { setToast } = useContext(ToastContext)

  const [step, setStep] = React.useState<number>(0)
  const [fileIsLoading, setFileIsLoading] = React.useState(false)
  const [parsedData, setParsedData] = React.useState<any>([])

  const { uploadFile } = useUploadFile()

  const handleConvertData = (data: any) => {
    const dataArray = JSON.parse(data)
    const convertedData = dataArray.map((item: any) => ({
      System: item.System,
      User: item.User,
      Assistant: item.Assistant,
    }))
    setParsedData(convertedData)
    setStep(1)
  }

  const handleUploadJson = async (e: any) => {
    setFileIsLoading(true)
    const { files } = e.target

    if (!files) return

    const file = files[0]

    if (file.type !== 'application/json')
      return setToast({
        message: 'File must be JSON!',
        type: 'negative',
        open: true,
      })

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

    setFieldValue('fine_tuning_file_url', uploadedFiles?.[0].url)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const data = e.target.result

        handleConvertData(data)
      }
      reader.readAsText(file)
    }

    setFileIsLoading(false)
  }

  const handleFileChange = async (e: any) => {
    const { files } = e.target

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

    setFieldValue('fine_tuning_file_url', uploadedFiles?.[0].url)

    // const response = await parseCsvToJson(files[0], [])
    // console.log('response', response)
    // setParsedData()
    setStep(1)
  }

  return {
    handleFileChange,
    handleUploadJson,
    step,
    parsedData,
    setStep,
    handleConvertData,
    fileIsLoading,
  }
}

export default useImportFile
