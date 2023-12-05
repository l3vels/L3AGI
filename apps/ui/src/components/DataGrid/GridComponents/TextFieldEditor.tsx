import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import TextField from 'share-ui/components/TextField/TextField'
import styled from 'styled-components'

const TextFieldEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value)
  const refInput = useRef(null as any)

  useEffect(() => {
    // focus on the input
    refInput.current.focus()
  }, [])

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => ({
    // the final value to send to the grid, on completion of editing
    getValue() {
      // this simple editor doubles any value entered into the input
      return value
    },

    // Gets called once before editing starts, to give editor a chance to
    // cancel the editing before it even starts.
    isCancelBeforeStart() {
      return false
    },

    // Gets called once when editing is finished (eg if Enter is pressed).
    // If you return true, then the result of the edit will be ignored.
    // isCancelAfterEnd() {
    //   // our editor will reject any value greater than 1000
    //   return value > 1000
    // },
  }))

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <StyledTextField
        type={TextField.types?.TEXT}
        setRef={refInput}
        value={value}
        onChange={(event: any) => {
          setValue(event)
        }}
        //   style={{ width: '100%' }}
        size={'medium'}
      />
    </div>
  )
})

export default TextFieldEditor

const StyledTextField = styled(TextField)`
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 500 !important;
`
