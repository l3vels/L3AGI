import useUploadFile from 'hooks/useUploadFile'
import React from 'react'
import { useGetDownloadUrl, useParseCsvToJsonService } from 'services'

const useImportAsset = ({ setFieldValue }: { setFieldValue: any }) => {
  const [step, setStep] = React.useState<number>(0)
  const [parsedData, setParsedData] = React.useState<any>([])
  const { parseCsvToJson } = useParseCsvToJsonService()
  // const { data: template } = useGetDownloadUrl('template/Template_asset.csv')

  const { uploadFile } = useUploadFile()

  const handleUploadJson = async (e: any) => {
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

    const file = files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const content = e.target.result

        const contentArray = JSON.parse(content)
        const convertedData = contentArray.map((item: any) => ({
          System: item.System,
          User: item.User,
          Assistant: item.Assistant,
        }))
        setParsedData(convertedData)
      }
      reader.readAsText(file)
      setStep(1)
    }
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

  const handleDownloadTemplate = () => {
    window.open('template.url', '_blank')
  }

  return {
    handleFileChange,
    handleUploadJson,
    step,
    parsedData,
    setStep,
    handleDownloadTemplate,
  }
}

export default useImportAsset
