import { ChatMessageVersionEnum } from 'services'

export const useAiMessage = (version: ChatMessageVersionEnum) => {
  const VERSION_TO_AGENT_NAME = {
    [ChatMessageVersionEnum.ChatConversational]: 'L3-GPT',
    [ChatMessageVersionEnum.PlanAndExecuteWithTools]: 'L3-Planner',
    [ChatMessageVersionEnum.AUTHORITARIAN_SPEAKER]: 'L3-Authoritarian-Speaker',
    [ChatMessageVersionEnum.AGENT_DEBATES]: 'L3-Agent-Debates',
  }

  const name = VERSION_TO_AGENT_NAME[version]
  return {
    name,
  }
}
