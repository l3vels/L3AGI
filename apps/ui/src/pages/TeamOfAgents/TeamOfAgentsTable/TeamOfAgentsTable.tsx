import { useAgentsService } from 'services/agent/useAgentsService'
import { useTranslation } from 'react-i18next'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import AgentRenderer from './AgentRenderer'
import Table from 'components/Table'

type Agent = {
  id: number
  role: string
}

type TeamTypes = {
  agents: Array<{ id: number; role: string }>
  description: string
  fields: Array<{
    default: number
    is_required: string
    is_secret: boolean
    key: string
    label: string
    type: string
  }>
  is_active: boolean
  name: string
  team_type: string
  __typename: string
}

type TeamOfAgentsTableProps = {
  selectedTeamType?: TeamTypes
  formik: any
}

const TeamOfAgentsTable = ({ selectedTeamType, formik }: TeamOfAgentsTableProps) => {
  const { t } = useTranslation()
  const { data: agents } = useAgentsService()

  const { setFieldValue } = formik

  const { agents: selectedAgents } = formik.values

  if (!selectedTeamType) return null

  const gridData =
    selectedTeamType.agents.map((agent: Agent) => ({
      id: agent.id,
      role: agent.role,
      agent_id: selectedAgents[agent.id - 1]?.agent_id,
    })) || []

  const columns = [
    {
      Header: `${t('role')}`,
      accessor: 'role',
    },
    {
      Header: `${t('agent')}`,
      accessor: 'agent_id',

      isEdit: true,
      Cell: ({ cell }: any) => {
        return <AgentRenderer params={cell} options={agents} />
      },
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        optionsArr: agents.map((agent: any) => ({
          label:
            agent.agent.role.length > 0
              ? `${agent.agent.name} - ${agent.agent.role}`
              : agent.agent.name,
          value: agent.agent.id,
        })),
      },
      valueSetter: (params: any) => {
        const { newValue: newAgentId, data } = params

        setFieldValue(`agents[${params.data.id - 1}]`, {
          role: data.role,
          agent_id: newAgentId,
        })

        return true
      },
    },
  ]

  return (
    <div>
      {/* <DataGrid
        ref={gridRef}
        data={gridData}
        columnConfig={config}
        headerHeight={130}
        maxHeight={310}
      /> */}

      <Table columns={columns} data={gridData} />
    </div>
  )
}

export default TeamOfAgentsTable
