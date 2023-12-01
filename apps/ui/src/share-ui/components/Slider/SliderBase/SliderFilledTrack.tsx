import React, { FC } from 'react'
import { bem } from '../SliderHelpers'
import L3ComponentProps from '../../../types/L3ComponentProps'
import styled from 'styled-components'

function defineFilledTrackProps(dimension: number, offset: number, reverse: boolean) {
  if (reverse) {
    return {
      right: `${offset}%`,
      width: `${dimension - offset}%`,
    }
  }
  return {
    left: `${offset}%`,
    width: `${dimension - offset}%`,
  }
}

interface SliderFilledTrackProps extends L3ComponentProps {
  /**
   * Consumer/Custom/Extra `class names` to be added to the Component's-Root-Node
   */
  className?: string
  /**
   * Size of filled track, according to selected value of component (Slider)
   */
  dimension?: number
  /**
   * Offset from start of track
   */
  offset?: number
  /**
   * Start Filled Track from the end of the track
   * (`right` for LTR and `left` for RTL, `bottom` for vertical)
   */
  reverse?: boolean
}

const SliderFilledTrack: FC<SliderFilledTrackProps> = ({
  className,
  dimension = 0,
  offset = 0,
  reverse = false,
}) => {
  const filledTrackStyle = defineFilledTrackProps(dimension, offset, reverse)
  return (
    <StyledFilledTack className={bem('filled-track', '', className)} style={filledTrackStyle} />
  )
}

export default SliderFilledTrack

const StyledFilledTack = styled.div`
  position: absolute;
  // @include theme-prop(background-color, primary-color);
  // background: var(--color-gradient-light-blue);
  -webkit-tap-highlight-color: transparent;
  height: 2px;
  top: calc(50% - 2px / 2);
  width: 100%;

  background: linear-gradient(180deg, #cefb53 0%, #7af94b 100%);
`
