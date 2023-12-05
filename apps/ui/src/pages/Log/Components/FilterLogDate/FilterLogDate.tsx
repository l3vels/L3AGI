import styled from 'styled-components'

import DatePicker from 'share-ui/components/DatePicker/DatePicker'

import { useState } from 'react'
import useLog from 'pages/Log/useLog'

const FilterLogDate = ({ onClose, start_date, end_date, onChange }: any) => {
  const [date, setDate] = useState<any>([])

  const { log_list, filter } = useLog()

  return (
    <>
      <StyledContainer>
        <DatePicker
          date={date.startDate}
          endDate={date.endDate}
          range
          kind='secondary'
          data-testid='date-picker'
          onPickDate={(d: any) => setDate(d)}
          onClear={() =>
            setDate({
              startDate: null,
              endDate: null,
            })
          }
        />
      </StyledContainer>
    </>
  )
}

export default FilterLogDate

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  position: absolute;
  width: fit-content;
  height: fit-content;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  left: 210px;
  top: 50px;
  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`
