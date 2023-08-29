type AiAnalysisErrorType = 'Error' | 'Warning' | 'Info'

export interface AiAnalysisError {
  error: AiAnalysisErrorEnum
}

export type AiAnalysisErrors = AiAnalysisError[] | null

export enum AiAnalysisErrorEnum {
  CollectionNotLinked = 'COLLECTION_NOT_LINKED',
  CollectionAndContractSizeNotEqual = 'COLLECTION_AND_CONTRACT_SIZE_NOT_EQUAL',
  CollectionMediaMissing = 'COLLECTION_MEDIA_MISSING',
  UpdateMetadata = 'UPDATE_METADATA',
  AssetNameMissing = 'ASSET_NAME_MISSING',
  AssetDescriptionMissing = 'ASSET_DESCRIPTION_MISSING',
  AssetPropertyMissing = 'ASSET_PROPERTY_MISSING',
  AssetMediaMissing = 'ASSET_MEDIA_MISSING',
}

const AI_ANALYSIS_ERROR_MAP: Record<
  AiAnalysisErrorEnum,
  { type: AiAnalysisErrorType; description: string }
> = {
  [AiAnalysisErrorEnum.CollectionNotLinked]: {
    type: 'Warning',
    description: 'Please link collection to contract',
  },
  [AiAnalysisErrorEnum.CollectionAndContractSizeNotEqual]: {
    type: 'Error',
    description: 'Assets count is not equal to collection size of contract',
  },
  [AiAnalysisErrorEnum.CollectionMediaMissing]: {
    type: 'Warning',
    description: 'Collection has no media',
  },
  [AiAnalysisErrorEnum.UpdateMetadata]: {
    type: 'Info',
    description: 'Assets are ready to be updated with new metadata',
  },
  [AiAnalysisErrorEnum.AssetNameMissing]: {
    type: 'Error',
    description: 'Missing name',
  },
  [AiAnalysisErrorEnum.AssetDescriptionMissing]: {
    type: 'Warning',
    description: 'Missing description',
  },
  [AiAnalysisErrorEnum.AssetPropertyMissing]: {
    type: 'Warning',
    description: 'Missing property',
  },
  [AiAnalysisErrorEnum.AssetMediaMissing]: {
    type: 'Error',
    description: 'Missing media',
  },
}

export function getAnalysisError(error: AiAnalysisError) {
  return AI_ANALYSIS_ERROR_MAP[error.error]
}

export interface AiAnalysisMappedError {
  type: AiAnalysisErrorType
  name: string
  description?: string
  error: AiAnalysisErrorEnum
}

// TODO: mirian refactor this
export function getAssetGlobalErrors(assets: any) {
  if (!assets) return { errors: [], warnings: [] }

  const errors: AiAnalysisMappedError[] = []
  const warnings: AiAnalysisMappedError[] = []

  assets.forEach((asset: any) => {
    const { ai_analysis, token_id } = asset

    ai_analysis?.forEach((error: AiAnalysisError) => {
      const { type, description } = getAnalysisError(error)

      if (type === 'Error') {
        errors.push({
          type,
          name: description,
          description: `Token ID ${token_id}`,
          error: error.error,
        })
      } else if (type === 'Warning') {
        warnings.push({
          type,
          name: description,
          description: `Token ID ${token_id}`,
          error: error.error,
        })
      }
    })
  })

  return { errors, warnings }
}

export function getCollectionErrors(collection: any) {
  if (!collection) return { errors: [], warnings: [], info: [] }
  const { ai_analysis } = collection

  const errors: AiAnalysisMappedError[] = []
  const warnings: AiAnalysisMappedError[] = []
  const info: AiAnalysisMappedError[] = []

  // console.log(ai_analysis)

  ai_analysis?.forEach((error: AiAnalysisError) => {
    const { type, description } = getAnalysisError(error)

    if (type === 'Error') {
      errors.push({
        type,
        name: description,
        error: error.error,
      })
    } else if (type === 'Warning') {
      warnings.push({
        type,
        name: description,
        error: error.error,
      })
    } else if (type === 'Info') {
      info.push({
        type,
        name: description,
        error: error.error,
      })
    }
  })

  return { errors, warnings, info }
}
