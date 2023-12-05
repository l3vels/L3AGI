import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Add from 'share-ui/components/Icon/Icons/components/Add'

import Typography from 'share-ui/components/typography/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'

type ListHeaderProps = {
  title: string
  onAddClick?: () => void
}

const ListHeader = ({ title, onAddClick }: ListHeaderProps) => {
  return (
    <StyledListHeader>
      <TypographySecondary
        value={`${title}s`}
        type={TypographyTypes.LABEL}
        size={TypographySizes.md}
      />
      {onAddClick && (
        <IconButton
          icon={() => (
            <StyledIconWrapper>
              <StyledAddIcon size={30} />
            </StyledIconWrapper>
          )}
          onClick={onAddClick}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
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
