import styled from 'styled-components'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

type TableActionButtonsProp = {
  onDeleteClick?: () => void
  onEditClick?: () => void
}

const TableActionButtons = ({ onDeleteClick, onEditClick }: TableActionButtonsProp) => {
  return (
    <StyledTableButtons>
      {onDeleteClick && (
        <IconButton
          onClick={onDeleteClick}
          icon={() => <StyledDeleteIcon />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
          // ariaLabel='Delete'
        />
      )}

      {onEditClick && (
        <IconButton
          onClick={onEditClick}
          icon={() => <StyledEditIcon />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
          // ariaLabel='Edit'
        />
      )}
    </StyledTableButtons>
  )
}

export default TableActionButtons

const StyledTableButtons = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
`
