import styled from 'styled-components'

import CommandItemName from './ItemName'

import Typography from '@l3-lib/ui-core/dist/Typography'

import { StyledCommandItem, StyleEnterGroup } from '../CommandMenuStyles'
import { enterIcon } from 'assets/icons'
import API from '@l3-lib/ui-core/dist/icons/API'
import TypographyQuaternary from 'components/Typography/Quaternary'

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
        <TypographyQuaternary
          value={subTitle}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledTextWrapper>
      <StyledTextWrapper>
        {/* <StyleEnterGroup>
          <img src={enterIcon} alt='click enter' />
        </StyleEnterGroup> */}
        <TypographyQuaternary
          value={groupName}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
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
