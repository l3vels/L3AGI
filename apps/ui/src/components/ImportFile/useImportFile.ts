import { ToastContext } from 'contexts'
import useUploadFile from 'hooks/useUploadFile'
import React, { useContext } from 'react'
import Papa from 'papaparse'

const useImportFile = ({ setFieldValue }: { setFieldValue: any }) => {
  const { setToast } = useContext(ToastContext)

  const [step, setStep] = React.useState<number>(0)
  const [fileIsLoading, setFileIsLoading] = React.useState(false)
  const [parsedData, setParsedData] = React.useState<any>([])

  const { uploadFile } = useUploadFile()

  const handleConvertJson = (data: any) => {
    const dataArray = JSON.parse(data)
    const convertedData = dataArray.map((item: any) => ({
      System: item.System,
      User: item.User,
      Assistant: item.Assistant,
    }))
    setParsedData(convertedData)
    setStep(1)
  }

  const handleConvertCSVtoJSON = (csvString: string) => {
    const { data, errors } = Papa.parse(csvString, {
      header: true, // Set this to true if the CSV file has a header row
      skipEmptyLines: true, // Skip empty lines in CSV
    })

    setParsedData(data)
    setStep(1)
  }

  const handleUploadFile = async (files: any) => {
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
  }

  const handleUploadJson = async (event: any) => {
    const { files } = event.target
    const file = files[0]

    if (file.type !== 'application/json')
      return setToast({
        message: 'File must be JSON!',
        type: 'negative',
        open: true,
      })

    handleUploadFile(files)

    const reader = new FileReader()

    reader.onload = (event: any) => {
      const data = event.target.result

      handleConvertJson(data)
    }
    reader.readAsText(file)
  }

  const handleUploadCsv = async (event: any) => {
    const { files } = event.target
    const file = files[0]

    if (file.type !== 'text/csv')
      return setToast({
        message: 'File must be CSV!',
        type: 'negative',
        open: true,
      })

    handleUploadFile(files)

    const reader = new FileReader()

    reader.onload = (event: any) => {
      const csvString = event.target.result
      handleConvertCSVtoJSON(csvString)
    }

    reader.readAsText(file)
  }

  return {
    handleUploadCsv,
    handleUploadJson,
    step,
    parsedData,
    setStep,
    handleConvertJson,
    handleConvertCSVtoJSON,
    fileIsLoading,
  }
}

export default useImportFile
