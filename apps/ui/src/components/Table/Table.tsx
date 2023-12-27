import { useEffect, useMemo, useState } from 'react'

import { useTable, useResizeColumns, useFlexLayout, useBlockLayout } from 'react-table'

import styled, { css } from 'styled-components'
import TableCell from './components/TableCell'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import NavigationChevronLeft from '@l3-lib/ui-core/dist/icons/NavigationChevronLeft'
import NavigationChevronRight from '@l3-lib/ui-core/dist/icons/NavigationChevronRight'

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
  pagination?: boolean
  page?: number
  setPage?: (value: number) => void

  totalPages?: number
}

const Table = ({ columns, data, expand, page = 1, setPage, totalPages }: TableProps) => {
  const [totalPageState, setTotalPageState] = useState(totalPages || null)

  useEffect(() => {
    if (totalPageState === totalPages) return

    if (totalPages && totalPages > 0) setTotalPageState(totalPages)
  }, [totalPages])

  const defaultColumn = useMemo(
    () => ({
      // width: 300,
    }),
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      defaultColumn,
      columns,
      data,
    },
    // useBlockLayout,
    useResizeColumns,
    useFlexLayout,
  )

  const paginate = (pageNumber: number) => {
    if (setPage) setPage(pageNumber)
  }

  const handleNextPage = () => {
    if (totalPages && setPage && page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (setPage && page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <StyledRoot>
      <StyledTable {...getTableProps()} expand={expand}>
        <StyledThead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <StyledTr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index: number) => {
                return (
                  <StyledTh
                    key={index}
                    {...column.getHeaderProps()}
                    minWidth={column.minWidth}
                    maxWidth={column.maxWidth}
                    width={column.width}
                  >
                    <TypographyPrimary
                      value={column.render('Header')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                    />
                    <div
                      {...column.getResizerProps()}
                      style={{
                        width: '10px',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        cursor: 'col-resize',
                      }}
                    />
                  </StyledTh>
                )
              })}
            </StyledTr>
          ))}
        </StyledThead>
        <StyledTbody {...getTableBodyProps()}>
          {rows?.map((row: any, index: number) => {
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
      {totalPageState && (
        <PaginationWrapper>
          <PageNumber onClick={handlePrevPage}>
            <StyledNavigationChevronLeft size={16} />
          </PageNumber>
          <PageNumber onClick={() => paginate(1)} active={1 === page}>
            1
          </PageNumber>
          {page > 3 && (
            <>
              <PageNumber>...</PageNumber>
              <PageNumber onClick={() => paginate(page - 1)}>{page - 1}</PageNumber>
            </>
          )}
          {page !== 1 && (
            <PageNumber onClick={() => paginate(page)} active={true}>
              {page}
            </PageNumber>
          )}
          {page < totalPageState - 2 && (
            <>
              <PageNumber onClick={() => paginate(page + 1)}>{page + 1}</PageNumber>
              <PageNumber>...</PageNumber>
            </>
          )}
          {totalPageState > 1 && page !== totalPageState && (
            <PageNumber onClick={() => paginate(totalPageState)} active={totalPageState === page}>
              {totalPageState}
            </PageNumber>
          )}
          <PageNumber onClick={handleNextPage}>
            <StyledNavigationChevronRight size={16} />
          </PageNumber>
        </PaginationWrapper>
      )}
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
  max-height: calc(100vh - 250px);
`

const StyledTable = styled.table<{ expand?: boolean }>`
  ${({ expand }) => (expand ? 'height: calc(100vh - 250px);' : 'height: auto;')}
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
  position: relative;
`

const PaginationWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  z-index: 100;

  background-color: #fff;
`

const PageNumber = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: Circular, sans-serif;
  font-weight: normal;
  font-style: normal;
  width: 30px;
  height: 30px;
  &:hover {
    background: ${({ theme }) => theme.body.humanMessageBgColor};
    border-radius: 5px;
  }
  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
      border: ${({ theme }) => theme.body.border};
      width: 30px;
      height: 30px;
      border-radius: 5px;
    `}
`

const StyledNavigationChevronLeft = styled(NavigationChevronLeft)`
  path {
    color: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledNavigationChevronRight = styled(NavigationChevronRight)`
  path {
    color: ${({ theme }) => theme.body.iconColor};
  }
`
