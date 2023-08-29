import React from 'react'
import get from 'lodash/fp/get'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
`
const StyledTypography = styled.span`
  font-size: 0.625rem;
`

const StyledTableCell = styled.td`
  align-items: center;
  padding: 8px;
  vertical-align: middle;
  box-sizing: border-box;
`

const StyledHeaderRow = styled.tr<{ variant: string }>`
  background-color: ${props => (props.variant === 'primary' ? '#004b70' : '#bdbdbd')};

  ${StyledTypography} {
    color: white;
  }
`

const StyledRow = styled.tr`
  background-color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 4px rgb(0 0 0 / 15%);
  }
`

type primitive<DataType> = DataType[keyof DataType]
type NativeTableProps<DataType> = {
  columns: Record<string, string | React.ReactNode>
  variant?: 'primary' | 'secondary'
  styles?: Record<string, object>
  data: Array<DataType>
  transforms?: Record<keyof DataType | string, (row: DataType) => primitive<DataType>>
  className?: string
  formats?: Record<keyof DataType | string, (value: primitive<DataType>) => string>
  customRenderers?: Record<keyof DataType | string, (row: DataType) => React.ReactNode>
  onRowClick: (row: DataType) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NativeTable = <DataType, K>({
  columns,
  data,
  variant = 'primary',
  styles,
  transforms,
  onRowClick,
  formats,
  className,
  customRenderers,
}: NativeTableProps<DataType>) => (
  <StyledTable className={className}>
    <thead>
      <StyledHeaderRow variant={variant}>
        {Object.keys(columns).map(key => (
          <StyledTableCell key={key}>
            {typeof columns[key] === 'string' ? (
              <StyledTypography>{columns[key]}</StyledTypography>
            ) : (
              columns[key]
            )}
          </StyledTableCell>
        ))}
      </StyledHeaderRow>
    </thead>

    <tbody>
      {data.map((row: DataType, i: number) => (
        <StyledRow key={`trow${i}`} onClick={() => onRowClick(row)}>
          {Object.keys(columns)
            .map(key => key as keyof DataType)
            .map((key, j) => {
              const transform = transforms && transforms[key]
              const format = formats && formats[key]
              const customRenderer = customRenderers && customRenderers[key]
              if (customRenderer) {
                return (
                  <StyledTableCell style={get(key, styles)} key={`th${i}_${j}`}>
                    {customRenderer(row)}
                  </StyledTableCell>
                )
              }

              const cellValue: any = transform ? transform(row) : get(key, row)
              const formattedCellValue = format ? format(cellValue) : cellValue

              return (
                <StyledTableCell style={get(key, styles)} key={`th${i}_${j}`}>
                  <span>{formattedCellValue}</span>
                </StyledTableCell>
              )
            })}
        </StyledRow>
      ))}
    </tbody>
  </StyledTable>
)

export default NativeTable
