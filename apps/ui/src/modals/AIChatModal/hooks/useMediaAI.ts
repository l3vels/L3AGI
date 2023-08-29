import { useGenerateAiMediasService } from 'services'
import { IAsset, IAssetMedia } from '../types'
import { callChatGPT, davinci } from '../utils/davinci'
import { parseGPTContent } from '../utils/prompts'
import { testJSON, testRewardsAchievementsJSON } from '../utils/test'
import { dalle } from 'modals/AIChatModal/utils/dalle'
import { v4 as uuidv4 } from 'uuid'
import { useAiMediaService } from 'services/chat/useAiMediaService'

const useMediaAI = () => {
  const { generateAiMediasService } = useGenerateAiMediasService()
  const { fetchAiMedia } = useAiMediaService()

  const generateCollectionMediasAI = async (): Promise<any> => {}

  const generateGameMediasAI = async (name: string, description: string) => {
    const prompt = `Generate Prompt for Dalle AI, I want to use it for the game:
    Game title: "${name}",
    Game description: "${description}",

    General rules:
    1. characters amount must be less than 400. 
    2. Give me output only prompt text`

    const dallePrompt = await callChatGPT(prompt)

    // const dallePrompt =
    // "Create a captivating and visually appealing image for a web 3 game called 'Pawsome Pizzeria'. The 2D game revolves around running a pizza restaurant in a world filled with animals."

    if (!dallePrompt) return null

    const { id } = await generateAiMediasService(dallePrompt)
    const data = await fetchAiMedia({ id })

    return data
  }

  const generateAssetsMediasAI = async (
    assets: IAsset[],
    name: string,
    description: string,
    amount: number,
  ): Promise<any> => {
    const assetJson = assets.map(asset => {
      return {
        id: asset.id,
        name: asset.name,
        description: asset.description,
      }
    })

    const prompt = `Generate Prompts for Dalle AI, I want to use it for the game's assets:
    Game title: "${name}",
    Game description: "${description}",
    Game assets json file: "${JSON.stringify(assetJson)}"

    General rules:
    1. characters amount must be less than 400. 
    2. Give me output only prompt text
    3. Output should be in JSON format.
    4. Please return only json without any other text
    5. Example of output: 
    "{prompts:[{
        "id": "1",
        "asset_id":  "1", // asset id, must be the same as in the json file
        "prompt": "Generate Prompt for Dalle AI, I want to use it for the game's assets"
      }]
    }"`

    const content = await callChatGPT(prompt)
    if (!content) {
      console.log('Something wrong to generate asset medias')
      return
    }
    const json = parseGPTContent(content)
    const dallePrompts = json?.prompts
    if (!dallePrompts) return []

    const assetUrls: {
      [key: string]: { id: string; url: string }
    } = {}

    const ids: { id: string; asset_id: number }[] = []

    // Process each prompt in sequence because of the rate limit
    for (const prompt of dallePrompts) {
      const { id } = await generateAiMediasService(prompt.prompt)
      ids.push({ id, asset_id: prompt.asset_id })
      await waitFor(5000)
    }

    console.log({ ids })
    debugger

    const promises = ids.map(async ({ id, asset_id }) => {
      const { media } = await fetchAiMedia({ id })

      assetUrls[asset_id] = {
        id,
        url: media,
      }
    })

    await Promise.all(promises)

    console.log({ assetUrls })

    debugger

    return assetUrls
  }

  const generateMediaAi = async (prompt: string) => {
    const { id } = await generateAiMediasService(prompt)
    const { media } = await fetchAiMedia({ id })
    return { id, media }
  }

  return {
    generateCollectionMediasAI,
    generateGameMediasAI,
    generateAssetsMediasAI,
    generateMediaAi,
  }
}

function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export { useMediaAI }
