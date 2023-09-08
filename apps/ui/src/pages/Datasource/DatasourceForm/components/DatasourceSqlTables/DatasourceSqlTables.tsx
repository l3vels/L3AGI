import { useMemo, useRef } from 'react'

import DataGrid from 'components/DataGrid'
import { IDatasourceSqlTables } from 'services/datasource/useDatasourceSqlTables'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import TextCellRenderer from './TextCellRenderer'
import { GridReadyEvent } from 'ag-grid-community'

type DatasourceSqlTablesProps = {
  data: IDatasourceSqlTables
  tables: string[]
  onTablesSelected: (tables: string[]) => void
}

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
        filter: 'agTextColumnFilter',
        resizable: true,
        cellRenderer: TextCellRenderer,
        minWidth: 200,
        width: 350,
        flex: 2,
      },
      {
        headerName: 'Rows',
        headerComponent: HeaderComponent,
        field: 'count',
        filter: 'agTextColumnFilter',
        resizable: true,
        minWidth: 200,
        width: 350,
        flex: 2,
      },
    ],
    [HeaderCheckbox, RowCheckbox],
  )

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.getSelectedRows()
    const tables = selectedRows.map((row: any) => row.name)
    onTablesSelected(tables)
  }

  const onGridReady = (params: GridReadyEvent<any>) => {
    if (!tables) return

    tables.forEach(name => {
      const rowNode = params.api.getRowNode(name)
      if (rowNode) {
        rowNode.setSelected(true)
      }
    })
  }

  return (
    <div>
      <DataGrid
        ref={gridRef}
        data={data || []}
        columnConfig={config}
        headerHeight={130}
        onSelectionChanged={onSelectionChanged}
        onGridReady={onGridReady}
      />
    </div>
  )
}

export default DatasourceSqlTables
