export interface IWebhook {
  id: number
  url: string
  description: string
  method: Date
  api_version: string
  events: string
  status: string
  asset_id: number
  contract_id: number
  transaction_id: number
  collection_id: number
  game_id: number
}

export interface IWebhookInput {
  url: string
  description: string
  api_version: string
  events: any
  status: any
  asset_id: string
  contract_id: string
  transaction_id: string
  collection_id: string
  game_id: string
}
