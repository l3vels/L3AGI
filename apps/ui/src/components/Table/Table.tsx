import { useMemo, useState } from 'react'
import { useTable, useResizeColumns, useFlexLayout, useBlockLayout } from 'react-table'

import styled, { css } from 'styled-components'
import TableCell from './components/TableCell'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type ColumnProps = {
  Header: any
  accessor: string
  isEdit?: boolean
  cellEditor?: any
  cellEditorParams?: any
  valueSetter?: any
  maxWidth?: number
}

type TableProps = {
  columns: ColumnProps[]
  data: any
  expand?: boolean
}

const Table = ({ columns, data, expand }: TableProps) => {
  const defaultColumn = useMemo(
    () => ({
      width: 300,
      // minWidth: 100,
      // maxWidth: 100,
    }),
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      defaultColumn,
      columns,
      data,
    },
    useFlexLayout,
    useBlockLayout,
    useResizeColumns,
  )

  return (
    <StyledRoot>
      <StyledTable {...getTableProps()} expand={expand}>
        <StyledThead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <StyledTr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index: number) => (
                <StyledTh
                  key={index}
                  {...column.getHeaderProps()}
                  {...column.getResizerProps()}
                  minWidth={column.minWidth}
                  maxWidth={column.maxWidth}
                  width={column.width}
                >
                  <TypographyPrimary
                    value={column.render('Header')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.sm}
                  />
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
                  return <TableCell key={index} cell={cell} />
                })}
              </StyledTr>
            )
          })}
        </StyledTbody>
      </StyledTable>
    </StyledRoot>
  )
}

export default Table

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0; /* This will hide the scrollbar */
  }
  body {
    scrollbar-width: none; /* This will hide the scrollbar */
  }

  border-radius: 24px;
  max-height: calc(100vh - 330px);
`

const StyledTable = styled.table<{ expand?: boolean }>`
  ${({ expand }) => (expand ? 'height: calc(100vh - 335px);' : 'height: auto;')}
  min-height: 400px;
  width: 100%;

  color: ${({ theme }) => theme.typography.contentPrimary};

  background: #fff;

  overflow: hidden;
`
const StyledThead = styled.thead`
  background: #fff;

  display: flex;
  z-index: 1;
  position: sticky;
  top: 0px;
  margin: 0 0 0 0;
`
const StyledTbody = styled.tbody`
  /* height: 100%; */

  display: flex;
  flex-direction: column;
`

const StyledTr = styled.tr<{ bodyRow?: boolean }>`
  height: 35px;

  display: flex;

  :hover {
    ${p =>
      p.bodyRow &&
      css`
        background-color: rgba(255, 255, 255, 0.2);
      `};
  }
`
const StyledTh = styled.th`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px 20px;

  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  overflow: hidden;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  user-select: none;
`
