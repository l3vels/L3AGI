import Typography from 'share-ui/components/typography/Typography'
import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import TextField from 'share-ui/components/TextField/TextField'
import { useTranslation } from 'react-i18next'

import FormikTextField from 'components/TextFieldFormik'
import { useScheduleForm } from './useScheduleForm'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import styled from 'styled-components'
import CustomField from 'pages/Agents/AgentForm/components/CustomField'
import {
  StyledForm,
  StyledInputWrapper,
  StyledRoot,
} from 'plugins/contact/pages/Contact/ContactForm/ContactForm'

const ScheduleForm = ({ formik }: { formik: any }) => {
  const { t } = useTranslation()
  const { values, setFieldValue } = formik
  const {
    // schedule_description,
    // schedule_group_id,
    agent_id,
    // schedule_type,
    is_active,
    // schedule_cron_expression,
    is_recurring,
    create_session_on_run,
    interval_unit,
  } = values

  // const onDescriptionChange = (value: string) => {
  //   setFieldValue('schedule_description', value)
  // }

  const { options, groupOptions, scheduleTypeOptions } = useScheduleForm()

  // const [cronDescription, setCronDescription] = useState('')

  // useEffect(() => {
  //   try {
  //     const cronDescription = cronstrue.toString(schedule_cron_expression)
  //     setCronDescription(cronDescription)
  //   } catch (error) {
  //     // Handle invalid cron expressions here
  //     setCronDescription('Invalid cron expression')
  //   }
  // }, [schedule_cron_expression])

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='name' placeholder='Name' label='Name' />

          {/* <StyledTextareaWrapper>
            <TypographyPrimary
              value='Description'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <Textarea
              hint=''
              placeholder='Description'
              name='schedule_description'
              value={schedule_description}
              onChange={onDescriptionChange}
            />
          </StyledTextareaWrapper> */}

          <CustomField formik={formik} formikField={'tasks'} placeholder={'Task'} />

          {/* <StyledDoubleRow> */}
          {/* <FormikTextField
              name='schedule_cron_expression'
              placeholder='Cron expression'
              label='Cron expression'
            /> */}

          <StyledDoubleRow>
            {/* <AgentDropdown
              label={'Runner'}
              fieldName={'agent_id'}
              setFieldValue={setFieldValue}
              fieldValue={agent_id}
              options={options}
              optionSize={'small'}
              onChange={option => {
                setFieldValue('agent_type', option.type)
              }}
            /> */}

            {/* <AgentDropdown
              label={'Group'}
              fieldName={'schedule_group_id'}
              setFieldValue={setFieldValue}
              fieldValue={schedule_group_id}
              options={groupOptions}
              optionSize={'small'}
            /> */}
          </StyledDoubleRow>

          <FormikTextField
            name='start_date'
            field_name='start_date'
            placeholder='Run Date'
            label='Start Date'
            size={TextField.sizes?.SMALL}
            type='datetime-local'
          />

          {/* <StyledCronDescriptionWrapper>
              <TypographyPrimary
                value={cronDescription}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledCronDescriptionWrapper> */}
          {/* </StyledDoubleRow> */}

          <StyledCheckboxWrapper>
            <Checkbox
              label='Recurring'
              kind='secondary'
              name='is_recurring'
              checked={is_recurring}
              onChange={() => setFieldValue('is_recurring', !is_recurring)}
            />
          </StyledCheckboxWrapper>

          {is_recurring && (
            <StyledRepeatFields>
              <FormikTextField type='number' name='interval' placeholder='0' label='Repeat every' />

              <AgentDropdown
                label={'Repeat every'}
                fieldName={'interval_unit'}
                setFieldValue={setFieldValue}
                fieldValue={interval_unit}
                options={[
                  { label: 'Minutes', value: 'minutes' },
                  { label: 'Hours', value: 'hours' },
                  { label: 'Days', value: 'days' },
                  { label: 'Weeks', value: 'weeks' },
                  { label: 'Months', value: 'months' },
                ]}
                optionSize={'small'}
              />

              <FormikTextField
                name='end_date'
                field_name='end_date'
                placeholder='Recurring End Date'
                label='Recurring End Date'
                size={TextField.sizes?.SMALL}
                type='datetime-local'
              />
            </StyledRepeatFields>
          )}

          {/* <FormikTextField
            type='number'
            name='schedule_max_daily_budget'
            placeholder='$0.00'
            label='Max Daily Budget'
          /> */}

          <StyledCheckboxWrapper>
            <Checkbox
              label='Active'
              kind='secondary'
              name='is_active'
              checked={is_active}
              onChange={() => setFieldValue('is_active', !is_active)}
            />
          </StyledCheckboxWrapper>

          <StyledCheckboxWrapper>
            <Checkbox
              label={t('create-session-each-run')}
              kind='secondary'
              name='create_session_on_run'
              checked={create_session_on_run}
              onChange={() => setFieldValue('create_session_on_run', !create_session_on_run)}
            />
          </StyledCheckboxWrapper>
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default ScheduleForm

const StyledDoubleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const StyledCheckboxWrapper = styled.div`
  height: fit-content;
  padding-bottom: 5px;
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__checkbox {
    border-color: ${({ theme }) => theme.typography.contentPrimary};
  }
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__label {
    color: ${({ theme }) => theme.typography.contentPrimary};
  }
`

const StyledRepeatFields = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  gap: 15px;
`
