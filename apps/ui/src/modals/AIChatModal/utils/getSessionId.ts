import { Nullable } from 'types'

const getSessionId = ({
  user,
  account,
  agentId,
  teamId,
  chatId,
}: {
  user: any
  account: any
  agentId: Nullable<string>
  teamId: Nullable<string>
  chatId: Nullable<string>
}) => {
  if (chatId) return `${chatId}-${chatId}`

  if (agentId) return `${agentId}-${user.id}`
  if (teamId) return `${teamId}-${user.id}`
  return `${account?.id}-${user?.id}`
}

export default getSessionId
