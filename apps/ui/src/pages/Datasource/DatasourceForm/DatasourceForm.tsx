import { useEffect } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import UploadedFile from 'components/UploadedFile'

import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useDatasourceForm } from './useDatasourceForm'
import UploadButton from './components/UploadButton'

import DataLoaderCard from './components/DataLoaderCard'
import FormikTextField from 'components/TextFieldFormik'
import { DATA_LOADER_IMAGES } from '../constants'
import { useDatasourceSqlTables } from 'services/datasource/useDatasourceSqlTables'
import DatasourceSqlTables from './components/DatasourceSqlTables/DatasourceSqlTables'
import { useParams } from 'react-router-dom'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import DataSourceDropdown from './components/DataSourceDropdown'

type DatasourceFormProps = {
  formik: any
  isLoading?: boolean
  isEdit?: boolean
}

const DatasourceForm = ({ formik, isLoading, isEdit = false }: DatasourceFormProps) => {
  const { dataLoaders, pickedLoaderFields, handleUploadFile, fileLoading } =
    useDatasourceForm(formik)

  const { datasourceId } = useParams()

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const {
    datasource_source_type,
    config_value,
    datasource_description,
    configs,
    index_type,
    response_mode,
    files,
  } = values

  const { host, port, user, pass, name, tables } = values.configs

  const { data, fetchSqlTables, loading } = useDatasourceSqlTables({
    id: datasourceId,
    host: host?.value,
    port: port?.value && Number(port?.value),
    user: user?.value,
    password: pass?.value,
    name: name?.value,
    source_type: datasource_source_type,
  })

  const isDatabase = datasource_source_type === 'Postgres' || datasource_source_type === 'MySQL'

  useEffect(() => {
    if (isEdit && isDatabase) {
      fetchSqlTables()
    }
  }, [isEdit, isDatabase])

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
            {dataLoaders?.map((dataLoader: any) => {
              const filteredLogos = DATA_LOADER_IMAGES.filter(
                (loaderImages: any) => loaderImages.sourceName === dataLoader.source_type,
              )

              const imageSrc = filteredLogos?.[0]?.imageSrc || ''

              return (
                <DataLoaderCard
                  iconSrc={imageSrc}
                  isSelected={dataLoader.source_type === datasource_source_type}
                  isActive={dataLoader.is_active} // coming soon feature
                  key={dataLoader.name}
                  title={dataLoader.source_type}
                  onClick={() => {
                    setFieldValue('datasource_source_type', dataLoader.source_type)
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
                  <UploadButton onChange={handleUploadFile} isLoading={fileLoading} />

                  <StyledUploadedFiles>
                    {files.length > 0 &&
                      files.map((file: any) => (
                        <UploadedFile
                          key={file.url}
                          id={file.url}
                          hasDeleteIcon
                          onClick={id => {
                            const filteredFiles = files.filter((file: any) => file.url !== id)
                            setFieldValue('configs.files', filteredFiles)
                          }}
                          name={file.name}
                        />
                      ))}
                  </StyledUploadedFiles>

                  <DataSourceDropdown
                    onHelpClick={() =>
                      window.open(import.meta.env.REACT_APP_INDEX_TYPES_LINK, '_blank')
                    }
                    label={'Index Type'}
                    fieldName={'index_type'}
                    fieldValue={index_type}
                    setFieldValue={setFieldValue}
                    options={[
                      { label: 'Summarize Index', value: 'summary' },
                      { label: 'Vector Store Index', value: 'vector_store' },
                      { label: 'Tree Index', value: 'tree' },
                    ]}
                  />

                  <DataSourceDropdown
                    onHelpClick={() =>
                      window.open(import.meta.env.REACT_APP_RESPONSE_MODES_LINK, '_blank')
                    }
                    label={'Response Mode'}
                    fieldName={'response_mode'}
                    fieldValue={response_mode}
                    setFieldValue={setFieldValue}
                    options={[
                      { label: 'Tree Summarize', value: 'tree_summarize' },
                      { label: 'Refine', value: 'refine' },
                      { label: 'Simple Summarize', value: 'simple_summarize' },
                    ]}
                  />
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

        {isDatabase && (
          <>
            {!isEdit && (
              <div>
                <Button
                  onClick={() => {
                    fetchSqlTables()
                  }}
                  disabled={loading || data}
                  size={Button.sizes.SMALL}
                >
                  {loading ? <Loader size={32} /> : 'Connect'}
                </Button>
              </div>
            )}

            {data && (
              <DatasourceSqlTables
                data={data}
                tables={tables && JSON.parse(tables.value)}
                onTablesSelected={(selectedTables: string[]) => {
                  formik.setFieldValue('configs.tables', {
                    ...(tables || {}),
                    key: 'tables',
                    key_type: 'string',
                    value: JSON.stringify(selectedTables),
                    is_secret: false,
                    is_required: true,
                  })
                }}
              />
            )}
          </>
        )}
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

  gap: 25px;

  width: 100%;
  max-width: 800px;
  /* max-width: 600px; */
  /* margin: auto; */
  height: calc(100% - 100px);
  /* max-height: 800px; */

  padding: 0 20px;
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
  gap: 20px;
  flex-direction: column;
`

const StyledUploadedFiles = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
