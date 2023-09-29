import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import Typography from '@l3-lib/ui-core/dist/Typography'

type ListHeaderProps = {
  title: string
  onAddClick?: () => void
}

const ListHeader = ({ title, onAddClick }: ListHeaderProps) => {
  return (
    <StyledListHeader>
      <Typography
        value={`${title}s`}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor={'rgba(255, 255, 255, 0.8)'}
      />
      {onAddClick && (
        <IconButton
          icon={() => (
            <StyledIconWrapper>
              <Add size={30} />
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
`
const StyledIconWrapper = styled.div`
  color: transparent;
`
