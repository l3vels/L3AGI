import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useNavigate } from 'react-router-dom'

import { useSchedules } from './useSchedules'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { useMemo } from 'react'
import Table from 'components/Table'
import { useScheduleForm } from './ScheduleFrom/useScheduleForm'

const Schedules = () => {
  const navigate = useNavigate()

  const { deleteScheduleHandler, schedules } = useSchedules()
  const { options } = useScheduleForm()

  const tableData =
    schedules?.map(({ schedule, configs }) => ({
      id: schedule.id,
      name: schedule.name,
      recurring: schedule.interval ? schedule.interval : '-',
      status: schedule.is_active ? 'Active' : 'Inactive',
      create_session: configs.create_session_on_run ? 'True' : 'False',
      runner: options?.find((option: { label: string; value: string }) => {
        return (
          option.value === configs.agent_id ||
          option.value === configs.team_id ||
          option.value === configs.chat_id
        )
      })?.label,
    })) || []

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 290,
      },
      {
        Header: 'Runner',
        accessor: 'runner',
        width: 290,
      },
      {
        Header: 'Recurring Interval',
        accessor: 'recurring',
        width: 160,
      },
      {
        Header: 'Session Each Run',
        accessor: 'create_session',
        width: 160,
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 70,
      },

      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }: any) => {
          return (
            <TableActionButtons
              onDeleteClick={() => deleteScheduleHandler(cell.value)}
              onEditClick={() => navigate(`/schedules/${cell.value}/edit-schedule`)}
            />
          )
        },
      },
    ],
    [],
  )

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Schedules</StyledSectionTitle>
        </div>
        <div>
          <ButtonPrimary onClick={() => navigate('/schedules/create-schedule')} size={'small'}>
            Add Schedule
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledTableWrapper>
          <Table columns={columns} data={tableData} />
        </StyledTableWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Schedules
