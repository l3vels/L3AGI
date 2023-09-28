import { useState } from 'react'
import { useTable } from 'react-table'
import styled, { css } from 'styled-components'
import TableCell from './components/TableCell'

type ColumnProps = {
  Header: string
  accessor: string
  isEdit?: boolean
  cellEditor?: any
  cellEditorParams?: any
  valueSetter?: any
}

type TableProps = {
  columns: ColumnProps[]
  data: any
}

const Table = ({ columns, data }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <StyledTable {...getTableProps()}>
      <StyledThead>
        {headerGroups.map((headerGroup: any, index: number) => (
          <StyledTr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, index: number) => (
              <StyledTh key={index} {...column.getHeaderProps()}>
                {column.render('Header')}
              </StyledTh>
            ))}
          </StyledTr>
        ))}
      </StyledThead>
      <StyledTbody {...getTableBodyProps()}>
        {rows.map((row: any, index: number) => {
          prepareRow(row)
          return (
            <StyledTr {...row.getRowProps()} key={index} bodyRow>
              {row.cells.map((cell: any, index: number) => {
                const { column } = cell
                const { isEdit, cellEditor } = column

                return <TableCell key={index} cell={cell} />
              })}
            </StyledTr>
          )
        })}
      </StyledTbody>
    </StyledTable>
  )
}

export default Table

const StyledTable = styled.table`
  margin-top: 20px;

  width: 100%;
  min-height: 300px;
  color: #fff;

  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 24px;

  overflow: hidden;
`
const StyledThead = styled.thead`
  width: 100%;

  display: flex;
`
const StyledTbody = styled.tbody`
  width: 100%;

  /* height: 100%; */

  display: flex;
  flex-direction: column;
`

const StyledTr = styled.tr<{ bodyRow?: boolean }>`
  width: 100%;

  height: 40px;

  display: flex;

  :hover {
    ${p =>
      p.bodyRow &&
      css`
        background-color: rgba(0, 0, 0, 0.2);
      `};
  }
`
const StyledTh = styled.th`
  width: 100%;

  text-align: center;

  padding: 10px 20px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
const StyledTd = styled.td`
  width: 100%;

  /* padding: 10px 20px; */

  /* text-align: center; */

  border-right: 1px solid rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
