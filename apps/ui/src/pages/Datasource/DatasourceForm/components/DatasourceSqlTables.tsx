import { useEffect, useMemo, useRef } from 'react'

import DataGrid from 'components/DataGrid'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { IDatasourceSqlTables } from 'services/datasource/useDatasourceSqlTables'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

type DatasourceSqlTablesProps = {
  data: IDatasourceSqlTables
  tables: string[]
  onTablesSelected: (tables: string[]) => void
}

type RendererProps = {
  webhooks(data: string): string
  value: string
}

const TextCellRenderer = (props: RendererProps) => (
  <div>
    <Typography
      value={props.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.sm}
      customColor='rgba(255, 255, 255, 1)'
    />
  </div>
)

const DatasourceSqlTables = ({ data, tables, onTablesSelected }: DatasourceSqlTablesProps) => {
  const gridRef = useRef<any>({})

  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const config = useMemo(
    () => [
      {
        headerComponent: HeaderCheckbox,
        cellRenderer: RowCheckbox,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        width: 50,
      },
      {
        headerName: 'Table',
        field: 'name',
        headerComponent: HeaderComponent,
        // valueGetter: 'data.assigned_user_first_name + " " + data.assigned_user_last_name',
        filter: 'agTextColumnFilter',
        resizable: true,
        // cellRen
        derer: TextCellRenderer,
        minWidth: 200,
        width: 350,
        flex: 2,
        // sizeColumnsToFit: true,
        // headerComponentParams: {
        //   icon: <PersonaIcon />,
        // },
      },
      {
        headerName: 'Rows',
        headerComponent: HeaderComponent,
        field: 'count',
        filter: 'agTextColumnFilter',
        // cellRenderer: TextCellRenderer,
        resizable: true,
        // headerComponentParams: {
        //   icon: <EmailIcon />,
        // },

        minWidth: 200,
        width: 350,
        flex: 2,
        // sizeColumnsToFit: true,
      },
    ],
    [HeaderCheckbox, RowCheckbox],
  )

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.getSelectedRows()
    const tables = selectedRows.map((row: any) => row.name)
    onTablesSelected(tables)
  }

  return (
    <div>
      <DataGrid
        ref={gridRef}
        data={data || []}
        columnConfig={config}
        headerHeight={130}
        onSelectionChanged={onSelectionChanged}
        onGridReady={params => {
          if (!tables) return

          tables.forEach(name => {
            const rowNode = params.api.getRowNode(name)
            if (rowNode) {
              rowNode.setSelected(true)
            }
          })
        }}
      />
    </div>
  )
}

export default DatasourceSqlTables
