import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'

import { StyledCombinedFields, StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useTeamOfAgentsForm } from './useTeamOfAgentsForm'
import UploadButton from './components/UploadButton'
import UploadedFile from 'components/UploadedFile'

import DataLoaderCard from './components/DataLoaderCard'
import FormikTextField from 'components/TextFieldFormik'
import TeamOfAgentsTable from '../TeamOfAgentsTable'
import { teamTypeDocs } from './constants'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import TypographyPrimary from 'components/Typography/Primary'
import CustomField from 'pages/Agents/AgentForm/components/CustomField'
import AgentSlider from 'pages/Agents/AgentForm/components/AgentSlider'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import ShowAdvancedButton from 'pages/Agents/AgentForm/components/ShowAdvancedButton'

type TeamOfAgentsFormProps = {
  formik: any
  isLoading?: boolean
}

const TeamOfAgentsForm = ({ formik, isLoading }: TeamOfAgentsFormProps) => {
  const advancedRef = useRef(null as any)
  const scrollToAdvancedRef = () => {
    if (advancedRef) {
      setTimeout(function () {
        advancedRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 1)
    }
  }

  const {
    teamTypes,
    pickedLoaderFields,
    handleUploadFile,
    fileLoading,
    modelOptions,
    datasourceOptions,
    toolOptions,
  } = useTeamOfAgentsForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const {
    teamOfAgents_team_type,
    config_value,
    teamOfAgents_description,
    configs,
    is_memory,
    team_greeting,
    team_temperature,
    team_text,
    team_tools,
    team_datasources,
    team_model,
  } = values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('teamOfAgents_description', value)
  }

  const onTextareaChange = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  useEffect(() => {
    if (teamOfAgents_team_type?.length > 0 && !isLoading && fields) {
      setFieldValue('config_key', pickedLoaderFields?.fields[0]?.key)
      setFieldValue('config_key_type', pickedLoaderFields?.fields[0]?.type)
    }
  }, [teamOfAgents_team_type])

  const teamType = teamTypes?.find((teamType: any) => teamType.team_type === teamOfAgents_team_type)

  const [showAdvanced, setShowAdvanced] = useState(false)

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
        <StyledCheckbox>
          <Checkbox
            label='Memory'
            kind='secondary'
            name='is_memory'
            checked={is_memory}
            onChange={() => setFieldValue('is_memory', !is_memory)}
          />
        </StyledCheckbox>

        <TeamOfAgentsTable selectedTeamType={teamType} formik={formik} />

        <CustomField formik={formik} formikField={'team_suggestions'} placeholder={'Suggestion'} />

        <StyledTextareaWrapper>
          <TypographyPrimary
            value='Greeting'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          <Textarea
            hint=''
            placeholder='Greeting'
            value={team_greeting}
            name='team_greeting'
            onChange={(value: string) => onTextareaChange('team_greeting', value)}
          />
        </StyledTextareaWrapper>

        <AgentDropdown
          isMulti
          label={'Data source'}
          fieldName={'team_datasources'}
          fieldValue={team_datasources}
          setFieldValue={setFieldValue}
          options={datasourceOptions}
        />

        <AgentDropdown
          isMulti
          label={'Tools'}
          fieldName={'team_tools'}
          fieldValue={team_tools}
          setFieldValue={setFieldValue}
          options={toolOptions}
        />

        <AgentSlider
          onChange={(value: number) => setFieldValue('team_temperature', value / 10)}
          value={team_temperature}
        />

        <ShowAdvancedButton
          isShow={showAdvanced}
          onClick={() => {
            setShowAdvanced(!showAdvanced)
            scrollToAdvancedRef()
          }}
        />

        {showAdvanced && (
          <>
            <StyledTextareaWrapper>
              {/* <TypographyPrimary
                value='Advanced text'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              /> */}
              <Textarea
                hint=''
                placeholder='text'
                value={team_text}
                name='team_text'
                onChange={(value: string) => onTextareaChange('team_text', value)}
              />
            </StyledTextareaWrapper>

            <StyledCombinedFields>
              <AgentDropdown
                label={'Model'}
                fieldName={'team_model'}
                setFieldValue={setFieldValue}
                fieldValue={team_model}
                options={modelOptions}
                optionSize={'small'}
              />
            </StyledCombinedFields>
            <CustomField formik={formik} formikField={'team_goals'} placeholder={'Goal'} />
            <CustomField
              formik={formik}
              formikField={'team_instructions'}
              placeholder={'Instruction'}
            />
            <CustomField
              formik={formik}
              formikField={'team_constraints'}
              placeholder={'Constraint'}
            />
          </>
        )}

        <div ref={advancedRef} />
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
const StyledCheckbox = styled.div`
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__checkbox {
    border-color: ${({ theme }) => theme.typography.contentPrimary};
  }
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__label {
    color: ${({ theme }) => theme.typography.contentPrimary};
  }
`
