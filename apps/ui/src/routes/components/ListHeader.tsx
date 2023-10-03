import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'

type ListHeaderProps = {
  title: string
  onAddClick?: () => void
}

const ListHeader = ({ title, onAddClick }: ListHeaderProps) => {
  return (
    <StyledListHeader>
      <TypographySecondary
        value={`${title}s`}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
      />
      {onAddClick && (
        <IconButton
          icon={() => (
            <StyledIconWrapper>
              <StyledAddIcon size={30} />
            </StyledIconWrapper>
          )}
          onClick={onAddClick}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
          ariaLabel={`Add ${title}`}
        />
      )}
    </StyledListHeader>
  )
}

export default ListHeader

const StyledListHeader = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  width: 100%;

  min-height: 50px;
`
const StyledIconWrapper = styled.div`
  color: transparent;
`
