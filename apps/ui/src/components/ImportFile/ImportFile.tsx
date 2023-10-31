import { useEffect } from 'react'
import styled from 'styled-components'

import ImportFileTable from './ImportFileTable'

import useImportFile from './useImportFile'

import Button from '@l3-lib/ui-core/dist/Button'
import UploadButton from 'components/UploadButton'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import { useDownloadTemplate } from './useDownloadTemplate'

import { t } from 'i18next'

const ImportFile = ({ setFieldValue, value = '' }: { setFieldValue: any; value?: string }) => {
  const {
    parsedData,
    setParsedData,
    handleFileFormat,
    handleConvertJson,
    handleConvertCSVtoJSON,
    fileIsLoading,
  } = useImportFile({
    setFieldValue: setFieldValue,
  })

  const { handleDownloadTemplate, handleDownloadTemplateCSV } = useDownloadTemplate()

  useEffect(() => {
    if (value.length > 0) {
      const fileUrl = value

      fetch(fileUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
          }
          return response.text()
        })
        .then(data => {
          if (fileUrl.endsWith('.json')) {
            const { data: convertedData } = handleConvertJson(data)
            setParsedData(convertedData)
          } else if (fileUrl.endsWith('.csv')) {
            const { data: convertedData } = handleConvertCSVtoJSON(data)
            setParsedData(convertedData)
          }
        })
        .catch(error => {
          console.error('Error fetching file:', error)
        })
    }
  }, [value])

  return (
    <>
      <StyledFormSection>
        <StyledButtonContainer>
          <ButtonTertiary onClick={handleDownloadTemplate} size={Button.sizes.SMALL}>
            {t('download-template json')}
          </ButtonTertiary>
          <ButtonTertiary onClick={handleDownloadTemplateCSV} size={Button.sizes.SMALL}>
            {t('download-template csv')}
          </ButtonTertiary>

          {parsedData?.length === 0 && (
            <UploadButton
              onChange={handleFileFormat}
              isLoading={fileIsLoading}
              label={t('upload-file')}
            />
          )}
          {parsedData?.length > 0 && (
            <ButtonPrimary
              onClick={() => {
                setParsedData([])
                setFieldValue('fine_tuning_file_url', '')
              }}
              size={Button.sizes.SMALL}
            >
              {t('start-over')}
            </ButtonPrimary>
          )}
        </StyledButtonContainer>
        {parsedData?.length > 0 && <ImportFileTable data={parsedData} />}
      </StyledFormSection>
    </>
  )
}

export default ImportFile

export const StyledFormSection = styled.div<{ columns?: string }>`
  width: 100%;
  height: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
