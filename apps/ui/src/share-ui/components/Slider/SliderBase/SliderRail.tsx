import React, { ForwardedRef, forwardRef, ReactElement } from 'react'
import { NOOP } from '../../../utils/function-utils'
import { useSliderUi } from '../SliderContext'
import { bem } from '../SliderHelpers'
import L3ComponentProps from '../../../types/L3ComponentProps'
import styled from 'styled-components'

interface SliderRailProps extends L3ComponentProps {
  /**
   * Consumer/Custom/Extra `class names` to be added to the Component's-Root-Node
   */
  className?: string
  /**
   * onClick callback function
   */
  onClick?: (event: React.MouseEvent) => void
  children?: ReactElement | ReactElement[]
}

// eslint-disable-next-line react/display-name
const SliderRail: React.ForwardRefExoticComponent<SliderRailProps & React.RefAttributes<unknown>> =
  // eslint-disable-next-line react/display-name
  forwardRef<unknown, SliderRailProps>(
    ({ className, children, onClick = NOOP }, ref: ForwardedRef<HTMLDivElement>) => {
      const { shapeTestId } = useSliderUi()
      function handleClick(e: React.MouseEvent) {
        onClick(e)
      }

      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <StyledRail data-testid={shapeTestId('rail')} onClick={handleClick} ref={ref}>
          {children}
        </StyledRail>
      )
    },
  )

export default SliderRail

const StyledRail = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;

  border-radius: 2px;
  height: 2px;
  padding: 8px 0;
`
