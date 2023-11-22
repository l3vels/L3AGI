import React, { useState } from 'react'
import moment from 'moment'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { YEAR_FORMAT } from '../constants'
import DateNavigationItemComponent from '../DateNavigationItem/DateNavigationItem'
import { Moment, Direction } from '../types'

import { calcNewYearsPage } from '../date-picker-utils'
import YearsList from './YearsList'

const transitionOptions = {
  classNames: 'slide-down',
  timeout: { enter: 400, exit: 400 },
}

const PAGE_SIZE = 12
const BUFFER_FROM_CURRENT_YEAR = 4
interface YearPickerProps {
  selectedDate?: Moment
  isYearBlocked?: (year: number) => boolean
  changeCurrentDate: (date: Moment) => void
  'data-testid'?: string
}

const YearPicker = ({
  selectedDate,
  isYearBlocked,
  changeCurrentDate,
  'data-testid': dateTestId,
}: YearPickerProps) => {
  const selectedYear = selectedDate
    ? selectedDate.format(YEAR_FORMAT)
    : moment().format(YEAR_FORMAT)

  const [yearsToDisplay, setYearsToDisplay] = useState(
    calcNewYearsPage(parseInt(selectedYear) - BUFFER_FROM_CURRENT_YEAR, PAGE_SIZE),
  )

  const onYearNavigationClick = (direction: Direction) => {
    const firstYearInPage = yearsToDisplay[0]
    let newYearsArray: number[] = []
    if (direction === Direction.prev) {
      newYearsArray = calcNewYearsPage(firstYearInPage - PAGE_SIZE, PAGE_SIZE)
    } else if (direction === Direction.next) {
      newYearsArray = calcNewYearsPage(firstYearInPage + PAGE_SIZE, PAGE_SIZE)
    }
    setYearsToDisplay(newYearsArray)
  }

  const onYearSelect = (year: number) => {
    changeCurrentDate(moment().year(year))
  }

  return (
    <div data-testid={`${dateTestId}-year-picker`}>
      <div>
        <DateNavigationItemComponent
          kind={Direction.prev}
          onClick={() => onYearNavigationClick(Direction.prev)}
        />
      </div>
      <div>
        <DateNavigationItemComponent
          kind={Direction.next}
          onClick={() => onYearNavigationClick(Direction.next)}
        />
      </div>
      <CSSTransition {...transitionOptions} in appear>
        <div>
          <YearsList
            selectedYear={selectedYear}
            onSelect={onYearSelect}
            yearsItems={yearsToDisplay}
            isYearBlocked={isYearBlocked}
          />
        </div>
      </CSSTransition>
    </div>
  )
}

export default YearPicker
