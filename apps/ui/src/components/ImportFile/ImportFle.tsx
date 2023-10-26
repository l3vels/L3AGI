import React from 'react'
import styled from 'styled-components'

// import FileUploadField from 'atoms/FileUploadField'

import ReviewImport, { StyledButtonContainer } from './ReviewImport'

import useImportFile from './useImportFile'
import Button from '@l3-lib/ui-core/dist/Button'
import UploadButton from 'components/UploadButton'

const ImportFile = () => {
  const { handleFileChange, step, parsedCsvData, setStep, handleDownloadTemplate } = useImportFile()

  function renderTabs(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        return (
          <StyledButtonContainer>
            <Button onClick={handleDownloadTemplate}>Download template</Button>
            <br />
            <UploadButton onChange={handleFileChange} isLoading={false} />
          </StyledButtonContainer>
        )

      case 1:
        return (
          <>
            <ReviewImport data={parsedCsvData} setStep={setStep} />
          </>
        )

      default:
        return <>Error..!</>
    }
  }

  return (
    <>
      <StyledFormSection>{renderTabs(step)}</StyledFormSection>
    </>
  )
}

export default ImportFile

export const StyledFormSection = styled.div<{ columns?: string }>`
  width: 100%;
  height: 100%;

  /* max-width: 800px; */
`
