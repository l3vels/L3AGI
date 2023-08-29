import { INITIAL_STEPS } from '../constants'
import { ChatStepEnum, IChat, StepStatusEnum } from '../types'

const useStepStatus = () => {
  const updateStepStatus = (chat: IChat) => {
    const steps = INITIAL_STEPS
    if (!chat.gameCategory || !chat.gameIdea) {
      steps[ChatStepEnum.CreateGameConcept] = StepStatusEnum.InProgress
    } else {
      steps[ChatStepEnum.CreateGameConcept] = StepStatusEnum.Completed
    }

    if (!chat.gameplay) {
      steps[ChatStepEnum.GenerateGameplay] = StepStatusEnum.Pending

      if (steps[ChatStepEnum.CreateGameConcept] === StepStatusEnum.Completed) {
        steps[ChatStepEnum.GenerateGameplay] = StepStatusEnum.InProgress
      }
    } else {
      steps[ChatStepEnum.GenerateGameplay] = StepStatusEnum.Completed
    }

    if (!chat.collections?.length) {
      steps[ChatStepEnum.GenerateCollections] = StepStatusEnum.Pending
      steps[ChatStepEnum.GenerateAssets] = StepStatusEnum.Pending

      if (steps[ChatStepEnum.GenerateGameplay] === StepStatusEnum.Completed) {
        steps[ChatStepEnum.GenerateCollections] = StepStatusEnum.InProgress
        steps[ChatStepEnum.GenerateAssets] = StepStatusEnum.InProgress
      }
    } else {
      steps[ChatStepEnum.GenerateCollections] = StepStatusEnum.Completed

      if (!chat.collections[0].assets?.length) {
        steps[ChatStepEnum.GenerateAssets] = StepStatusEnum.Pending
      } else {
        steps[ChatStepEnum.GenerateAssets] = StepStatusEnum.Completed
      }
    }

    if (!chat.rewards?.length) {
      steps[ChatStepEnum.GenerateAchievementsAndRewards] = StepStatusEnum.Pending

      if (steps[ChatStepEnum.GenerateCollections] === StepStatusEnum.Completed) {
        steps[ChatStepEnum.GenerateAchievementsAndRewards] = StepStatusEnum.InProgress
      }
    } else {
      steps[ChatStepEnum.GenerateAchievementsAndRewards] = StepStatusEnum.Completed
    }

    if (steps[ChatStepEnum.GenerateAchievementsAndRewards] === StepStatusEnum.Completed) {
      steps[ChatStepEnum.FinishAndCreate] = StepStatusEnum.InProgress
    }

    if (chat.isCreateFinished) {
      steps[ChatStepEnum.FinishAndCreate] = StepStatusEnum.Completed
    }

    if (chat.isAssetMediasGenerated) {
      steps[ChatStepEnum.AssetsMedias] = StepStatusEnum.Completed
    }

    // if (steps[ChatStepEnum.FinishAndCreate] === StepStatusEnum.Completed) {
    //   steps[ChatStepEnum.FinishAndCreate] = StepStatusEnum.InProgress
    // }

    return {
      steps: steps,
    }
  }
  return {
    updateStepStatus,
  }
}

export { useStepStatus }
