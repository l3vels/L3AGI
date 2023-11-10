import { ToastContext } from 'contexts'
import useUploadFile from 'hooks/useUploadFile'
import React, { useContext } from 'react'
import Papa from 'papaparse'

const useImportFile = ({
  setFieldValue,
  fileValidationFields,
  fieldName,
}: {
  setFieldValue: any
  fileValidationFields: any
  fieldName: string
}) => {
  const { setToast } = useContext(ToastContext)

  const [fileIsLoading, setFileIsLoading] = React.useState(false)
  const [parsedData, setParsedData] = React.useState<any>([])

  const { uploadFile } = useUploadFile()

  const validateJSON = (content: any) => {
    const data = JSON.parse(content)

    if (
      Array.isArray(data) &&
      data.every(
        obj =>
          typeof obj === 'object' &&
          fileValidationFields.every((field: string) => field in obj) &&
          Object.keys(obj).length === fileValidationFields.length,
      )
    ) {
      return true
    } else {
      return false
    }
  }

  const validateCSV = (content: any) => {
    const lines = content.split('\n')
    const headers = lines[0].split(',').map((header: any) => header.trim())

    if (headers.every((header: any) => fileValidationFields.includes(header))) {
      return true
    } else {
      return false
    }
  }

  const handleConvertJson = (data: any) => {
    const dataArray = JSON.parse(data)

    const convertedData = dataArray.map((item: any) => {
      const dynamicFields: any = {}

      fileValidationFields.forEach((field: any) => {
        dynamicFields[field] = item[field]
      })

      return dynamicFields
    })

    return { data: convertedData }
  }

  const handleConvertCSVtoJSON = (csvString: string) => {
    const { data, errors } = Papa.parse(csvString, {
      header: true, // Set this to true if the CSV file has a header row
      skipEmptyLines: true, // Skip empty lines in CSV
    })

    return { data }
  }

  const handleUploadFile = async (files: any, data: any) => {
    setFileIsLoading(true)
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

    setFieldValue(fieldName, uploadedFiles?.[0].url)
    setFileIsLoading(false)

    setParsedData(data)
  }

  const handleFileFormat = async (event: any) => {
    const { files } = event.target
    const file = files[0]

    if (file.type !== 'text/csv' && file.type !== 'application/json')
      return setToast({
        message: 'File must be CSV or JSON format!',
        type: 'negative',
        open: true,
      })

    const reader = new FileReader()
    reader.onload = async (event: any) => {
      const fileData = event.target.result

      if (file.type === 'text/csv') {
        const isValid = validateCSV(fileData)
        if (isValid) {
          const { data } = handleConvertCSVtoJSON(fileData)
          await handleUploadFile(files, data)
        } else {
          return setToast({
            message: 'Data Fields are incorrect!',
            type: 'negative',
            open: true,
          })
        }
      } else if (file.type === 'application/json') {
        const isValid = validateJSON(fileData)
        if (isValid) {
          const { data } = handleConvertJson(fileData)
          await handleUploadFile(files, data)
        } else {
          return setToast({
            message: 'Data Fields are incorrect!',
            type: 'negative',
            open: true,
          })
        }
      }
    }

    reader.readAsText(file)
  }

  return {
    handleFileFormat,
    parsedData,
    setParsedData,
    handleConvertJson,
    handleConvertCSVtoJSON,
    fileIsLoading,
  }
}

export default useImportFile
