import { v4 as uuid } from 'uuid'

const processDataFromClipboard = (params: any, gridRef: any): string[][] | null => {
  const data = [...params.data]
  const emptyLastRow = data[data.length - 1][0] === '' && data[data.length - 1].length === 1
  if (emptyLastRow) {
    data.splice(data.length - 1, 1)
  }
  const lastIndex = gridRef.current!.api.getModel().getRowCount() - 1
  const focusedCell = gridRef.current!.api.getFocusedCell()
  const focusedIndex = focusedCell!.rowIndex
  if (focusedIndex + data.length - 1 > lastIndex) {
    const resultLastIndex = focusedIndex + (data.length - 1)
    const numRowsToAdd = resultLastIndex - lastIndex
    const rowsToAdd: any[] = []
    for (let i = 0; i < numRowsToAdd; i++) {
      const index = data.length - 1
      const row = data.slice(index, index + 1)[0]
      // Create row object
      const rowObject: any = {}
      let currentColumn: any = focusedCell!.column
      row.forEach((item: any) => {
        if (!currentColumn) {
          return
        }
        rowObject[currentColumn.colDef.field] = item
        currentColumn = gridRef.current!.columnApi.getDisplayedColAfter(currentColumn)
      })
      rowObject.guid = uuid()
      rowsToAdd.push(rowObject)
    }
    gridRef.current!.api.applyTransaction({ add: rowsToAdd })
  }
  return data
}

export default processDataFromClipboard
