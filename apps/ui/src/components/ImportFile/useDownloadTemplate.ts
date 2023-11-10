export const useDownloadTemplate = ({ templateData }: { templateData: any }) => {
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

  const handleDownloadTemplateCSV = () => {
    const csvRows = []

    // Headers
    const headers = Object.keys(templateData[0])
    csvRows.push(headers.join(','))

    // Values
    templateData.forEach((row: any) => {
      const values = headers.map(header => {
        return `"${row[header] || ''}"`
      })
      csvRows.push(values.join(','))
    })

    // Join rows
    const csvContent = csvRows.join('\n')
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`)

    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'templateData.csv')
    document.body.appendChild(link) // Required for Firefox
    link.click()
  }

  return { handleDownloadTemplate, handleDownloadTemplateCSV }
}
