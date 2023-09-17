import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'
import axios from 'axios'

import generateUploadUrlServiceGql from '../gql/ai/file/generateUploadUrl.gql'
import parseCsvToJsonGql from '../gql/file/parseCsvToJson.gql'
import getDownloadUrlGql from '../gql/file/getDownloadUrl.gql'

export const useGenerateUploadUrlService = () => {
  const [mutation, { loading }] = useMutation(generateUploadUrlServiceGql)

  const generateUploadUrlService = async (input: any) => {
    const {
      data: { generateUploadUrl },
    } = await mutation({
      variables: { input },
    })

    return generateUploadUrl
  }

  return { generateUploadUrlService, loading }
}

export const useUploadFileService = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  useEffect(() => {
    if (uploadProgress === 100) {
      setUploadProgress(0)
    }
  }, [uploadProgress])

  const uploadFileService = (url: string, file: any) =>
    axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: ({ total, loaded }) => {
        setUploadProgress((loaded / total) * 100)
      },
    })

  return {
    uploadProgress,
    uploadFileService,
  }
}

export const useParseCsvToJsonService = () => {
  const [parseCsvToJson, { loading }] = useMutation(parseCsvToJsonGql)

  const parseCsvToJsonService = async (file: any, headers: string[]) => {
    const { data } = await parseCsvToJson({ variables: { file: file, headers: headers } })

    return data.parseCsvToJson
  }

  return { parseCsvToJson: parseCsvToJsonService, loading }
}

export const useGetDownloadUrl = (key: string) => {
  const {
    data: { generateDownloadUrl } = {},
    error,
    loading,
    refetch,
  } = useQuery(getDownloadUrlGql, { variables: { key } })

  return {
    data: generateDownloadUrl || {},
    error,
    loading,
    refetch,
  }
}
