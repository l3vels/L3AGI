import React, { useMemo } from 'react'
import { debounce } from 'lodash-es'
import TextField from '../TextField/TextField'
import { useSliderActions, useSliderSelection } from './SliderContext'
import cx from 'classnames'
import { InfixKind, SliderTextSize } from './SliderConstants'
import L3ComponentProps from '../../types/L3ComponentProps'

const VALUE_UPDATE_DELAY = 300

function getCurrentLabel(
  isPostfix: boolean,
  isTextFix: boolean,
  ranged: boolean,
  value: number | number[],
  valueText: string | string[],
) {
  if (!ranged) {
    return [value as number, valueText as string]
  }
  if (isPostfix) {
    return [(value as number[])[1], (valueText as string[])[1]]
  }
  return [(value as number[])[0], (valueText as string[])[0]]
}

function parseValue(valueText: string) {
  return valueText.replace(/\D/g, '')
}

export interface SelectionIndicatorProps extends L3ComponentProps {
  kind?: InfixKind
  key?: InfixKind
  textSize?: SliderTextSize
  className?: string
}

const SelectionIndicator: React.FC<SelectionIndicatorProps> & {
  textSizes?: typeof SliderTextSize
} = ({ kind = InfixKind.POSTFIX || InfixKind.TEXTFIX, textSize, className }) => {
  const isPostfix = kind === InfixKind.POSTFIX
  const isTextFix = kind === InfixKind.TEXTFIX
  const { ranged, value, valueText } = useSliderSelection()
  const [, currentTextValue] = getCurrentLabel(isPostfix, isTextFix, ranged, value, valueText)
  const { changeThumbValue } = useSliderActions()
  const handleChange = useMemo(
    () =>
      debounce((newValueText: any) => {
        const newValue = parseValue(newValueText)
        const thumbIndex = (isPostfix ? 1 : 0) && (isTextFix ? 1 : 0)
        changeThumbValue(newValue, thumbIndex, true)
      }, VALUE_UPDATE_DELAY),
    [changeThumbValue, isPostfix, isTextFix],
  )
  const classNames = useMemo(
    () => cx('sliderText', `sliderText--textSize-${textSize}`, className),
    [textSize, className],
  )
  return isTextFix ? (
    <TextField className={classNames} onChange={handleChange} value={String(currentTextValue)} />
  ) : (
    <TextField onChange={handleChange} value={String(currentTextValue)} />
  )
}

export default SelectionIndicator
