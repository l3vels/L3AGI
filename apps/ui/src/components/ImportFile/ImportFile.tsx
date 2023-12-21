import { useEffect } from 'react'
import styled from 'styled-components'

import ImportFileTable from './ImportFileTable'

import useImportFile from './useImportFile'

import Button from 'share-ui/components/Button/Button'
import Typography from 'share-ui/components/typography/Typography'

import UploadButton from 'components/UploadButton'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import { useDownloadTemplate } from './useDownloadTemplate'

import { t } from 'i18next'

import TypographySecondary from 'components/Typography/Secondary'
import { StyledMenuButtonsWrapper } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import MenuButton from 'share-ui/components/MenuButton/MenuButton'

const ImportFile = ({
  setFieldValue,
  fieldName,
  value = '',
  templateData,
  columns,
  fileValidationFields,
}: {
  setFieldValue: any
  fieldName: string
  value?: string
  templateData: any
  columns: any
  fileValidationFields: any
}) => {
  const {
    parsedData,
    setParsedData,
    handleFileFormat,
    handleConvertJson,
    handleConvertCSVtoJSON,
    fileIsLoading,
  } = useImportFile({
    setFieldValue: setFieldValue,
    fileValidationFields: fileValidationFields,
    fieldName: fieldName,
  })

  const { handleDownloadTemplate, handleDownloadTemplateCSV } = useDownloadTemplate({
    templateData: templateData,
  })

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
          <MenuButton
            component={() => (
              <TypographySecondary
                value={t('download-template')}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
            )}
            closeDialogOnContentClick={false}
            zIndex={2}
            customWidth={140}
            ariaLabel='Download'
          >
            <StyledMenuButtonsWrapper>
              <ButtonTertiary onClick={handleDownloadTemplate} size={Button.sizes?.SMALL}>
                {t('download-json')}
              </ButtonTertiary>
              <ButtonTertiary onClick={handleDownloadTemplateCSV} size={Button.sizes?.SMALL}>
                {t('download-csv')}
              </ButtonTertiary>
            </StyledMenuButtonsWrapper>
          </MenuButton>

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
                setFieldValue(fieldName, '')
              }}
              size={Button.sizes?.SMALL}
            >
              {t('start-over')}
            </ButtonPrimary>
          )}
        </StyledButtonContainer>
        {parsedData?.length > 0 && <ImportFileTable data={parsedData} columns={columns} />}
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
