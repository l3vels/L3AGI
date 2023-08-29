import { ReactNode } from 'react'

interface columnProps {
  headerName: string
  headerComponentParams?: { icon: ReactNode }
  fieldName: string
  cellEditFn: any
  filter?: any
  cellRenderer?: any
  cellRendererParams?: any
  cellEditor?: any
  cellEditorParams?: any
  icon?: any
  selectAllButton?: boolean
  valueGetter?: any
  rowDrag?: any
  editable?: any
  cellEditorPopup?: any
  resizable: any
  suppressSizeToFit?: any
  width?: any
  minWidth?: any
  checkboxSelection?: any
  headerComponent?: any
}

const columnGenerator = ({
  headerName,
  headerComponentParams,
  fieldName,
  selectAllButton = false,
  editable = true,
  cellEditFn,
  rowDrag = false,
  cellRenderer = null,
  cellRendererParams,
  cellEditor = 'agTextCellEditor',
  cellEditorParams,

  filter = true,
  cellEditorPopup,
  resizable,
  suppressSizeToFit,
  width,
  minWidth,
  checkboxSelection,
  headerComponent,
}: columnProps) => ({
  headerName: headerName,
  headerComponentParams,
  field: fieldName,
  headerCheckboxSelection: selectAllButton,
  editable: editable,
  rowDrag: rowDrag,
  filter: filter,
  resizable: resizable,
  width: width,
  minWidth: minWidth,
  headerComponent: headerComponent,
  suppressSizeToFit: suppressSizeToFit,
  checkboxSelection: checkboxSelection,
  valueSetter: (params: any) => {
    const newValue = params.newValue
    const field = params.colDef.field

    cellEditFn({
      field,
      newValue,
      params,
    })
    return true
  },
  cellRenderer: cellRenderer,
  cellRendererParams: cellRendererParams,
  cellEditor: cellEditor,
  cellEditorParams: cellEditorParams,
  cellEditorPopup: cellEditorPopup,
})

export default columnGenerator
