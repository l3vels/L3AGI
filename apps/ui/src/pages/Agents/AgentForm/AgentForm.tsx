import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'
import { useAgentForm } from './useAgentForm'
import AgentDropdown from './components/AgentDropdown'
import TypographyPrimary from 'components/Typography/Primary'

type AgentFormProps = {
  formik: any
}

const AgentForm = ({ formik }: AgentFormProps) => {
  const { setFieldValue, values } = formik
  const {
    agent_datasources,
    agent_model_provider,
    agent_model_version,
    agent_description,
    agent_is_memory,
    agent_tools,
    agent_greeting,
  } = values

  const onTextareaChange = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  const { providerOptions, modelOptions, datasourceOptions, toolOptions } = useAgentForm(formik)

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='agent_name' placeholder='Name' label='Name' />

          <FormikTextField name='agent_role' placeholder='Role' label='Role' />

          <StyledTextareaWrapper>
            <TypographyPrimary
              value='Description'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <Textarea
              hint=''
              placeholder='Description'
              value={agent_description}
              name='agent_description'
              onChange={(value: string) => onTextareaChange('agent_description', value)}
            />
          </StyledTextareaWrapper>

          <AgentDropdown
            isMulti
            label={'Tools'}
            fieldName={'agent_tools'}
            fieldValue={agent_tools}
            setFieldValue={setFieldValue}
            options={toolOptions}
          />

          <AgentDropdown
            isMulti
            label={'Datasource'}
            fieldName={'agent_datasources'}
            fieldValue={agent_datasources}
            setFieldValue={setFieldValue}
            options={datasourceOptions}
          />

          <CustomField
            formik={formik}
            formikField={'agent_suggestions'}
            placeholder={'Suggestion'}
          />

          <StyledTextareaWrapper>
            <TypographyPrimary
              value='Greeting'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <Textarea
              hint=''
              placeholder='Greeting'
              value={agent_greeting}
              name='agent_greeting'
              onChange={(value: string) => onTextareaChange('agent_greeting', value)}
            />
          </StyledTextareaWrapper>

          <CustomField formik={formik} formikField={'agent_goals'} placeholder={'Goal'} />

          <CustomField
            formik={formik}
            formikField={'agent_instructions'}
            placeholder={'Instruction'}
          />

          <CustomField
            formik={formik}
            formikField={'agent_constraints'}
            placeholder={'Constraint'}
          />

          <StyledCombinedFields>
            <AgentDropdown
              label={'Mode Provider'}
              fieldName={'agent_model_provider'}
              setFieldValue={setFieldValue}
              fieldValue={agent_model_provider}
              options={providerOptions}
              onChange={() => {
                setFieldValue('agent_model_version', '')
              }}
              optionSize={'small'}
            />
            <AgentDropdown
              label={'Model Version'}
              fieldName={'agent_model_version'}
              setFieldValue={setFieldValue}
              fieldValue={agent_model_version}
              options={modelOptions}
              optionSize={'small'}
            />
          </StyledCombinedFields>

          <AgentSlider formik={formik} />

          <StyledCheckboxWrapper>
            <Checkbox
              label='Memory'
              kind='secondary'
              name='agent_is_memory'
              checked={agent_is_memory}
              onChange={() => setFieldValue('agent_is_memory', !agent_is_memory)}
            />
          </StyledCheckboxWrapper>
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default AgentForm

const StyledRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;
`

const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: 100%;
  /* overflow: scroll; */

  /* margin-top: 40px; */
  display: flex;
  justify-content: center;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  gap: 20px;
  width: 100%;
  max-width: 800px;
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`

export const StyledTextareaWrapper = styled.div`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

  height: 200px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
  }
`
const StyledCheckboxWrapper = styled.div`
  height: fit-content;
  padding-bottom: 5px;
`
const StyledCombinedFields = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
`
