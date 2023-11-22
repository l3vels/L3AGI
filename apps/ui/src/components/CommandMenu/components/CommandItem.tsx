import styled from 'styled-components'

import CommandItemName from './ItemName'

import Typography from 'share-ui/components/typography/Typography'

import { StyledCommandItem, StyleEnterGroup } from '../CommandMenuStyles'
import { enterIcon } from 'assets/icons'
import API from 'share-ui/components/Icon/Icons/components/API'
import TypographyQuaternary from 'components/Typography/Quaternary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'

type CommandItemProps = {
  index: number
  itemIcon?: any
  name: string
  subTitle?: string
  handleSelect: () => void
  groupName?: string
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
        <TypographyPrimary
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
