import React from "react"

const regions = [
    "Any",
    "CA-MTL-1",
    "CA-MTL-2",
    "CA-MTL-3",
    "EU-NL-1",
    "EU-RO-1",
    "EUR-IS-1",
    "EUR-IS-2",
    "SEA-SG-1",
    "US-CA-1",
    "US-GA-1",
    "US-KS-2",
    "US-OR-1",
    "US-TX-3"
  ]

  const cudaVersions = [
    "11.8",
    "12.0",
    "12.1",
    "12.2",
    "12.3",
    "12.4"
  ]

const useFilter = () => {
    const [filter, setFilter] = React.useState({
        cloud: 'Secure Cloud',
        region: 'Any',
        cudaVersion: 'Any'
    })

    return {
        filter,
        setFilter,
        regions,
        cudaVersions
    }
}


export default useFilter