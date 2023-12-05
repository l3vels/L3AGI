import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import DatePicker from 'share-ui/components/DatePicker/DatePicker'

const DatePickerEditor = forwardRef((props: any, ref) => {
  const currentDate = moment(props.value)
  const [date, setDate] = useState(currentDate)
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
      const convertedDate = Object.values(date)[1]
      return convertedDate
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
    //   return date > 1000
    // },
  }))
  return (
    <StyledDiv>
      <DatePicker
        ref={refInput}
        date={date}
        onPickDate={(d: any) => {
          setDate(d)
          props.stopEditing()
        }}
      />
    </StyledDiv>
  )
})

export default DatePickerEditor

const StyledDiv = styled.div`
  width: 0;
  height: 0;
`
