import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'

import FormikTextField from 'components/TextFieldFormik'
import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import TypographyPrimary from 'components/Typography/Primary'
import { useScheduleForm } from './useScheduleForm'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import styled from 'styled-components'

import cronstrue from 'cronstrue'
import { useEffect, useState } from 'react'
import CustomField from 'pages/Agents/AgentForm/components/CustomField'
import DatePickerField from 'components/DatePicker/DatePicker'

const ScheduleForm = ({ formik }: { formik: any }) => {
  const { values, setFieldValue } = formik
  const {
    schedule_description,
    schedule_group_id,
    schedule_agent_id,
    schedule_type,
    schedule_is_active,
    schedule_cron_expression,
    tasks,
    run_immediately,
    create_session_on_run,
  } = values

  const onDescriptionChange = (value: string) => {
    setFieldValue('schedule_description', value)
  }

  const { options, groupOptions, scheduleTypeOptions } = useScheduleForm()

  const [cronDescription, setCronDescription] = useState('')

  useEffect(() => {
    try {
      const cronDescription = cronstrue.toString(schedule_cron_expression)
      setCronDescription(cronDescription)
    } catch (error) {
      // Handle invalid cron expressions here
      setCronDescription('Invalid cron expression')
    }
  }, [schedule_cron_expression])

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='schedule_name' placeholder='Name' label='Name' />

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

          <StyledDoubleRow>
            <FormikTextField
              name='schedule_cron_expression'
              placeholder='Cron expression'
              label='Cron expression'
            />

            <StyledCronDescriptionWrapper>
              <TypographyPrimary
                value={cronDescription}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledCronDescriptionWrapper>
          </StyledDoubleRow>

          <StyledDoubleRow>
            <AgentDropdown
              label={'Agent or Team'}
              fieldName={'schedule_agent_id'}
              setFieldValue={setFieldValue}
              fieldValue={schedule_agent_id}
              options={options}
              optionSize={'small'}
              onChange={option => {
                setFieldValue('agent_type', option.type)
              }}
            />

            {/* <AgentDropdown
              label={'Group'}
              fieldName={'schedule_group_id'}
              setFieldValue={setFieldValue}
              fieldValue={schedule_group_id}
              options={groupOptions}
              optionSize={'small'}
            /> */}
          </StyledDoubleRow>

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
              name='schedule_is_active'
              checked={schedule_is_active}
              onChange={() => setFieldValue('schedule_is_active', !schedule_is_active)}
            />
          </StyledCheckboxWrapper>

          <StyledCheckboxWrapper>
            <Checkbox
              label='Create session for each run'
              kind='secondary'
              name='create_session_on_run'
              checked={create_session_on_run}
              onChange={() => setFieldValue('create_session_on_run', !create_session_on_run)}
            />
          </StyledCheckboxWrapper>

          <StyledCheckboxWrapper>
            <Checkbox
              label='Recurring'
              kind='secondary'
              name='run_immediately'
              checked={run_immediately}
              onChange={() => setFieldValue('run_immediately', !run_immediately)}
            />
          </StyledCheckboxWrapper>

          <StyledCheckboxWrapper>
            <Checkbox
              label='Run Immediately'
              kind='secondary'
              name='run_immediately'
              checked={run_immediately}
              onChange={() => setFieldValue('run_immediately', !run_immediately)}
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
const StyledCronDescriptionWrapper = styled.div`
  width: 300px;
  height: 100%;
  padding-top: 45px;

  display: flex;
  justify-content: center;
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

export const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: 100%;
  /* overflow: scroll; */

  /* margin-top: 40px; */
  display: flex;
  justify-content: center;
`

export const StyledRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;
`

export const StyledInputWrapper = styled.div`
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

const StyledDatePicker = styled(DatePickerField)`
  width: 400px;
  position: relative;
`
