import { useEffect } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import UploadedFile from 'components/UploadedFile'

import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useDatasourceForm } from './useDatasourceForm'
import UploadButton from './components/UploadButton'

import DataLoaderCard from './components/DataLoaderCard'
import FormikTextField from 'components/TextFieldFormik'

type DatasourceFormProps = {
  formik: any
  isLoading?: boolean
}

const DatasourceForm = ({ formik, isLoading }: DatasourceFormProps) => {
  const { dataLoaderOptions, pickedLoaderFields, handleUploadFile, fileLoading } =
    useDatasourceForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const { datasource_source_type, config_value, datasource_description, configs } = values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('datasource_description', value)
  }

  useEffect(() => {
    if (datasource_source_type?.length > 0 && !isLoading && fields) {
      setFieldValue('config_key', pickedLoaderFields?.fields[0]?.key)
      setFieldValue('config_key_type', pickedLoaderFields?.fields[0]?.type)
    }
  }, [datasource_source_type])

  return (
    <StyledFormContainer>
      <StyledInputWrapper>
        <FormikTextField name='datasource_name' placeholder='Name' label='Name' />

        <StyledTextareaWrapper>
          <Typography
            value='Description'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Textarea
            hint=''
            placeholder='Description'
            name='datasource_description'
            value={datasource_description}
            onChange={onDescriptionChange}
          />
        </StyledTextareaWrapper>

        <StyledSourceTypeWrapper>
          <Typography
            value='Source Type'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <StyledCardWrapper>
            {dataLoaderOptions?.map((option: any, index: number) => {
              return (
                <DataLoaderCard
                  isActive={option.value === datasource_source_type}
                  key={index}
                  title={option.label}
                  onClick={() => {
                    setFieldValue('datasource_source_type', option.value)
                    setFieldValue('config_value', '')
                  }}
                />
              )
            })}
          </StyledCardWrapper>

          {category?.length > 0 && (
            <>
              {category === 'File' && (
                <StyledUploadFileWrapper>
                  <UploadButton
                    onChange={handleUploadFile}
                    isLoading={fileLoading}
                    hasValue={config_value}
                  />

                  {config_value && (
                    <UploadedFile
                      onClick={() => setFieldValue('config_value', null)}
                      name={'file'}
                    />
                  )}
                </StyledUploadFileWrapper>
              )}

              {category === 'Database' &&
                fields.map((field: any) => (
                  <FormikTextField
                    key={field.key}
                    name={`configs.${field.key}.value`}
                    value={configs[field.key]?.value || ''}
                    placeholder={field.label}
                    label={field.label}
                  />
                ))}

              {category === 'Text' && (
                <StyledTextareaWrapper>
                  <Textarea
                    hint=''
                    placeholder='Text'
                    name='config_value'
                    value={config_value}
                    onChange={(text: string) => {
                      formik.setFieldValue('config_value', text)
                    }}
                  />
                </StyledTextareaWrapper>
              )}

              <>{category === 'Social' && <StyledText>Coming Soon</StyledText>}</>
              <>{category === 'Web Page' && <StyledText>Coming Soon</StyledText>}</>
              <>{category === 'Application' && <StyledText>Coming Soon</StyledText>}</>
            </>
          )}
        </StyledSourceTypeWrapper>
      </StyledInputWrapper>
    </StyledFormContainer>
  )
}

export default DatasourceForm

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin-top: 50px;
  gap: 25px;

  width: 100%;
  max-width: 800px;
  /* max-width: 600px; */
  /* margin: auto; */
  height: calc(100% - 100px);
  /* max-height: 800px; */
`
const StyledSourceTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledCardWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 12px;
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`
const StyledText = styled.span`
  color: #fff;
`
const StyledUploadFileWrapper = styled.div`
  display: flex;
  gap: 10px;
`
