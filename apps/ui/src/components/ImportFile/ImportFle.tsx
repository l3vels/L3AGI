import React from 'react'
import styled from 'styled-components'

// import FileUploadField from 'atoms/FileUploadField'

import ReviewImport, { StyledButtonContainer } from './ReviewImport'

import useImportFile from './useImportFile'
import Button from '@l3-lib/ui-core/dist/Button'
import UploadButton from 'components/UploadButton'
import { ButtonTertiary } from 'components/Button/Button'

const ImportFile = ({ setFieldValue }: { setFieldValue: any }) => {
  const { handleFileChange, step, parsedData, setStep, handleDownloadTemplate, handleUploadJson } =
    useImportFile({
      setFieldValue: setFieldValue,
    })

  function renderTabs(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        return (
          <StyledButtonContainer>
            <ButtonTertiary onClick={handleDownloadTemplate} size={Button.sizes.SMALL}>
              Download template
            </ButtonTertiary>

            <UploadButton onChange={handleFileChange} isLoading={false} label={'Upload CSV'} />
            <UploadButton onChange={handleUploadJson} isLoading={false} label={'Upload JSON'} />
          </StyledButtonContainer>
        )

      case 1:
        return (
          <>
            <ReviewImport data={parsedData} setStep={setStep} />
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
