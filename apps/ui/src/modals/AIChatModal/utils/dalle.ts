import { Configuration, OpenAIApi } from 'openai'

export const dalle = async (prompt: string, amount?: number) => {
  const openAPIKey = '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'

  const configuration = new Configuration({
    apiKey: openAPIKey,
  })

  const openai = new OpenAIApi(configuration)

  const response = await openai.createImage({
    prompt: `${prompt}`,
    n: amount || 1,
    // size: '512x512',
  })

  console.log(response)

  return response
}
