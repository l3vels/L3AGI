import { Nullable } from 'types'

const getSessionId = ({
  user,
  account,
  isPrivateChat,
  agentId,
  teamId,
  chatId
}: {
  user: any
  account: any
  isPrivateChat: boolean
  agentId: Nullable<string>
  teamId: Nullable<string>
  chatId: Nullable<string>
}) => {
  if (isPrivateChat) {
    // If chat is private

    if (agentId) return `${agentId}-${user.id}`
    if (teamId) return `${teamId}-${user.id}`
    if (chatId) return `${chatId}`
    return `${account?.id}-${user.id}`
  } else {
    // If chat is team

    if (agentId) return agentId
    if (teamId) return teamId
    if (chatId) return `${chatId}`
    return account?.id
  }
}

export default getSessionId
