import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type AgentDropdownProps = {
  label: string
  fieldName: string
  fieldValue: string | string[]
  options: any
  setFieldValue: any
  onChange?: (option: any) => void
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
  const { t } = useTranslation()
  let value = fieldValue

  let onChangeFunction = (option: any) => {
    onChange(option)
    setFieldValue(fieldName, option.value)
  }

  if (isMulti) {
    value = options?.filter((option: any) => fieldValue?.includes(option.value))

    onChangeFunction = (option: any) => {
      onChange(option)
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
    value = options?.find((option: any) => option.value === fieldValue)?.label
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
        placeholder={value?.length >= 1 ? value : `${t('please-enter-value')}`}
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
  .css-xrcw8y-container {
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
   
}

.css-ugu73m-placeholder {
  color: ${({ theme }) => theme.body.placeHolderColor};
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

  .dropdown-indicator.css-12prnvf-indicatorContainer{
    path{
      fill:${({ theme }) => theme.body.iconColor}}
    } 
  }

  .components-Tags-Tags-module__tags--qonKr {
     background: ${({ theme }) => theme.body.textColorPrimary}!important;
    path{
       fill:${({ theme }) => theme.body.toolkitCardBgColorTertiary}}
    } 
  }

  .components-Tags-Tags-module__tags--qonKr .components-Tags-Tags-module__label--gC1wk{ 
     color: ${({ theme }) => theme.body.textColorTertiary}!important;
  }  

  .l3-dropdown_scrollable-wrapper {
    &::placeholder {
      color: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
`
