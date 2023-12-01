const getDateTimeFromDate = (date: Date) => {
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(
    2,
    '0',
  )}:${String(date.getMinutes()).padStart(2, '0')}:00`

  return formattedDate
}

const getDateTime = (dateString: string | undefined | null) => {
  if (!dateString) return

  const date = new Date(dateString)
  return getDateTimeFromDate(date)
}

export { getDateTime, getDateTimeFromDate }
