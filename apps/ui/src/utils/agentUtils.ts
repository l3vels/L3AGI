export const isVoiceAgent = (agentType: string | undefined) => {
  if (!agentType) return false
  return agentType === 'inbound' || agentType === 'outbound'
}

const AGENT_TYPE_TO_TEXT: { [k: string]: string } = {
  text: 'Chat',
  inbound: 'Inbound',
  outbound: 'Outbound',
}

export const getAgentTypeText = (agentType: string | undefined) => {
  if (!agentType) return AGENT_TYPE_TO_TEXT['text']
  return AGENT_TYPE_TO_TEXT[agentType]
}
