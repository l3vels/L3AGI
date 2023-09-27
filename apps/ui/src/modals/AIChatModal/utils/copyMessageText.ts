export const copyMessageText = (text: string) => {
  // Remove Markdown links
  const textWithoutLinks = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

  // Remove other Markdown formatting (e.g., *bold*, _italic_)
  const plainText = textWithoutLinks.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')

  navigator.clipboard.writeText(plainText)
}
