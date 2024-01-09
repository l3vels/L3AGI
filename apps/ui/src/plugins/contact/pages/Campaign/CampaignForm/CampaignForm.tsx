import FormikTextField from 'components/TextFieldFormik'
import { StyledForm, StyledInputWrapper, StyledRoot } from '../../Contact/ContactForm/ContactForm'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import { useCampaignForm } from './useCampaignForm'
import { StyledCombinedFields } from 'pages/Agents/AgentForm/AgentForm'

const CampaignForm = ({ formik }: { formik: any }) => {
  const { setFieldValue, values } = formik

  const { campaign_group_id, campaign_agent_id, campaign_type } = values

  const { agentOptions, groupOptions, campaignTypeOption } = useCampaignForm()

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='campaign_name' placeholder='Name' label='Name' size='small' />

          <AgentDropdown
            label={'Agent'}
            fieldName={'campaign_agent_id'}
            setFieldValue={setFieldValue}
            fieldValue={campaign_agent_id}
            options={agentOptions}
            optionSize={'small'}
          />
          <AgentDropdown
            label={'Group'}
            fieldName={'campaign_group_id'}
            setFieldValue={setFieldValue}
            fieldValue={campaign_group_id}
            options={groupOptions}
            optionSize={'small'}
          />
          <AgentDropdown
            label={'Campaign Type'}
            fieldName={'campaign_type'}
            setFieldValue={setFieldValue}
            fieldValue={campaign_type}
            options={campaignTypeOption}
            optionSize={'small'}
          />

          <FormikTextField
            name='campaign_start_date'
            field_name='campaign_start_date'
            placeholder='Run Date'
            label='Start Date'
            size={'small'}
            type='datetime-local'
          />

          <StyledCombinedFields>
            <FormikTextField
              name='campaign_retry_attempts'
              placeholder='2'
              label='Retry Attempts'
              size='small'
            />

            <FormikTextField
              name='campaign_retry_interval'
              placeholder='15'
              label='Retry Interval In Minutes'
              size='small'
            />
          </StyledCombinedFields>
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default CampaignForm
