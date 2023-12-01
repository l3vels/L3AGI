import React, { FC } from 'react'
import { bem } from '../SliderHelpers'
import L3ComponentProps from '../../../types/L3ComponentProps'
import styled from 'styled-components'

export interface SliderTrackProps extends L3ComponentProps {
  /**
   * Consumer/Custom/Extra `class names` to be added to the Component's-Root-Node
   */
  className?: string
}

const SliderTrack: FC<SliderTrackProps> = React.memo(({ className }) => {
  return <StyledTrack className={bem('track', '', className)} />
})

export default SliderTrack

const StyledTrack = styled.div`
  position: absolute;
  // @include theme-prop(background, var(--color-transparent-white-01));
  // background: var(--color-transparent-white-01);
  -webkit-tap-highlight-color: transparent;
  border-radius: 3px;
  top: calc(50% - 2px / 2);
  height: 2px;
  width: 100%;

  background: rgba(0, 0, 0, 0.1);
`
