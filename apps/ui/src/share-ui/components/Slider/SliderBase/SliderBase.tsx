import React, { FC, forwardRef, useCallback } from 'react'
import {
  isArrowDownEvent,
  isArrowLeftEvent,
  isArrowRightEvent,
  isArrowUpEvent,
  isEndEvent,
  isHomeEvent,
  isPageDownEvent,
  isPageUpEvent,
} from '../../../utils/dom-event-utils'
import { useSliderActions, useSliderSelection, useSliderUi } from '../SliderContext'
import { bem, calcDimensions, calculatePageStep, getNearest, moveToPx } from '../SliderHelpers'
import { useSliderRail } from '../UseSliderHooks'
import SliderRail from './SliderRail'
import SliderTrack from './SliderTrack'
import SliderFilledTrack from './SliderFilledTrack'
import SliderThumb from './SliderThumb'
import L3ComponentProps from '../../../types/L3ComponentProps'

import { SliderTextSize } from '../SliderConstants'
import SliderInText from '../SliderInText'
import styled from 'styled-components'

export type SliderBaseProps = L3ComponentProps

// eslint-disable-next-line react/display-name
const SliderBase: FC<SliderBaseProps> = forwardRef(({ className }, _ref) => {
  const { color, disabled, size, shapeTestId } = useSliderUi()
  const { min, max, ranged, step, value } = useSliderSelection()
  const { changeThumbValue, drugThumb, decreaseValue, increaseValue } = useSliderActions()
  const { railCoords, railRef } = useSliderRail()
  const { dimension, offset, positions, thumbKeys } = calcDimensions(max, min, ranged, value)

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const offsetInPx = Math.round(e.clientX - railCoords.left)
      const newValue = moveToPx(offsetInPx, min, max, railCoords, step)
      drugThumb(newValue)
    },
    [drugThumb, min, max, railCoords, step],
  )

  const handleRailClick = useCallback(
    (e: React.MouseEvent) => {
      const offsetInPx = e.clientX - railCoords.left
      const newValue = moveToPx(offsetInPx, min, max, railCoords, step)
      const thumbIndex = getNearest(newValue, ranged, value)
      changeThumbValue(newValue, thumbIndex)
    },
    [changeThumbValue, min, max, railCoords, ranged, step, value],
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    if (isArrowUpEvent(e) || isArrowRightEvent(e)) {
      return increaseValue()
    }
    if (isArrowDownEvent(e) || isArrowLeftEvent(e)) {
      return decreaseValue()
    }
    if (isPageUpEvent(e)) {
      e.preventDefault()
      return increaseValue(calculatePageStep(max, min, step))
    }
    if (isPageDownEvent(e)) {
      e.preventDefault()
      return decreaseValue(calculatePageStep(max, min, step))
    }
    if (isHomeEvent(e)) {
      e.preventDefault()
      return changeThumbValue(min)
    }
    if (isEndEvent(e)) {
      e.preventDefault()
      return changeThumbValue(max)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <StyledBase data-testid={shapeTestId('base')} onKeyDown={handleKeyDown}>
        <SliderRail onClick={handleRailClick} ref={railRef}>
          <SliderTrack />
          {railRef.current ? (
            <>
              <SliderFilledTrack dimension={dimension} offset={offset} />
              {positions.map((position, index) => {
                return (
                  <SliderThumb
                    key={thumbKeys[index]}
                    index={index}
                    onMove={handlePointerMove}
                    position={position}
                  />
                )
              })}
            </>
          ) : (
            <div />
          )}
        </SliderRail>
      </StyledBase>
      <SliderInText
        kind={SliderInText.kinds?.TEXTFIX}
        textSize={
          size === 'small'
            ? SliderTextSize.SMALL
            : size === 'medium'
            ? SliderTextSize.MEDIUM
            : SliderTextSize.LARGE
        }
      />
    </div>
  )
})

export default SliderBase

const StyledBase = styled.div`
  display: flex;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  padding: 0 8px;
`
