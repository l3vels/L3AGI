import { useEffect } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import UploadedFile from 'components/UploadedFile'

import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useTeamOfAgentsForm } from './useTeamOfAgentsForm'
import UploadButton from './components/UploadButton'

import DataLoaderCard from './components/DataLoaderCard'
import FormikTextField from 'components/TextFieldFormik'

type TeamOfAgentsFormProps = {
  formik: any
  isLoading?: boolean
}

const TeamOfAgentsForm = ({ formik, isLoading }: TeamOfAgentsFormProps) => {
  const { teamTypes, pickedLoaderFields, handleUploadFile, fileLoading } =
    useTeamOfAgentsForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const { teamOfAgents_team_type, config_value, teamOfAgents_description, configs } = values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('teamOfAgents_description', value)
  }

  useEffect(() => {
    if (teamOfAgents_team_type?.length > 0 && !isLoading && fields) {
      setFieldValue('config_key', pickedLoaderFields?.fields[0]?.key)
      setFieldValue('config_key_type', pickedLoaderFields?.fields[0]?.type)
    }
  }, [teamOfAgents_team_type])

  return (
    <StyledFormContainer>
      <StyledInputWrapper>
        <FormikTextField name='teamOfAgents_name' placeholder='Name' label='Name' />

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
            name='teamOfAgents_description'
            value={teamOfAgents_description}
            onChange={onDescriptionChange}
          />
        </StyledTextareaWrapper>

        <StyledSourceTypeWrapper>
          <Typography
            value='Team Type'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <StyledCardWrapper>
            {teamTypes?.map((dataLoader: any, index: number) => {
              return (
                <DataLoaderCard
                  isSelected={dataLoader.team_type === teamOfAgents_team_type}
                  isActive={dataLoader.is_active} // coming soon feature
                  key={dataLoader.name}
                  title={dataLoader.team_type}
                  onClick={() => {
                    setFieldValue('teamOfAgents_team_type', dataLoader.team_type)
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

export default TeamOfAgentsForm

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
  gap: 10px;
`
