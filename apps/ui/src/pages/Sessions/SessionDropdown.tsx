import { memo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type SessionDropdownProps = {
  label: string
  options: any
  isMulti?: boolean
  placeholder: string
  onChange?: any
  value: any
}

const SessionDropdown = ({
  // label,
  options,
  isMulti,
  placeholder,
  onChange,
  value,
}: SessionDropdownProps) => {
  const theme = useTheme()

  const optionRemoveHandler = (item: any) => {
    const newValues = value.filter((oldValues: any) => oldValues !== item)
    onChange(newValues)
  }

  const OptionRenderer = ({ label }: { label: string }) => {
    return (
      <TypographyPrimary
        value={label}
        type={Typography.types.LABEL}
        size='medium'
        customColor={theme.typography.contentPrimary}
      />
    )
  }

  return (
    <StyledWrapper>
      <Dropdown
        multi={isMulti}
        insideOverflow
        multiline
        size={Dropdown.size.MEDIUM}
        value={value}
        placeholder={value?.label || placeholder}
        options={options}
        onChange={onChange}
        onOptionRemove={optionRemoveHandler}
        OptionRenderer={OptionRenderer}
      />
    </StyledWrapper>
  )
}

export default memo(SessionDropdown)

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`
