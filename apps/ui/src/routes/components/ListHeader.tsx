import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import {
  StyledMenuButtonsWrapper,
  StyledMenuDots,
} from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import { ButtonTertiary } from 'components/Button/Button'

type ListHeaderProps = {
  title: string
  onAddClick?: () => void
  multiOption?: { label: string; function: () => void }[]
}

const ListHeader = ({ title, onAddClick, multiOption }: ListHeaderProps) => {
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

      {multiOption && (
        <StyledMenuDots>
          <MenuButton component={StyledAddIcon} closeDialogOnContentClick>
            <StyledMenuButtonsWrapper>
              {multiOption.map((item: any, index: number) => {
                return (
                  <ButtonTertiary
                    key={index}
                    onClick={item.function}
                    size={Button.sizes.SMALL}
                    ariaLabel={`Add ${title}`}
                  >
                    {item.label}
                  </ButtonTertiary>
                )
              })}
            </StyledMenuButtonsWrapper>
          </MenuButton>
        </StyledMenuDots>
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
