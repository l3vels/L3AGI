import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'

// import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'
// import TypographyPrimary from 'components/Typography/Primary'

// type OptionRendererProps = {
//   label: string
// }

// eslint-disable-next-line react/display-name
const MultiselectEditor = forwardRef((props: any, ref) => {
  let filteredValues

  if (props.isMulti) {
    filteredValues = props.optionsArr?.filter((item: any) =>
      props?.value?.map((value: any) => value.id).includes(item.value),
    )
  } else {
    filteredValues = props.optionsArr?.filter((item: any) => props.value?.includes(item.value))
  }
  const [value, setValue] = useState(filteredValues)
  const refInput = useRef(null as any)
  useEffect(() => {
    // focus on the input
    refInput.current?.focus()
  }, [])

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => ({
    // the final value to send to the grid, on completion of editing
    getValue() {
      if (!props.isMulti) {
        return value ? value.value : ''
      } else {
        return value
          ? value.map((item: any) => {
              if (item.min) {
                return { id: item.value, value: item.min }
              } else {
                return { id: item.value }
              }
            })
          : []
      }
    },

    // Gets called once before editing starts, to give editor a chance to
    // cancel the editing before it even starts.
    isCancelBeforeStart() {
      return false
    },

    // Gets called once when editing is finished (eg if Enter is pressed).
    // If you return true, then the result of the edit will be ignored.
    isCancelAfterEnd() {
      // our editor will reject any value greater than 1000
      return value > 1000
    },
  }))

  const options = props?.optionsArr?.map((value: any) => {
    if (value.min) {
      return {
        label: value.label,
        value: value.value,
        min: value.min,
      }
    } else {
      return { label: value.label, value: value.value }
    }
  })

  const optionRemoveHandler = (item: any) => {
    const newValues = value.filter((oldValues: any) => oldValues !== item)
    setValue(newValues)
  }

  // const OptionRenderer = ({ label }: OptionRendererProps) => {
  //   return (
  //     <TypographyPrimary value={label} type={Typography.types.LABEL} size={Typography.sizes.md} />
  //   )
  // }

  return (
    <StyledDiv>
      <Dropdown
        size={Dropdown.size.SMALL}
        ref={refInput}
        options={options}
        openMenuOnFocus={true}
        onChange={setValue}
        onOptionRemove={optionRemoveHandler}
        value={value as any}
        menuPlacement={'auto'}
        multi={props.isMulti}
        multiline={props.isMultiLine}
        insideOverflowWithTransformContainer
        menuPortalTarget={document.body}
      />
    </StyledDiv>
  )
})

export default MultiselectEditor

const StyledDiv = styled.div`
  width: 100%;

  background: #585858;
`
