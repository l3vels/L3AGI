import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type TableCellProps = {
  cell: any
}

const TableCell = ({ cell }: TableCellProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const tableCellRef = useRef<HTMLTableCellElement>(null)
  const multiselectEditorRef = useRef<any>()

  const { column, row, value: cellValue } = cell
  const { original: data } = row
  const { isEdit, cellEditor: Editor, cellEditorParams, valueSetter, maxWidth } = column

  let handleEditMode = null

  if (isEdit) {
    handleEditMode = () => {
      setIsEditing(true)
    }
  }

  const getMultiselectEditorValues = () => {
    // Access the values through the ref
    const values = multiselectEditorRef.current?.getValue()

    if (values === undefined) return

    valueSetter({ newValue: values, data: data })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditing && event.key === 'Enter') {
        getMultiselectEditorValues()
        setIsEditing(false)
        // Add your logic here to handle the Enter key press
      }
      if (isEditing && event.key === 'Escape') {
        // Do whatever when Esc is pressed
        setIsEditing(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (tableCellRef.current && !tableCellRef.current.contains(event.target as Node)) {
        // Clicked outside the component, close editing mode

        getMultiselectEditorValues()

        setIsEditing(false)
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <StyledTd
      ref={tableCellRef}
      {...cell.getCellProps()}
      onClick={handleEditMode}
      maxWidth={maxWidth}
      noPadding={isEditing}
    >
      {isEditing ? (
        <>
          {/* tst */}
          <Editor {...cellEditorParams} value={cellValue} ref={multiselectEditorRef} />
        </>
      ) : (
        cell.render('Cell')
      )}
    </StyledTd>
  )
}

export default TableCell

const StyledTd = styled.td<{ maxWidth: number; noPadding: boolean }>`
  width: 100%;

  padding: ${p => (p.noPadding ? `0px` : `10px`)};

  display: flex;
  align-items: center;
  /* padding: 10px 20px; */

  /* text-align: center; */

  border-right: 1px solid rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  max-width: ${p => (p.maxWidth ? `${p.maxWidth}px` : '100%')};
`
