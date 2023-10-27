import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// import FileUploadField from 'atoms/FileUploadField'

import ReviewImport, { StyledButtonContainer } from './ReviewImport'

import useImportFile from './useImportFile'
import Button from '@l3-lib/ui-core/dist/Button'
import UploadButton from 'components/UploadButton'
import { ButtonTertiary } from 'components/Button/Button'
import { t } from 'i18next'
import { useDownloadTemplate } from './useDownloadTemplate'

const ImportFile = ({ setFieldValue, value = '' }: { setFieldValue: any; value?: string }) => {
  const {
    // handleFileChange,
    step,
    parsedData,
    setStep,
    handleUploadJson,
    handleConvertData,
  } = useImportFile({
    setFieldValue: setFieldValue,
  })

  const { handleDownloadTemplate } = useDownloadTemplate()

  useEffect(() => {
    if (value.length > 0) {
      // Replace 'fileUrl' with the actual URL of the file you want to read.
      const fileUrl = value

      fetch(fileUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
          }
          return response.text() // or response.json() for JSON files, response.blob() for binary files, etc.
        })
        .then(data => {
          handleConvertData(data) // Update the state with the file content
        })
        .catch(error => {
          console.error('Error fetching file:', error)
        })
    }
  }, [value])

  function renderTabs(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        return (
          <StyledButtonContainer>
            <ButtonTertiary onClick={handleDownloadTemplate} size={Button.sizes.SMALL}>
              {t('download-template')}
            </ButtonTertiary>

            {/* <UploadButton onChange={handleFileChange} isLoading={false} label={t('upload-csv')} /> */}
            <UploadButton onChange={handleUploadJson} isLoading={false} label={t('upload-json')} />
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
