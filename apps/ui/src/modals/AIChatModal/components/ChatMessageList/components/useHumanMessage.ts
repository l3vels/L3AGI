import { AuthContext } from 'contexts'
import { useContext, useMemo } from 'react'
import { useAssignedUserListService } from 'services'

type useHumanMessageProps = {
  userId: string
  messageText: string
}

const getAuthorName = (userId: string, assignedUserList: any, user: any) => {
  if (!user) return ''

  if (userId === user.id) {
    return user.name
  }

  const assignedUser = assignedUserList?.find((user: any) => user.assigned_user_id === userId)
  const creatorUser = assignedUserList?.find((user: any) => user.creator_user_id === userId)

  if (assignedUser) {
    return assignedUser.assigned_user_first_name
  }

  if (creatorUser) {
    return creatorUser.creator_user
  }

  return user.name
}

export const useHumanMessage = ({ userId, messageText }: useHumanMessageProps) => {
  const { data: assignedUserList } = useAssignedUserListService()
  const { user } = useContext(AuthContext)

  let authorName = ''

  authorName = useMemo(
    () => getAuthorName(userId, assignedUserList, user),
    [userId, assignedUserList, user],
  )

  //code below checks if the message has an attached file to it
  const fileUrlRegex = /https.*\.(csv|pdf|doc|txt|xlsx|xls)/ // Regex pattern to match "https" followed by any characters until ".(csv|pdf|doc|txt|xlsx|xls)"
  const fileUrlMatch = messageText.match(fileUrlRegex)

  let fileUrl = ''
  let fileName = ''
  let messageWithoutUrl = messageText
  // let mentionString = ''

  if (fileUrlMatch) {
    fileUrl = fileUrlMatch[0]
    fileName = messageText.substring(0, fileUrlMatch.index)
    messageWithoutUrl = messageText.replace(fileUrl, '').replace(fileName, '')
  }

  const wordArray = messageWithoutUrl.split(/\s+(?![^[]*])/)

  const handleFileClick = () => {
    window.location.href = fileUrl
  }

  return {
    wordArray,
    handleFileClick,
    authorName,
    fileUrlMatch,
    fileName,
  }
}
