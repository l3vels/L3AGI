import { useState } from 'react'
import styled from 'styled-components'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type SessionDropdownProps = {
  label: string
  options: any
  isMulti?: boolean
  placeholder: string
  onChange?: any
}

const SessionDropdown = ({
  // label,
  options,
  isMulti,
  placeholder,
  onChange,
}: SessionDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string | string[] | null>(null)

  const onChangeFunction = (option: any) => {
    if (isMulti) {
      setSelectedValue(option || []) // Ensure option is always an array
    } else {
      setSelectedValue(option?.value || null)
    }

    // Call the onChange prop
    if (onChange) {
      onChange(isMulti ? (option || []).map((opt: any) => opt.value) : option?.value)
    }
  }

  const onOptionRemove = (removedValue: any) => {
    if (isMulti && Array.isArray(selectedValue)) {
      const newValues = selectedValue.filter(oldValue => oldValue !== removedValue)

      setSelectedValue([...newValues])

      // Call the onChange prop
      if (onChange) {
        onChange(newValues.map((value: any) => value.value))
      }
    }
  }

  const OptionRenderer = ({ label }: { label: string }) => {
    return <TypographyPrimary value={label} type={Typography.types.LABEL} size='medium' />
  }

  return (
    <StyledWrapper>
      <Dropdown
        multi={isMulti}
        insideOverflow
        multiline
        size={Dropdown.size.MEDIUM}
        value={selectedValue}
        placeholder={
          options?.find((item: any) => item.value === selectedValue)?.label || placeholder
        }
        options={options}
        onChange={onChangeFunction}
        onOptionRemove={onOptionRemove}
        OptionRenderer={OptionRenderer}
      />
    </StyledWrapper>
  )
}

export default SessionDropdown

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`
