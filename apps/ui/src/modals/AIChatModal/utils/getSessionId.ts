const getSessionId = ({
  user,
  account,
  isPrivateChat,
}: {
  user: any
  account: any
  isPrivateChat: boolean
}) => {
  if (isPrivateChat) {
    // If chat is private
    return `${account.id}-${user.id}`
  } else {
    // If chat is team
    return account.id
  }
}

export default getSessionId
