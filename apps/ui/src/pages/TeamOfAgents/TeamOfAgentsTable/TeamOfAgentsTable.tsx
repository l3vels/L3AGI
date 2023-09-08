import { useMemo, useRef } from 'react'

import DataGrid from 'components/DataGrid'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import TextCellRenderer from './TextCellRenderer'
import { useAgentsService } from 'services/agent/useAgentsService'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import AgentRenderer from './AgentRenderer'

type TeamOfAgentsTableProps = {
  selectedTeamType?: any
}

const TeamOfAgentsTable = ({ selectedTeamType }: TeamOfAgentsTableProps) => {
  const gridRef = useRef<any>({})

  const { data: agents } = useAgentsService()

  const config = useMemo(
    () => [
      {
        headerName: 'Role',
        field: 'name',
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
        field: 'agent',
        filter: 'agTextColumnFilter',
        resizable: true,
        editable: true,
        enableRowGroup: false,
        cellEditorPopup: true,
        cellRenderer: (params: any) => <AgentRenderer params={params} options={agents} />,
        cellEditor: MultiselectEditor,
        cellEditorParams: {
          optionsArr: agents.map((agent: any) => ({
            label: agent.agent.name,
            value: agent.agent.id,
          })),
        },
        // valueSetter: (params: any) => {
        //   const newValue = params.newValue
        //   const field = params.colDef.field

        //   cellEditFn({
        //     field,
        //     newValue,
        //     params,
        //   })
        //   return true
        // },
        // headerComponentParams: {
        //   icon: <Bolt />,
        // },
        minWidth: 200,
        width: 350,
        flex: 2,
      },
    ],
    [agents],
  )

  if (!selectedTeamType) return null

  const gridData =
    selectedTeamType.agents.map((agent: any) => ({
      id: agent.role,
      name: agent.role,
      agent: null,
    })) || []

  return (
    <div>
      <DataGrid ref={gridRef} data={gridData} columnConfig={config} headerHeight={130} />
    </div>
  )
}

export default TeamOfAgentsTable

// style={{ height: '500px', maxHeight: '600px', width: '100%', padding: '40px' }}
