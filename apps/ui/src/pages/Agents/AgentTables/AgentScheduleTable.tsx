import Table from 'components/Table/Table'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { useScheduleForm } from 'pages/Schedule/ScheduleFrom/useScheduleForm'
import { useSchedules } from 'pages/Schedule/useSchedules'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledButtonWrapper, StyledRoot } from './AgentCampaignTable'
import { ButtonSecondary } from 'components/Button/Button'
import { useModal } from 'hooks'
import { t } from 'i18next'

const AgentScheduleTable = ({ agentId }: { agentId: string }) => {
  const navigate = useNavigate()

  const { openModal } = useModal()

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
      runnerId: options?.find((option: { label: string; value: string }) => {
        return (
          option.value === configs.agent_id ||
          option.value === configs.team_id ||
          option.value === configs.chat_id
        )
      })?.value,
    })) || []

  const filteredData = tableData?.filter((item: any) => item.runnerId === agentId)

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 290,
      },
      //   {
      //     Header: 'Runner',
      //     accessor: 'runner',
      //     width: 200,
      //   },
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
              onEditClick={() =>
                openModal({ name: 'edit-schedule-modal', data: { scheduleId: cell.value } })
              }
            />
          )
        },
      },
    ],
    [],
  )

  return (
    <StyledRoot>
      <StyledButtonWrapper>
        <ButtonSecondary
          onClick={() => openModal({ name: 'create-schedule-modal', data: { agentId } })}
        >
          {t('add-schedule')}
        </ButtonSecondary>
      </StyledButtonWrapper>
      <Table columns={columns} data={filteredData} />
    </StyledRoot>
  )
}

export default AgentScheduleTable
