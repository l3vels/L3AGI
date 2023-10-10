export const textSlicer = (text: string, maxLength: number) => {
  let shortText = text.slice(0, maxLength)

  // Check if the last character is a space and remove it if it is
  if (shortText.charAt(shortText.length - 1) === ' ') {
    shortText = shortText.slice(0, -1)
  }

  // Add "..." if the original text is longer than maxLength
  if (text.length > maxLength) {
    shortText += '...'
  }

  return {
    shortText,
  }
}
