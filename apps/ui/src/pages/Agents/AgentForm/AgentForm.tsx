import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'
import { useAgentForm } from './useAgentForm'
import AgentDropdown from './components/AgentDropdown'

type AgentFormProps = {
  formik: any
  isLoading: boolean
  handleSubmit: (values: string) => void
  isEdit?: boolean
}

const AgentForm = ({ formik, isLoading, isEdit, handleSubmit }: AgentFormProps) => {
  const { setFieldValue, values } = formik
  const { agent_datasources, agent_mode_provider, agent_model_version, agent_description } = values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('agent_description', value)
  }

  const { providerOptions, modelOptions, datasourceOptions } = useAgentForm(formik)

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='agent_name' placeholder='Name' label='Name' />

          <FormikTextField name='agent_role' placeholder='Role' label='Role' />

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
              value={agent_description}
              name='agent_description'
              onChange={onDescriptionChange}
            />
          </StyledTextareaWrapper>

          <AgentSlider formik={formik} />

          <CustomField formik={formik} formikField={'agent_goals'} placeholder={'Goal'} />

          <CustomField
            formik={formik}
            formikField={'agent_constraints'}
            placeholder={'Constraint'}
          />

          <CustomField formik={formik} formikField={'agent_tools'} placeholder={'Tool'} />

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
            formikField={'agent_instructions'}
            placeholder={'Instruction'}
          />

          <AgentDropdown
            label={'Mode Provider'}
            fieldName={'agent_mode_provider'}
            setFieldValue={setFieldValue}
            fieldValue={agent_mode_provider}
            options={providerOptions}
            onChange={() => {
              setFieldValue('agent_model_version', '')
            }}
          />

          <AgentDropdown
            label={'Model Version'}
            fieldName={'agent_model_version'}
            setFieldValue={setFieldValue}
            fieldValue={agent_model_version}
            options={modelOptions}
          />
        </StyledInputWrapper>
      </StyledForm>
      <StyledFooter>
        <Button
          size={Button.sizes.LARGE}
          disabled={isLoading}
          onClick={() => handleSubmit(formik?.values)}
        >
          {isLoading && <Loader size={32} />}
          {!isLoading && (isEdit ? 'Update' : 'Create Agent')}
        </Button>
      </StyledFooter>
    </StyledRoot>
  )
}

export default AgentForm

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`

const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: calc(100% - 150px);
  overflow: scroll;

  margin-top: 40px;
  display: flex;
  /* justify-content: center; */
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;

  gap: 35px;
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

  display: flex;
  flex-direction: column;
  gap: 10px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
  }
`
const StyledFooter = styled.div`
  height: 150px;
  width: 100%;

  display: flex;
  align-items: center;
  padding: 20px;
`
