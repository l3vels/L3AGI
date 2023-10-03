import { Nullable } from 'types'

const getSessionId = ({
  user,
  account,
  isPrivateChat,
  agentId,
  teamId,
  chatId,
}: {
  user: any
  account: any
  isPrivateChat: boolean
  agentId: Nullable<string>
  teamId: Nullable<string>
  chatId: Nullable<string>
}) => {
  //todo need remove isPrivateChat validation
  if (isPrivateChat) {
    // If chat is private
    if (chatId) return `${chatId}-${chatId}`

    if (agentId) return `${agentId}-${user.id}`
    if (teamId) return `${teamId}-${user.id}`
    return `${account?.id}-${user?.id}`
  } else {
    // If chat is team
    if (chatId) return `${chatId}-${chatId}`
    if (agentId) return `${agentId}-${agentId}`
    if (teamId) return  `${teamId}-${teamId}`
    return `${account?.id}-${account?.id}`
  }
}

export default getSessionId
