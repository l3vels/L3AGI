import { Configuration, OpenAIApi } from 'openai'

export const checkApiKey = async (keys: string) => {
  const configuration = new Configuration({
    apiKey: keys,
  })

  const openai = new OpenAIApi(configuration)

  return openai.listModels()
}
