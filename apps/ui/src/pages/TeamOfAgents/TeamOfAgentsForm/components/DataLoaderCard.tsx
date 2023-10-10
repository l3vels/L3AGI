import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Help from '@l3-lib/ui-core/dist/icons/Help'
import TypographyPrimary from 'components/Typography/Primary'

type DataLoaderCardProps = {
  title: string
  onClick: () => void
  isSelected: boolean
  isActive: boolean
  onHelpClick?: () => void
}

const DataLoaderCard = ({
  title,
  onClick,
  isSelected,
  isActive,
  onHelpClick,
}: DataLoaderCardProps) => {
  return (
    <StyledDataLoaderCard
      onClick={() => {
        if (isActive) {
          onClick()
        }
      }}
      isSelected={isSelected}
      isActive={isActive}
    >
      <TypographyPrimary value={title} type={Typography.types.LABEL} size={Typography.sizes.md} />

      {onHelpClick && (
        <IconButton
          onClick={onHelpClick}
          icon={Help}
          kind={IconButton.kinds.SECONDARY}
          // ariaLabel='Help'
          size={IconButton.sizes.XXS}
        />
      )}
    </StyledDataLoaderCard>
  )
}

export default DataLoaderCard

const StyledDataLoaderCard = styled.div<{ isSelected: boolean; isActive: boolean }>`
  flex-grow: 1;
  height: 50px;
  min-height: 50px;
  min-width: fit-content;

  padding: 0 5px;

  border-radius: 8px;
  border: 2px solid transparent;

  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);

  background: rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 8px;

  cursor: pointer;

  ${p =>
    !p.isActive &&
    css`
      opacity: 0.6;
    `}

  ${p =>
    p.isSelected &&
    css`
      border-color: #48ecf0;
    `};
`
