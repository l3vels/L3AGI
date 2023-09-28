import { useMemo, useRef } from 'react'

import DataGrid from 'components/DataGrid'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import TextCellRenderer from './TextCellRenderer'
import { useAgentsService } from 'services/agent/useAgentsService'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import AgentRenderer from './AgentRenderer'
import Table from 'components/Table'

import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

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

  const columns = [
    {
      Header: 'Role',
      accessor: 'role', // 'id' should match the key in your data
      Cell: ({ cell }: any) => {
        // Custom cell renderer for the 'age' column
        return (
          <StyledTextWrapper>
            <Typography
              value={cell.value}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </StyledTextWrapper>
        )
      },
    },
    {
      Header: 'Agent',
      accessor: 'agent_id', // 'name' should match the key in your data
      isEdit: true,
      Cell: ({ cell }: any) => {
        // Custom cell renderer for the 'age' column
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

const StyledTextWrapper = styled.div`
  padding: 5px 10px;
`
