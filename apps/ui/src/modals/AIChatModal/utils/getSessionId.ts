const getSessionId = ({
  gameId,
  user,
  account,
  isPrivateChat,
}: {
  gameId?: string | null
  user: any
  account: any
  isPrivateChat: boolean
}) => {
  if (isPrivateChat) {
    // If chat is private
    return gameId ? `${gameId}-${user.id}` : `${account.id}-${user.id}`
  } else {
    // If chat is team
    return gameId ? gameId : account.id
  }
}

export default getSessionId
