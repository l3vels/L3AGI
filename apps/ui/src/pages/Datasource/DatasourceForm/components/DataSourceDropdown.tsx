import styled from 'styled-components'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import HelpIcon from '@l3-lib/ui-core/dist/icons/Help'

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
    return (
      <Typography
        value={label}
        type={Typography.types.LABEL}
        size={optionSize}
        customColor={'#FFF'}
      />
    )
  }

  return (
    <StyledWrapper>
      <StyledHeader>
        <Typography
          value={label}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor={'#FFF'}
        />
        {onHelpClick && (
          <IconButton
            onClick={onHelpClick}
            icon={HelpIcon}
            kind={IconButton.kinds.SECONDARY}
            ariaLabel='Help'
            size={IconButton.sizes.XXS}
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
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
