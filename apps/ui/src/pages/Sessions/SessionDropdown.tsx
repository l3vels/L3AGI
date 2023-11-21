import React, { useState } from 'react'
import styled from 'styled-components'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type SessionDropdownProps = {
  label: string
  options: any
  isMulti?: boolean
  placeholder: string
  onChange?: (selectedValues: string[]) => any
}

const SessionDropdown = ({
  label,
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
        size={Dropdown.size.SMALL}
        value={selectedValue}
        placeholder={placeholder}
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

  .css-xrcw8y-container {
    border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
    // width: 300px;
    // height: 48px;

    border-radius: 8px;
  }

  .css-ugu73m-placeholder {
    color: ${({ theme }) => theme.body.textColorSecondary};
  }

  .menu {
    z-index: 10;
  }

  .menu.dropdown-menu-wrapper.css-19zapvn-menu {
    background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
    color: ${({ theme }) => theme.body.textColorPrimary};
    border: ${({ theme }) => theme.body.border};
  }

  .dropdown-wrapper__option--reset {
    &:hover {
      color: ${({ theme }) => theme.body.placeHolderColor};
      background: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
  .clear-indicator.css-1rycjgo {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }

  .dropdown-indicator.css-12prnvf-indicatorContainer {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }

  .components-Tags-Tags-module__tags--qonKr {
    background: ${({ theme }) => theme.body.textColorPrimary}!important;
    path {
      fill: ${({ theme }) => theme.body.toolkitCardBgColorTertiary};
    }
  }

  .components-Tags-Tags-module__tags--qonKr .components-Tags-Tags-module__label--gC1wk {
    color: ${({ theme }) => theme.body.textColorTertiary}!important;
  }

  .l3-dropdown_scrollable-wrapper {
    // height: 44px;
    &::placeholder {
      color: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
  .css-z3s7sx-control {
    // height: 44px;
  }

  .css-wxpx7r-menu {
    background-color: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
  }

  .dropdown-wrapper.primary__wrapper.css-7xl64p-container {
    border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
    // height: 44px;
    border-radius: 8px;
  }
  css-99wu5k {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
  .css-1mm2o3n-indicatorContainer {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
  .css-99wu5k {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
  .css-1mm2o3n-indicatorContainer svg {
    background: red 1important;
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
  .css-7zxlu9-indicatorContainer {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
  .css-12prnvf-indicatorContainer svg {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
`
