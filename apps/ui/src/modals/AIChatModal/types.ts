export enum ChatStepEnum {
  CreateGameConcept = 'Create Game Concept',
  GenerateGameplay = 'Generate Gameplay',
  GenerateCollections = 'Generate Collections',
  GenerateAssets = 'Generate Assets (Properties & Attributes)',
  AssetsMedias = 'Generate Medias of Assets',
  GenerateAchievementsAndRewards = 'Achievements & Rewards',
  FinishAndCreate = 'Finish & Create',
  BuildContracts = 'Build Smart Contracts (Coming soon)',
  GenerateSDKs = 'Generate Code (Coming soon)',
}

export enum StepStatusEnum {
  Completed = 'Completed',
  Pending = 'Pending',
  InProgress = 'In Progress',
}

export enum GptPromptEnum {
  GameIdeaPrompt = 'GameIdeaPrompt',
  GameplayPrompt = 'gameplayPrompt',
  CollectionAssetPrompt = 'CollectionAssetPrompt',
  RewardAchievementPrompt = 'RewardAchievementPrompt',
  QuestionConfirmPrompt = 'QuestionConfirmPrompt',
  ReportPrompt = 'ReportPrompt',
}

export enum ApiVersionEnum {
  // CreateV1 = 'L3-Create-v1',
  // ReportV1 = 'L3-Report-v1',
  // MediaV1 = 'L3-Media-v1',
  L3_Conversational = 'L3-AI',
  // L3_PlanAndExecute = 'L3-Plan-And-Execute',
  L3_PlanAndExecuteWithTools = 'L3-Planner',
  L3_Authoritarian_Speaker = 'L3-authoritarian-speaker',
  L3_Agent_Debates = 'L3-agent-Debates',
  // L3_PlanAndExecute = 'L3_PlanAndExecute',
}

export enum MessageTypeEnum {
  AI_MANUAL = 'AI_MANUAL',
  GameCategory = 'Game Category',
  User = 'User',
  GameIdea = 'GameIdea',
  Gameplay = 'Gameplay',
  Collection = 'Collection',
  RewardAchievement = 'RewardAchievement',
  CreateFinishQuestion = 'CreateFinishQuestion',
  CreateContractQuestion = 'CreateContractQuestion',
  Report = 'Report',
  SelectGameForReport = 'SelectGameForReport',
  GameMedias = 'GameMedias',
  AssetsMedias = 'AssetsMedias',
  Media = 'Media',
}

export interface IChatStep {
  id: number
  name: ChatStepEnum
  status: StepStatusEnum
}

export interface IGameplay {
  id: number
  description: string
}

export interface IGameIdea {
  id: number
  name: string
  description: string
  image?: string
}

export interface IAssetMedia {
  id?: string
  url?: string
  is_main?: boolean
  format?: string
}

export interface IAsset {
  id: number
  name: string
  description: string
  attributes: IAttribute[]
  properties: IProperty[]
  medias: IAssetMedia[] // media for backend

  isMediaGenerating?: boolean

  media?: IMedia
}

export interface IAttribute {
  id: number
  name: string
  description: string
  min: number
  max: number
}
export interface IAttributeAsset {
  id: number
  name: string
  value: number
}
export interface IProperty {
  id: number
  name: string
  description: string
}
export interface IReward {
  id: number
  loading: boolean
  name: string
  description?: string
  type?: string
}
export interface IAchievement {
  id: number
  loading: boolean
  name: string
  description?: string
  trigger?: string
  rewards: IReward[]
}

export interface ICollection {
  id: string
  loading: boolean
  name?: string
  description?: string
  image?: string
  assets?: IAsset[]
  properties?: IProperty[]
  attributes?: IAttributeAsset[]
}

export interface IChat {
  id: string
  createdOn: number
  name: string
  messages: IChatMessage[]
  steps: { [key in ChatStepEnum]: StepStatusEnum }
  gameCategory?: string
  userKeywords?: string
  gameIdea?: IGameIdea
  gameplay?: IGameplay
  collections?: ICollection[]
  rewards?: IReward[]
  achievements?: IAchievement[]
  isCreateFinished?: boolean
  isAssetMediasGenerated?: boolean

  // Game medias
  medias?: IAssetMedia[]

  report?: {
    gameId?: string
  }
}

export interface IChatMessage {
  id: string
  createdOn: number
  text: string
  prompt?: string
  ai: boolean
  type: MessageTypeEnum
  gameIdeas?: IGameIdea[]
  gameplays?: IGameplay[]
  collections?: ICollection[]
  rewards?: IReward[]
  achievements?: IAchievement[]
  history?: IChatMessage[]
  loader_type?: string
  medias?: string[]

  media?: IMedia

  isMediaGenerating?: boolean

  report?: {
    gameId?: string

    charts?: IReportChart[]
  }
}

export interface IReportChart {
  type: ChartTypeEnum
  title: string
  data: Record<string, unknown>[]
}

export enum ChartTypeEnum {
  Pie = 'pie',
  Bar = 'bar',
  Line = 'line',
}

export interface IMedia {
  current: {
    url: string
    type: 'collage' | 'upscaled' | 'upscaledWithoutBackground'
  }

  // Generated media collage (4 images)
  collage: {
    id: string
    url: string
  }

  // Upscaled/chosen media (1 image)
  upscaled?: {
    id: string
    url: string
  }

  upscaledWithoutBackground?: {
    url: string
  }
}
