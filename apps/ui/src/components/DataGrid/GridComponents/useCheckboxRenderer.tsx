import { useCallback, useState } from 'react'
import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import styled from 'styled-components'

const useCheckboxRenderer = () => {
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  const HeaderCheckbox = useCallback((p: any) => {
    const handleCheckboxChange = () => {
      const selectedRows = p.api.getSelectedRows()
      const allRows = p.api.getModel().gridOptionsWrapper.gridOptions.rowData
      if (selectedRows.length === allRows.length) {
        p.api.deselectAll()
        setChecked(false)
      } else {
        p.api.selectAll()
        setChecked(true)
        setIndeterminate(false)
      }
      p.api.refreshCells(p)
    }
    const selectedRows = p.api.getSelectedRows()
    const allRows = p.api.getModel().gridOptionsWrapper.gridOptions.rowData

    return (
      <StyledDiv>
        <Checkbox
          indeterminate={
            selectedRows.length &&
            selectedRows.length !== allRows.length &&
            selectedRows.length !== 0
          }
          checked={selectedRows.length === allRows.length && allRows.length > 0}
          size='small'
          kind='secondary'
          onChange={handleCheckboxChange}
        />
      </StyledDiv>
    )
  }, [])

  const RowCheckbox = useCallback((p: any) => {
    const handleCheckboxChange = () => {
      if (p.node.isSelected()) {
        p.node.setSelected(false)
        setIndeterminate(true)
        const selectedRows = p.api.getSelectedRows()
        if (selectedRows.length === 0) {
          setIndeterminate(false)
          setChecked(false)
        }
      } else if (!p.node.isSelected()) {
        p.node.setSelected(true)
        setIndeterminate(true)
        const selectedRows = p.api.getSelectedRows()
        const allRows = p.api.getModel().gridOptionsWrapper.gridOptions.rowData
        if (selectedRows.length === allRows.length) {
          setIndeterminate(false)
          setChecked(true)
        }
      }
      p.api.refreshCells(p)
    }

    return (
      <StyledDiv>
        <Checkbox
          size='small'
          kind='secondary'
          checked={p.node.isSelected()}
          onChange={handleCheckboxChange}
        />
      </StyledDiv>
    )
  }, [])

  return {
    HeaderCheckbox,
    RowCheckbox,
  }
}

export default useCheckboxRenderer

const StyledDiv = styled.div`
  margin: 10px;
  margin-top: 13px;
`
