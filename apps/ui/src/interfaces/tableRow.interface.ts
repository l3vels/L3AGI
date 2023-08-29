export interface ITableRow {
  background?: string
  templateColumns: string
  size?: string
  alignItems?: string
  className: string
  noBorder?: boolean
  onClick?: () => void
  rowDifferentColors?: boolean
  indexNum?: number
}
