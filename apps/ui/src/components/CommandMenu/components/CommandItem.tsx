import styled from 'styled-components'

import CommandItemName from './ItemName'

import Typography from '@l3-lib/ui-core/dist/Typography'

import { StyledCommandItem, StyleEnterGroup } from '../CommandMenuStyles'
import { enterIcon } from 'assets/icons'
import API from '@l3-lib/ui-core/dist/icons/API'

type CommandItemProps = {
  index: number
  itemIcon?: any
  name: string
  subTitle?: string
  handleSelect: () => void
  groupName: string
}

const CommandItem = ({
  index,
  itemIcon = <API />,
  name,
  subTitle,
  handleSelect,
  groupName,
}: CommandItemProps) => {
  return (
    <StyledCommandItem onSelect={handleSelect}>
      <StyledTextWrapper>
        <CommandItemName index={index}>
          {itemIcon}
          {name}
        </CommandItemName>
        <Typography
          value={subTitle}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'rgba(255, 255, 255, 0.4)'}
        />
      </StyledTextWrapper>
      <StyledTextWrapper>
        {/* <StyleEnterGroup>
          <img src={enterIcon} alt='click enter' />
        </StyleEnterGroup> */}
        <Typography
          value={groupName}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'rgba(255, 255, 255, 0.4)'}
        />
      </StyledTextWrapper>
    </StyledCommandItem>
  )
}

export default CommandItem

const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
`
