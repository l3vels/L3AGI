import styled from 'styled-components'
import IconButton from 'share-ui/components/IconButton/IconButton'

import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

type TableActionButtonsProp = {
  onDeleteClick?: () => void
  onEditClick?: () => void
  customActions?: any
}

const TableActionButtons = ({
  onDeleteClick,
  onEditClick,
  customActions,
}: TableActionButtonsProp) => {
  return (
    <StyledTableButtons>
      {onDeleteClick && (
        <IconButton
          onClick={onDeleteClick}
          icon={() => <StyledDeleteIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel='Delete'
        />
      )}

      {onEditClick && (
        <IconButton
          onClick={onEditClick}
          icon={() => <StyledEditIcon />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel='Edit'
        />
      )}

      {customActions && customActions}
    </StyledTableButtons>
  )
}

export default TableActionButtons

const StyledTableButtons = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
`
