import { useEffect } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'

import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useTeamOfAgentsForm } from './useTeamOfAgentsForm'
import UploadButton from './components/UploadButton'
import UploadedFile from 'components/UploadedFile'

import DataLoaderCard from './components/DataLoaderCard'
import FormikTextField from 'components/TextFieldFormik'
import TeamOfAgentsTable from '../TeamOfAgentsTable'
import { teamTypeDocs } from './constants'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import TypographyPrimary from 'components/Typography/Primary'

type TeamOfAgentsFormProps = {
  formik: any
  isLoading?: boolean
}

const TeamOfAgentsForm = ({ formik, isLoading }: TeamOfAgentsFormProps) => {
  const { teamTypes, pickedLoaderFields, handleUploadFile, fileLoading } =
    useTeamOfAgentsForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const { teamOfAgents_team_type, config_value, teamOfAgents_description, configs, is_memory } =
    values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('teamOfAgents_description', value)
  }

  useEffect(() => {
    if (teamOfAgents_team_type?.length > 0 && !isLoading && fields) {
      setFieldValue('config_key', pickedLoaderFields?.fields[0]?.key)
      setFieldValue('config_key_type', pickedLoaderFields?.fields[0]?.type)
    }
  }, [teamOfAgents_team_type])

  const teamType = teamTypes?.find((teamType: any) => teamType.team_type === teamOfAgents_team_type)

  return (
    <StyledFormContainer>
      <StyledInputWrapper>
        <FormikTextField name='teamOfAgents_name' placeholder='Name' label='Name' />

        <StyledTextareaWrapper>
          <TypographyPrimary
            value='Description'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
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
          <TypographyPrimary
            value='Type'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          <StyledCardWrapper>
            {teamTypes?.map((teamType: any) => {
              const docUrl = teamTypeDocs.filter((type: any) => teamType.name === type.name)[0]

              return (
                <DataLoaderCard
                  isSelected={teamType.team_type === teamOfAgents_team_type}
                  isActive={teamType.is_active} // coming soon feature
                  key={teamType.name}
                  title={teamType.name}
                  onClick={() => {
                    setFieldValue('teamOfAgents_team_type', teamType.team_type)
                    setFieldValue('config_value', '')
                  }}
                  onHelpClick={() => openLinkTab(docUrl.link)}
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

        <StyledFields>
          {teamType?.fields.map((field: any) => {
            return (
              <FormikTextField
                key={field.key}
                name={`configs.${field.key}.value`}
                value={configs[field.key]?.value}
                placeholder={field.label}
                label={field.label}
              />
            )
          })}
        </StyledFields>

        <Checkbox
          label='Memory'
          kind='secondary'
          name='is_memory'
          checked={is_memory}
          onChange={() => setFieldValue('is_memory', !is_memory)}
        />

        <TeamOfAgentsTable selectedTeamType={teamType} formik={formik} />
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

const StyledFields = styled.div`
  display: flex;
  gap: 40px;
`
