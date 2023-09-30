import styled from 'styled-components'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type AgentDropdownProps = {
  label: string
  fieldName: string
  fieldValue: string | string[]
  options: any
  setFieldValue: any
  onChange?: () => void
  optionSize?: 'large' | 'medium' | 'small'
  isMulti?: boolean
}

const AgentDropdown = ({
  fieldValue,
  fieldName,
  options,
  setFieldValue,
  onChange = () => {},
  label,
  isMulti,
  optionSize = 'medium',
}: AgentDropdownProps) => {
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
      <TypographyPrimary value={label} type={Typography.types.LABEL} size={Typography.sizes.md} />
      <Dropdown
        multi={isMulti}
        menuPlacement={'top'}
        // insideOverflow
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

export default AgentDropdown

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
