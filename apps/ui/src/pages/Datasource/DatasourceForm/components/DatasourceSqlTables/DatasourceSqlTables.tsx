import { useMemo, useState } from 'react'

import { IDatasourceSqlTables } from 'services/datasource/useDatasourceSqlTables'

import Table from 'components/Table'

import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import styled from 'styled-components'

type DatasourceSqlTablesProps = {
  data: IDatasourceSqlTables
  tables: string[]
  onTablesSelected: (tables: string[]) => void
}

const DatasourceSqlTables = ({ data, tables, onTablesSelected }: DatasourceSqlTablesProps) => {
  const [selectedTables, setSelectedTables] = useState<string[]>(tables || [])
  const allTables = data?.map((item: any) => item.name)
  const columns = useMemo(
    () => [
      {
        Header: () => {
          return (
            <Checkbox
              indeterminate={selectedTables?.length > 0 && selectedTables?.length !== data?.length}
              checked={selectedTables?.length === data?.length}
              size='small'
              kind='secondary'
              onChange={() => {
                if (selectedTables?.length === data?.length) {
                  onTablesSelected([])
                  setSelectedTables([])
                } else {
                  onTablesSelected(allTables)
                  setSelectedTables(allTables)
                }
              }}
            />
          )
        },
        accessor: 'id',
        width: 50,
        maxWidth: 50,

        Cell: ({ cell }: any) => {
          return (
            <StyledCheckboxWrapper>
              <Checkbox
                checked={selectedTables.includes(cell.value)}
                size='small'
                kind='secondary'
                onChange={() => {
                  setSelectedTables((prevState: any) => {
                    if (prevState.includes(cell.value)) {
                      const newArray = prevState.filter((value: string) => value !== cell.value)
                      onTablesSelected(newArray)
                      return newArray
                    } else {
                      onTablesSelected([...prevState, cell.value])
                      return [...prevState, cell.value]
                    }
                  })
                }}
              />
            </StyledCheckboxWrapper>
          )
        },
      },
      {
        Header: 'Table',
        accessor: 'name',
        width: '50%',
      },
      {
        Header: 'Rows',
        accessor: 'count',
        width: '50%',
      },
    ],
    [selectedTables, onTablesSelected],
  )

  return (
    <div>
      <Table columns={columns} data={data || []} />
    </div>
  )
}

export default DatasourceSqlTables

const StyledCheckboxWrapper = styled.div`
  margin-left: 10px;
`
