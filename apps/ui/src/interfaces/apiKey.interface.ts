export interface IApiKey {
  id: number
  name: string
  token: string
  expiration: Date
  note: string
  games: any
  __typename: string
}

export interface IApiKeyInput {
  name: string
  expiration: Date
  note: string
  games: any
}
