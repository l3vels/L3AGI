import outsideClick from 'helpers/outsideClick'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type TableCellProps = {
  cell: any
}

const TableCell = ({ cell }: TableCellProps) => {
  const ref = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  const multiselectEditorRef = useRef<any>()

  outsideClick(ref, () => {
    if (isEditing) {
      setIsEditing(false)
      getMultiselectEditorValues()
    }
  })

  const { column, row } = cell
  const { original: data } = row
  const { isEdit, cellEditor: Editor, cellEditorParams, valueSetter } = column

  let handleEditMode = null

  if (isEdit) {
    handleEditMode = () => {
      setIsEditing(true)
    }
  }

  const getMultiselectEditorValues = () => {
    // Access the values through the ref
    const values = multiselectEditorRef.current?.getValue()

    valueSetter({ newValue: values, data: data })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditing && event.key === 'Enter') {
        getMultiselectEditorValues()
        setIsEditing(false)
        // Add your logic here to handle the Enter key press
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isEditing])

  return (
    <StyledTd {...cell.getCellProps()} onClick={handleEditMode}>
      {isEditing ? (
        <Editor {...cellEditorParams} ref={multiselectEditorRef} />
      ) : (
        cell.render('Cell')
      )}
    </StyledTd>
  )
}

export default TableCell

const StyledTd = styled.td`
  width: 100%;

  /* padding: 10px 20px; */

  /* text-align: center; */

  border-right: 1px solid rgba(0, 0, 0, 0.2);

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
const StyledDiv = styled.div`
  background: red;

  width: 100%;
  height: 100%;
`
