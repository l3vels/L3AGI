import { useGenerateUploadUrlService, useUploadFileService } from 'services/useFileService'
// import { IFileObject } from './types'

const useUploadFile = () => {
  const { uploadFileService, uploadProgress } = useUploadFileService()
  const { generateUploadUrlService, loading } = useGenerateUploadUrlService()

  const uploadFile = async (fileObj: any, file: File) => {
    const { signed_url, file_url } = await generateUploadUrlService(fileObj)
    await uploadFileService(signed_url, file)
    return {
      name: fileObj.name,
      type: fileObj.type,
      url: file_url,
    }
  }

  return {
    uploadFile,
    uploadProgress,
    loading,
  }
}

export default useUploadFile
