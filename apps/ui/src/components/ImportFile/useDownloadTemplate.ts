import { templateData } from './constants'

export const useDownloadTemplate = () => {
  const handleDownloadTemplate = () => {
    const jsonContent = JSON.stringify(templateData) // Replace 'yourData' with your JSON data

    // Create a Blob (Binary Large Object) from the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json' })

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob)

    // Create a hidden <a> element for downloading
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'templateData.json' // Specify the file name

    // Add the <a> element to the DOM and trigger the click event
    document.body.appendChild(a)
    a.click()

    // Clean up
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return { handleDownloadTemplate }
}
