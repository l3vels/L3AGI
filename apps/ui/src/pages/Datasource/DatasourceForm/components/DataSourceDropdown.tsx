import styled from 'styled-components'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'

import Typography from 'share-ui/components/typography/Typography'
import IconButton from 'share-ui/components/IconButton/IconButton'

import HelpIcon from 'share-ui/components/Icon/Icons/components/Help'
import TypographyPrimary from 'components/Typography/Primary'

type DataSourceDropdownProps = {
  label: string
  fieldName: string
  fieldValue: string | string[]
  options: any
  setFieldValue: any
  onChange?: () => void
  optionSize?: 'large' | 'medium' | 'small'
  isMulti?: boolean
  onHelpClick?: () => void
}

const DataSourceDropdown = ({
  fieldValue,
  fieldName,
  options,
  setFieldValue,
  onChange = () => {},
  label,
  isMulti,
  optionSize = 'medium',
  onHelpClick,
}: DataSourceDropdownProps) => {
  let value = fieldValue

  let onChangeFunction = (option: any) => {
    onChange()
    setFieldValue(fieldName, option.value)
  }

  if (isMulti) {
    value = options?.filter((option: any) => fieldValue?.includes(option.value))

    onChangeFunction = (option: any) => {
      onChange()
      if (option === null) {
        setFieldValue(fieldName, [])
      } else {
        const values = option?.map((option: any) => {
          return option.value
        })
        setFieldValue(fieldName, [...values])
      }
    }
  } else {
    value = options?.find((option: any) => option.value === fieldValue)
  }

  const onOptionRemove = (removedValue: any) => {
    if (Array.isArray(fieldValue)) {
      const newValues = fieldValue?.filter((oldValues: any) => oldValues !== removedValue.value)
      setFieldValue(fieldName, [...newValues])
    }
  }

  const OptionRenderer = ({ label }: { label: string }) => {
    return <TypographyPrimary value={label} type={Typography.types.LABEL} size={optionSize} />
  }

  return (
    <StyledWrapper>
      <StyledHeader>
        <TypographyPrimary value={label} type={Typography.types.LABEL} size={Typography.sizes.md} />
        {onHelpClick && (
          <IconButton
            onClick={onHelpClick}
            icon={HelpIcon}
            kind={IconButton.kinds?.SECONDARY}
            ariaLabel='Help'
            size={IconButton.sizes?.XXS}
          />
        )}
      </StyledHeader>
      <Dropdown
        multi={isMulti}
        menuPlacement={'top'}
        multiline
        size={Dropdown.size.MEDIUM}
        value={value}
        placeholder={value}
        options={options}
        onChange={onChangeFunction}
        onOptionRemove={onOptionRemove}
        OptionRenderer={OptionRenderer}
      />
    </StyledWrapper>
  )
}

export default DataSourceDropdown

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  .css-7xl64p-container {
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    min-height: 55px;
    background: ${({ theme }) => theme.body.dropdownBgColor};
  }
  .menu.dropdown-menu-wrapper.css-19zapvn-menu {
    background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
    color: ${({ theme }) => theme.body.textColorPrimary};
    border: ${({ theme }) => theme.body.border};
  }
  .css-1aqeloh-singleValue {
    color: ${({ theme }) => theme.body.textColorPrimary};
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

  .dropdown-indicator.css-bfmogb-indicatorContainer {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
