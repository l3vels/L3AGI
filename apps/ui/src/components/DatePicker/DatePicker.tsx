import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'share-ui/components/DatePicker/DatePicker'
import Button from 'share-ui/components/Button/Button'
import styled from 'styled-components'
import outsideClick from 'helpers/outsideClick'
import Calendar from 'share-ui/components/Icon/Icons/components/Calendar'
import { ButtonSecondary } from 'components/Button/Button'

const DatePickerField = ({ start_date, end_date, onChange, onApply, onClear }: any) => {
  // const { t } = useTranslation()
  const [is_open, setIsOpen] = React.useState(false)

  const ref = useRef(null)

  outsideClick(ref, () => {
    if (is_open) setIsOpen(false)
  })

  const formattedStartDate = start_date ? start_date.format('MMM D, YYYY h:mm A') : ''
  const formattedEndDate = end_date ? end_date.format('MMM D, YYYY h:mm A') : ''

  const displayValue = start_date && end_date ? `${formattedStartDate} - ${formattedEndDate}` : ''
  const placeholder = start_date && end_date ? 'Select date range...' : 'Start date → End date'

  return (
    <StyledContainer ref={ref}>
      <StyledSearchContainer>
        <StyledSearchInput value={displayValue} placeholder={placeholder} disabled />
        <StyledCalendarIcon onClick={() => setIsOpen(true)} />
      </StyledSearchContainer>
      {/* <ButtonSecondary leftIcon={() => <Calendar />} onClick={() => setIsOpen(true)}>
        {t('date')}
      </ButtonSecondary> */}
      {is_open && (
        <StyledPickerContainer>
          <DatePicker
            date={start_date}
            endDate={end_date}
            range
            onApply={onApply}
            onClear={() => {
              onClear()
              onChange({ startDate: null, endDate: null })
            }}
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

const StyledSearchInput = styled.input`
  color: ${({ theme }) => theme.body.textColorSecondary} !important;
  background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary} !important;
  border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
  min-width: 390px;
  height: 48px;
  border-radius: 8px;
  padding-left: 15px;
  padding-right: 40px;
`
const StyledSearchContainer = styled.div`
  position: relative;
`
const StyledCalendarIcon = styled(Calendar)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
