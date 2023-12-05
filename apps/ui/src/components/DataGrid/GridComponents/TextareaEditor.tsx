import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import Textarea from 'share-ui/components/Textarea/Textarea'

import styled from 'styled-components'

const TextareaEditor = forwardRef((props: any, ref) => {
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
    <StyledDiv>
      <Textarea
        setRef={refInput}
        value={value}
        onChange={(event: any) => {
          setValue(event)
        }}
      />
    </StyledDiv>
  )
})

export default TextareaEditor

const StyledDiv = styled.div`
  width: 400px;
  height: 150px;

  backdrop-filter: blur(5px);
`
