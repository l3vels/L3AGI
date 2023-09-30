import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'

type OptionRendererProps = {
  label: string
}

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

  // .map((item: any) => item.label)
  // console.log('res', res)
  // if (realValues) {
  //   //  realValues.map((item: any) => <div>{item}</div>)
  //   console.log('realValues', realValues)
  // }

  const [value, setValue] = useState(filteredValues)
  const refInput = useRef(null as any)
  // console.log('props', props)
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

  const OptionRenderer = ({ label }: OptionRendererProps) => {
    return (
      <TypographyPrimary value={label} type={Typography.types.LABEL} size={Typography.sizes.md} />
    )
  }

  return (
    <StyledDiv>
      <StyledDropDown
        ref={refInput}
        options={options}
        openMenuOnFocus={true}
        onChange={setValue}
        onOptionRemove={optionRemoveHandler}
        value={value as any}
        menuPlacement={'auto'}
        // menuPortalTarget={document.body}
        multi={props.isMulti}
        multiline={props.isMultiLine}
        size={Dropdown.size.SMALL}
        // insideOverflowContainer
        insideOverflowWithTransformContainer
        optionRenderer={OptionRenderer}
        menuPortalTarget={document.body} // Render the dropdown outside the grid
        menuPosition={'fixed'}
      />
    </StyledDiv>
  )
})

export default MultiselectEditor

const StyledDiv = styled.div`
  width: 100%;
`

const StyledDropDown = styled(Dropdown)`
  /* background: #5d6a7d !important; */
  /* backdrop-filter: blur(5px) !important; */
  width: 100%;
`
