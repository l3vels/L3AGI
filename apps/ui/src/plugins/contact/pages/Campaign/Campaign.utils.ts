export const getDateTimeFromDate = (date: Date) => {
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(
    2,
    '0',
  )}:${String(date.getMinutes()).padStart(2, '0')}`

  return formattedDate
}

export const getDateTime = (dateString: string | undefined | null) => {
  if (!dateString) return

  const dateWithoutTimezone = `${dateString.split('T')[0]}T${
    dateString.split('T')[1].split('+')[0].split('-')[0]
  }`

  const date = new Date(dateWithoutTimezone)
  return getDateTimeFromDate(date)
}
