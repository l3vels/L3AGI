import { useMemo, useRef } from 'react'

import DataGrid from 'components/DataGrid'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import TextCellRenderer from './TextCellRenderer'
import { useAgentsService } from 'services/agent/useAgentsService'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import AgentRenderer from './AgentRenderer'

type TeamOfAgentsTableProps = {
  selectedTeamType?: any
  formik: any
}

const TeamOfAgentsTable = ({ selectedTeamType, formik }: TeamOfAgentsTableProps) => {
  const gridRef = useRef<any>({})

  const { data: agents } = useAgentsService()

  const { setFieldValue } = formik

  const { agents: selectedAgents } = formik.values

  const config = useMemo(
    () => [
      {
        headerName: 'Role',
        field: 'role',
        headerComponent: HeaderComponent,
        filter: 'agTextColumnFilter',
        resizable: true,
        cellRenderer: TextCellRenderer,
        minWidth: 200,
        width: 350,
        flex: 2,
      },
      {
        headerName: 'Agent',
        headerComponent: HeaderComponent,
        filter: 'agTextColumnFilter',
        field: 'agent_id',
        resizable: true,
        editable: true,
        enableRowGroup: false,
        cellRenderer: (params: any) => <AgentRenderer params={params} options={agents} />,
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
        minWidth: 200,
        width: 350,
        flex: 2,
      },
    ],
    [agents, setFieldValue],
  )

  if (!selectedTeamType) return null

  const gridData =
    selectedTeamType.agents.map((agent: any) => ({
      id: agent.id,
      role: agent.role,
      agent_id: selectedAgents[agent.id - 1]?.agent_id,
    })) || []

  return (
    <div>
      <DataGrid
        ref={gridRef}
        data={gridData}
        columnConfig={config}
        headerHeight={130}
        maxHeight={310}
      />
    </div>
  )
}

export default TeamOfAgentsTable
