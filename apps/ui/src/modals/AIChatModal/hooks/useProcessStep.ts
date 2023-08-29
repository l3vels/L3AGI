import { v4 as uuidv4 } from 'uuid'
import {
  ApiVersionEnum,
  GptPromptEnum,
  IChat,
  IChatMessage,
  ICollection,
  MessageTypeEnum,
} from '../types'
import { useChatAI } from './useChatAI'
import { useMediaAI } from './useMediaAI'
import { simulateConfirmAI } from '../utils/test'
import { useCreateGameFromChatService } from 'services'

const useProcessSteps = (
  addMessage: (message: IChatMessage) => void,
  addNotifyMessage: (text: string, ai: boolean) => void,
  regenerateMessage: (message: IChatMessage) => void,
  setIsCreateFinished: (isFinished: boolean) => void,
  setIsAssetMediasGenerated: (isAssetMediasGenerated: boolean) => void,
  updateMessageCollection: (messageId: string, collection: ICollection) => void,
  setUserKeywords: (keywords: string) => void,
  apiVersion: ApiVersionEnum,
) => {
  const { generateMediaAi, generateGameMediasAI, generateAssetsMediasAI } = useMediaAI()

  const { generatedAI } = useChatAI(
    addNotifyMessage,
    addMessage,
    regenerateMessage,
    updateMessageCollection,
  )

  const { createGameFromChatService } = useCreateGameFromChatService()

  const processGameIdea = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameIdea) {
      const isShowedGameIdeas = chat?.messages.filter(
        i => i.type === MessageTypeEnum.GameIdea,
      ).length
      if (isShowedGameIdeas) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Pick an existing game idea or inspire a new one.',
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
        return false
      } else {
        if (userInput) {
          setUserKeywords(userInput)
          await generatedAI(GptPromptEnum.GameIdeaPrompt, chat, userInput)
          return false
        }
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Sure thing! Please share keywords about your dream game.',
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
      }
      return false
    }
    return true
  }

  const processCategory = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameCategory) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: 'Please, choose a game category first.',
        ai: true,
        type: MessageTypeEnum.AI_MANUAL,
      })
      return false
    }
    return true
  }

  const processGameplay = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameplay) {
      const isShowedGameplays = chat?.messages.filter(
        i => i.type === MessageTypeEnum.Gameplay,
      ).length
      if (isShowedGameplays) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Pick an existing gameplay or regenerate it.',
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
        return false
      } else {
        await generatedAI(GptPromptEnum.GameplayPrompt, chat, chat.userKeywords || '')
        return false
      }
    }
    return true
  }

  const processCollections = async (chat: IChat, userInput?: string): Promise<boolean> => {
    const isShowedCollections = chat?.messages.filter(
      i => i.type === MessageTypeEnum.Collection,
    ).length
    if (isShowedCollections) {
      if (!chat?.collections?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Kindly choose the collection or multiple collections that you'd like to incorporate into your game.`,
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
        return false
      }
    } else {
      // addMessage({
      //   id: uuidv4(),
      //   createdOn: Date.now(),
      //   text: `Okay, We.`,
      //   ai: true,
      //   type: MessageTypeEnum.AI_MANUAL,
      // })
      await generatedAI(GptPromptEnum.CollectionAssetPrompt, chat, chat.userKeywords || '')
      return false
    }
    return true
  }

  const processRewardsAchievements = async (chat: IChat, userInput?: string): Promise<boolean> => {
    const isShowed = chat?.messages.filter(i => i.type === MessageTypeEnum.RewardAchievement).length
    if (isShowed) {
      if (!chat?.rewards?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Kindly choose the reward or rewards that you'd like to incorporate into your game.`,
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
        return false
      }

      if (!chat?.achievements?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Kindly choose the achievements or achievements that you'd like to incorporate into your game.`,
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
        return false
      }
    } else {
      // addMessage({
      //   id: uuidv4(),
      //   createdOn: Date.now(),
      //   text: `Okay, We.`,
      //   ai: true,
      //   type: MessageTypeEnum.AI_MANUAL,
      // })
      await generatedAI(GptPromptEnum.RewardAchievementPrompt, chat, chat.userKeywords || '')
      return false
    }
    return true
  }

  const processCreateFinish = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (chat?.isCreateFinished) return true

    if (!userInput) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Having already made selections for Collections, Assets, properties, and attributes, are you now inclined to forge game objects? Kindly confirm your intent.`,
        ai: true,
        type: MessageTypeEnum.CreateFinishQuestion,
      })
      return false
    }

    //todo process if last answer is yes, to create objects
    const lastMessage = chat.messages[chat.messages.length - 1]
    if (lastMessage.type === MessageTypeEnum.CreateFinishQuestion && userInput !== undefined) {
      //todo replace simulation of ChatGPT

      // const isConfirmed = await questionConfirmAI(lastMessage.text, userInput)
      const isConfirmed = await simulateConfirmAI(lastMessage.text, userInput)
      if (isConfirmed) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Great! We will generate game objects for you.`,
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })

        //todo mirian save game objects
        console.log('save game objects', chat)

        console.log(JSON.stringify(chat))

        try {
          const { game, collections } = await createGameFromChatService(chat)
          console.log('saved data', game)

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `${game.name} game created.`,
            ai: true,
            type: MessageTypeEnum.AI_MANUAL,
          })

          const collectionNames = collections
            .map(collection => collection.name)
            .join(', ')
            .trim()

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `Creation breathes life to the ${collectionNames} collections.`,
            ai: true,
            type: MessageTypeEnum.AI_MANUAL,
          })

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `The art of creation unfolds: assets, properties and attributes.`,
            ai: true,
            type: MessageTypeEnum.AI_MANUAL,
          })

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `Embark on triumph and unlock rewards and achievements.`,
            ai: true,
            type: MessageTypeEnum.AI_MANUAL,
          })

          const gameLink = `/game/${game.id}/general` //todo put game link

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `Enter the gateway to your game: [${chat.name}?](${gameLink}), behold the wonders!`,
            ai: true,
            type: MessageTypeEnum.AI_MANUAL,
          })

          setIsCreateFinished(true)

          //todo mirian generate game objects

          console.log('generate game objects', chat)

          return true
        } catch (error) {
          if (error instanceof Error) {
            addMessage({
              id: uuidv4(),
              createdOn: Date.now(),
              text: `Failed to create objects. ${error.message}`,
              ai: true,
              type: MessageTypeEnum.AI_MANUAL,
            })
          }

          return false
        }
      } else {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Okay, you can do game objects later.`,
          ai: true,
          type: MessageTypeEnum.AI_MANUAL,
        })
        return false
      }
    }
    return true
  }

  const processReport = async (chat: IChat, userInput?: string): Promise<boolean> => {
    // const lastMessage = chat.messages[chat.messages.length - 1]

    // if (
    //   lastMessage &&
    //   lastMessage.type === MessageTypeEnum.SelectGameForReport &&
    //   lastMessage.report?.gameId
    // ) {
    //   await generatedAI(GptPromptEnum.ReportPrompt, chat, chat.userKeywords || '')
    //   return true
    // }

    if (!userInput) {
      // addMessage({
      //   id: uuidv4(),
      //   createdOn: Date.now(),
      //   text: `Compose any insights you'd like to report or visualizations you'd like to create for your game`,
      //   ai: true,
      //   type: MessageTypeEnum.AI_MANUAL,
      // })

      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Provide game name you would like to report on.`,
        ai: true,
        type: MessageTypeEnum.AI_MANUAL,
      })

      // addMessage({
      //   id: uuidv4(),
      //   createdOn: Date.now(),
      //   text: `Select game you would like to report on.`,
      //   ai: true,
      //   type: MessageTypeEnum.SelectGameForReport,
      // })

      return false
    }

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: userInput,
      ai: false,
      type: MessageTypeEnum.AI_MANUAL,
    })

    await generatedAI(GptPromptEnum.ReportPrompt, chat, chat.userKeywords || '')
    return true
  }

  const processGameMedia = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameIdea || !chat?.name) return false

    if (chat.medias && chat.medias.length > 0) return true

    // if (chat.medias && chat.medias.length > 0) return true

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Let generate cover image options for your game.`,
      ai: true,
      type: MessageTypeEnum.AI_MANUAL,
    })

    const generated = await generateGameMediasAI(chat.name, chat?.gameIdea.name || '')

    // debugger

    if (!generated) return false

    const { id, media } = generated

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Here are generated media options for your game.`,
      ai: true,
      type: MessageTypeEnum.GameMedias,
      // medias: [imageUrl], // todo
      media: {
        current: {
          url: media,
          type: 'collage',
        },
        collage: {
          id,
          url: media,
        },
      },
    })

    return false
  }

  const processCollectionsMedia = async (chat: IChat, userInput?: string): Promise<boolean> => {
    return true
  }

  const processAssetsMedias = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.collections) return false

    if (chat.isAssetMediasGenerated) return true

    let messageId: string
    const pr = chat.collections.map(async collection => {
      const { assets } = collection
      const { name, gameIdea } = chat

      if (!assets || assets?.length === 0) return false

      // if()

      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Generate stunning media assets for your collection.`,
        ai: true,
        type: MessageTypeEnum.AI_MANUAL,
      })

      // const assetsUrls = [
      //   {
      //     id: '0a0d2052-ebcb-45b8-ab98-6c95c23e3c92',
      //     url: 'https://l3-data-dev.s3.amazonaws.com/account_ebd02d5f-1fcc-495e-92a4-84f79095307e/chat/999dbbe8-b4b3-43fe-a3c2-5718d01c100e.png',
      //   },
      //   {
      //     id: '0a0d2052-ebcb-45b8-ab98-6c95c23e3c92',
      //     url: 'https://l3-data-dev.s3.amazonaws.com/account_ebd02d5f-1fcc-495e-92a4-84f79095307e/chat/999dbbe8-b4b3-43fe-a3c2-5718d01c100e.png',
      //   },
      //   {
      //     id: '0a0d2052-ebcb-45b8-ab98-6c95c23e3c92',
      //     url: 'https://l3-data-dev.s3.amazonaws.com/account_ebd02d5f-1fcc-495e-92a4-84f79095307e/chat/999dbbe8-b4b3-43fe-a3c2-5718d01c100e.png',
      //   },
      //   {
      //     id: '0a0d2052-ebcb-45b8-ab98-6c95c23e3c92',
      //     url: 'https://l3-data-dev.s3.amazonaws.com/account_ebd02d5f-1fcc-495e-92a4-84f79095307e/chat/999dbbe8-b4b3-43fe-a3c2-5718d01c100e.png',
      //   },
      //   {
      //     id: '0a0d2052-ebcb-45b8-ab98-6c95c23e3c92',
      //     url: 'https://l3-data-dev.s3.amazonaws.com/account_ebd02d5f-1fcc-495e-92a4-84f79095307e/chat/999dbbe8-b4b3-43fe-a3c2-5718d01c100e.png',
      //   },
      // ]

      const assetsUrls = await generateAssetsMediasAI(
        assets,
        name,
        gameIdea?.description || 'Simple Idea',
        1,
      )

      const newAssets = assets.map(asset => {
        // const { id, url } = assetsUrls[0]
        const { id, url } = assetsUrls[asset.id]

        asset.media = {
          current: {
            url,
            type: 'collage',
          },
          collage: {
            id,
            url,
          },
        }

        // asset.medias = [
        //   {
        //     id: uuidv4(),
        //     url: url,
        //     is_main: true,
        //     format: '',
        //   },
        // ]

        return asset
      })

      // debugger

      if (messageId) {
        updateMessageCollection(messageId, {
          ...collection,
          assets: newAssets,
        })
      } else {
        messageId = uuidv4()
        updateMessageCollection(messageId, {
          ...collection,
          assets: newAssets,
        })
        addMessage({
          id: messageId,
          createdOn: Date.now(),
          text: `Here are generated medias for your assets.`,
          ai: true,
          type: MessageTypeEnum.AssetsMedias,
          collections: chat.collections,
        })
      }
    })

    await Promise.all(pr)

    setIsAssetMediasGenerated(true)

    return false
  }

  const processMedia = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!userInput) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Describe an image you would like to generate.`,
        ai: true,
        type: MessageTypeEnum.AI_MANUAL,
      })

      return false
    }

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: userInput,
      ai: false,
      type: MessageTypeEnum.AI_MANUAL,
    })

    const { id, media: url } = await generateMediaAi(userInput)

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Here is your generated image.`,
      ai: true,
      type: MessageTypeEnum.Media,
      media: {
        current: {
          url,
          type: 'collage',
        },
        collage: {
          id,
          url,
        },
      },
    })

    return true
  }

  const processSteps = async (chat: IChat, userInput?: string) => {
    if (apiVersion === ApiVersionEnum.CreateV1) {
      if (!(await processCategory(chat, userInput))) return

      if (!(await processGameIdea(chat, userInput))) return

      if (!(await processGameMedia(chat, userInput))) return

      if (!(await processGameplay(chat, userInput))) return

      if (!(await processGameMedia(chat, userInput))) return

      if (!(await processCollectionsMedia(chat, userInput))) return

      if (!(await processCollections(chat, userInput))) return

      if (!(await processAssetsMedias(chat, userInput))) return

      if (!(await processRewardsAchievements(chat, userInput))) return

      if (!(await processCreateFinish(chat, userInput))) return
    } else if (apiVersion === ApiVersionEnum.ReportV1) {
      if (!(await processReport(chat, userInput))) return
    } else if (apiVersion === ApiVersionEnum.MediaV1) {
      if (!(await processMedia(chat, userInput))) return
    }

    // addMessage({
    //   id: uuidv4(),
    //   createdOn: Date.now(),
    //   text: 'We already generate all your game assets for you, Do you confirm to create game objects L3vels system?',
    //   ai: true,
    //   type: MessageTypeEnum.CreateFinishQuestion,
    // })

    //save record in database here Mirian

    return true
  }

  const processRegenerate = async (chat: IChat, userInput?: string) => {
    chat.messages = chat.messages.filter(
      i =>
        i.type !== MessageTypeEnum.AI_MANUAL &&
        i.type !== MessageTypeEnum.User &&
        i.type !== MessageTypeEnum.Report,
    )
    const message = chat.messages[chat.messages.length - 1]
    switch (message.type) {
      case MessageTypeEnum.GameIdea:
        if (!chat?.gameCategory) {
          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: 'Choose game a game category first.',
            ai: true,
            type: MessageTypeEnum.AI_MANUAL,
          })
          break
        }
        await generatedAI(GptPromptEnum.GameIdeaPrompt, chat, message.text, true, message)
        break
      case MessageTypeEnum.Gameplay:
        await generatedAI(GptPromptEnum.GameplayPrompt, chat, message.text, true, message)
        break
      case MessageTypeEnum.Collection:
        await generatedAI(
          GptPromptEnum.CollectionAssetPrompt,
          chat,
          chat.userKeywords || '',
          true,
          message,
        )
        break
      default:
        // addMessage({
        //   id: 2,
        //   createdOn: Date.now(),
        //   text: `You can not call regenerate action on that stage.`,
        //   ai: true,
        //   type: MessageTypeEnum.AI_MANUAL,
        // })
        break
    }
  }

  return {
    processSteps,
    processRegenerate,
  }
}

export { useProcessSteps }
