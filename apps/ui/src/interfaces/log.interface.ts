export interface ILog {
  id: number
  method: string
  endpoint: string
  body: any
  params: any
  request_date: Date
  status: string
  response: any
  env: string
  changes: any
  is_gql: boolean
  gql_type: string
  gql_variables: any
  gql_source: string
  gql_name: string
  source_type: string
  ip: string
  error_type: string
  error_code: string
  error_message: string
  request_type: string
  query_params: any
  created_on: Date
  player_id: number
  game_id: number
  collection_id: number
  contract_id: number
  asset_id: number
}

export interface ILogInput {
  name: string
  category: string
  description: string
  banner_image: string
  logo_image: string
  background_image: string
  url: string
  web_link: string
  discord: string
  twitter: string
  instagram: string
}
