import {
  IChatMessage,
  IChat,
  MessageTypeEnum,
  GptPromptEnum,
  ICollection,
  IReward,
  IAchievement,
  ChartTypeEnum,
  IReportChart,
} from '../types'
import {
  gameIdeaPrompt,
  gameplayPrompt,
  parseGPTContent,
  rewardAchievementPrompt,
  questionConfirmPrompt,
  collectionPrompt,
} from '../utils/prompts'
import { simulateConfirmAI, testJSON, testRewardsAchievementsJSON } from '../utils/test'
import { callChatGPT } from 'modals/AIChatModal/utils/davinci'
import { v4 as uuidv4 } from 'uuid'

import { waitFor } from '../utils'

const useChatAI = (
  addNotifyMessage: (text: string, ai: boolean) => void,
  addMessage: (message: IChatMessage) => void,
  regenerateMessage: (message: IChatMessage) => void,
  updateMessageCollection: (messageId: string, collection: ICollection) => void,
) => {
  const generateGameIdeaAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(userInput, false)
    }
    const ideaAmount = 3
    const prompt = gameIdeaPrompt(userInput, chat?.gameCategory || '', ideaAmount, 'JSON', 800)
    const content = await callChatGPT(prompt)

    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      // addNotifyMessage('Response of L3', true)
      return
    }

    const parseData = parseGPTContent(content)
    if (!parseData) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      // addNotifyMessage('Parse JSON error', true)
      return
    }

    const id = uuidv4()

    if (isRegenerated && regeneratedMessage?.id !== undefined) {
      regenerateMessage({
        ...regeneratedMessage,
        createdOn: Date.now(),
        gameIdeas: parseData.ideas,
      })
      return
    } else {
      const newMsg: IChatMessage = {
        id: id,
        createdOn: Date.now(),
        text: `Here is ${ideaAmount} ideas for Game Concept`,
        ai: true,
        type: MessageTypeEnum.GameIdea,
        gameIdeas: parseData.ideas,
      }

      // const mediasPr = newMsg?.gameIdeas?.map(idea => {
      //   return generateGameMediasAI(idea.name, idea.description, 1)
      // })

      // const result = await Promise.all(mediasPr || [])
      // newMsg.gameIdeas = newMsg?.gameIdeas?.map((idea, index) => {
      //   idea.image = result[0][0]
      //   return idea
      // })

      addMessage(newMsg)
    }
    return
  }

  const generateGameplayAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(`Let's now brainstorm exciting gameplay!`, true)
    }
    const amount = 3
    const prompt = gameplayPrompt(userInput, chat?.gameIdea?.description || '', amount, 'JSON', 600)

    const content = await callChatGPT(prompt)

    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }

    const parseData = parseGPTContent(content)
    if (!parseData) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }

    if (isRegenerated && regeneratedMessage) {
      regenerateMessage({
        ...regeneratedMessage,
        createdOn: Date.now(),
        gameplays: parseData.gameplays,
      })
      return
    }

    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Here are ${amount} ideas for the Gameplay`,
      ai: true,
      type: MessageTypeEnum.Gameplay,
      gameplays: parseData.gameplays,
    }
    addMessage(newMsg)
    return
  }

  const generateCollectionAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(
        `Ready your consoles, as we conjure collections, assets, attributes, and properties for your game. Brace for a few minutes of creation, unfolding step-by-step with vivid detail.`,
        true,
      )
    }
    const collections: ICollection[] = [
      {
        id: uuidv4(),
        loading: false,
        name: 'Collection 1',
      },
      {
        id: uuidv4(),
        loading: true,
        name: 'Collection 2',
      },
      {
        id: uuidv4(),
        loading: true,
        name: 'Collection 3',
      },
    ]
    const amount = 3

    const parseData: any =
      import.meta.env.REACT_APP_DATA_TEST_MODE === 'true'
        ? await testJSON()
        : await generateCollection(chat, userInput)

    if (!parseData) {
      console.log('Parse Data for collection is null')
      return
    }
    delete parseData?.collection?.id
    collections[0] = {
      ...collections[0],
      ...parseData?.collection,
    }
    //todo: regenerate disable on assets
    // if (isRegenerated && regeneratedMessage) {
    //   regenerateMessage({
    //     ...regeneratedMessage,
    //     createdOn: Date.now(),
    //     collections: parseData.collection,
    //   })
    //   return
    // }
    // debugger

    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Amazing! Age of Nations started to seem fun! Here are some assets we can include in your game
          * Select all that apply`,
      ai: true,
      type: MessageTypeEnum.Collection,
      collections,
    }

    addMessage(newMsg)
    for (let i = 1; i < amount; i++) {
      const prData =
        import.meta.env.REACT_APP_DATA_TEST_MODE === 'true'
          ? await testJSON()
          : await generateCollection(chat, userInput)

      if (prData.collection && newMsg.collections) {
        delete prData.collection.id
        const updateCollection = {
          ...newMsg.collections[i],
          ...prData.collection,
          loading: false,
        }
        updateMessageCollection(newMsg.id, updateCollection)
      }
    }

    return
  }

  const generateRewardAchievementAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(
        `Let's seize the moment to create exciting Rewards and Achievements for your game!`,
        true,
      )
    }
    const amountReward = 5
    const amountAchievement = 5

    const prompt = rewardAchievementPrompt(
      chat.name,
      chat.gameIdea?.description || '',
      chat.gameplay?.description || '',
      amountReward,
      amountAchievement,
      'JSON',
      80,
      80,
    )

    let parseData: any = null
    if (import.meta.env.REACT_APP_DATA_TEST_MODE === 'true') {
      parseData = await testRewardsAchievementsJSON()
    } else {
      const content = await callChatGPT(prompt)
      if (!content) {
        addNotifyMessage('Please, provide more details to generate idea', true)
        return
      }
      parseData = parseGPTContent(content)
    }

    if (!parseData) {
      addNotifyMessage('Oops, we hit a snag! Please give it another go later.', true)
      return
    }

    if (isRegenerated && regeneratedMessage) {
      regenerateMessage({
        ...regeneratedMessage,
        createdOn: Date.now(),
        rewards: parseData.rewards,
        achievements: parseData.achievements,
      })
    }
    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Great! Here are some rewards and achievements we can include in your game`,
      ai: true,
      type: MessageTypeEnum.RewardAchievement,
      rewards: parseData.rewards,
      achievements: parseData.achievements,
    }
    addMessage(newMsg)
    return
  }

  const generateCollection = async (chat: IChat, userInput: string): Promise<any> => {
    const prompt = collectionPrompt(
      userInput,
      chat?.gameIdea?.description || 'Any Game Idea',
      chat?.gameplay?.description || 'Any Gameplay',
      3,
      'JSON',
      100,
      100,
      200,
      100,
      5,
      5,
      5,
    )
    const content = await callChatGPT(prompt)
    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }
    return parseGPTContent(content)
  }

  const generateReportAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ) => {
    // const lastMessage = chat.messages[chat.messages.length - 1]

    // const gameId = lastMessage.report?.gameId

    // if (!gameId) {
    //   return
    // }

    // const { playersChartData, collectionsChartData } = await getGameReportData(gameId)

    // const charts: IReportChart[] = []

    // if (collectionsChartData.length) {
    //   charts.push({
    //     type: ChartTypeEnum.Pie,
    //     title: 'Collections grouped by categories',
    //     data: collectionsChartData,
    //   })

    //   charts.push({
    //     type: ChartTypeEnum.Bar,
    //     title: 'Collections grouped by categories',
    //     data: collectionsChartData,
    //   })
    // }

    // if (playersChartData.length) {
    //   charts.push({
    //     type: ChartTypeEnum.Line,
    //     title: 'Players growth over time',
    //     data: playersChartData,
    //   })
    // }

    await waitFor(3000)

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: `There are some reports or insights about your game.`,
      ai: true,
      type: MessageTypeEnum.Report,
      // report: {
      //   charts,
      // },
    })
  }

  const generatedAI = async (
    type: GptPromptEnum,
    chat: IChat,
    userInput: string,
    isRegenerated?: boolean,
    regeneratedMessage?: IChatMessage,
  ) => {
    switch (type) {
      case GptPromptEnum.GameIdeaPrompt: {
        await generateGameIdeaAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GptPromptEnum.GameplayPrompt: {
        await generateGameplayAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GptPromptEnum.CollectionAssetPrompt: {
        await generateCollectionAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GptPromptEnum.RewardAchievementPrompt: {
        await generateRewardAchievementAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GptPromptEnum.ReportPrompt: {
        await generateReportAI(chat, userInput, isRegenerated, regeneratedMessage)
      }
    }
  }
  const questionConfirmAI = async (question: string, answer: string): Promise<boolean> => {
    const prompt = questionConfirmPrompt(question, answer)
    const content = await callChatGPT(prompt)

    if (import.meta.env.REACT_APP_DATA_TEST_MODE === 'true') {
      return simulateConfirmAI(question, answer)
    }
    return content?.includes('yes') || false
  }

  return { generatedAI, questionConfirmAI }
}

export { useChatAI }
