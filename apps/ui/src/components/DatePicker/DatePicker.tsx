import React, { useCallback, useRef } from 'react'
import DatePicker from '@l3-lib/ui-core/dist/DatePicker'
import Button from '@l3-lib/ui-core/dist/Button'
import styled from 'styled-components'
import outsideClick from 'helpers/outsideClick'
import Calendar from '@l3-lib/ui-core/dist/icons/Calendar'
import { ButtonSecondary } from 'components/Button/Button'

const DatePickerField = ({ start_date, end_date, onChange }: any) => {
  const [is_open, setIsOpen] = React.useState(false)

  const ref = useRef(null)

  outsideClick(ref, () => {
    if (is_open) setIsOpen(false)
  })

  return (
    <StyledContainer ref={ref}>
      <ButtonSecondary leftIcon={() => <Calendar />} onClick={() => setIsOpen(true)}>
        Date
      </ButtonSecondary>
      {is_open && (
        <StyledPickerContainer>
          <DatePicker
            kind='secondary'
            date={start_date}
            endDate={end_date}
            range
            data-testid='date-picker'
            onPickDate={onChange}
          />
        </StyledPickerContainer>
      )}
    </StyledContainer>
  )
}

export default DatePickerField

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledPickerContainer = styled.div`
  position: absolute;
  position: absolute;
  top: 106%;
  left: -50%;
`
