import React, { ForwardedRef, forwardRef, useMemo } from 'react'

import {
  LoaderColors,
  // LoaderSize,
  LoaderSizes,
} from './LoaderConstants'

import { L3Component, L3ComponentProps } from '../../types'
import { ComponentDefaultTestId } from '../../tests/constants'
import styled from 'styled-components'

export interface LoaderProps extends L3ComponentProps {
  // Backward compatibility for props naming
  svgClassName?: string
  className?: string
  /** The loader's size: `number` or `LoaderSizes` */
  size?: LoaderSizes | number
  color?: LoaderColors
  // hasBackground?: boolean;
  label?: boolean
}

const Loader: L3Component<LoaderProps, HTMLElement> & {
  sizes?: typeof LoaderSizes
  colors?: typeof LoaderColors
  // eslint-disable-next-line react/display-name
} = forwardRef(
  (
    {
      svgClassName,
      className,
      size,
      color,
      //  hasBackground = false,
      id,
      'data-testid': dataTestId,
      label = false,
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const sizeStyle = useMemo(() => {
      if (typeof size === 'number') {
        return { width: size, height: size }
      }
      return undefined
    }, [size])

    return <StyledLoaderContainer style={sizeStyle} />
  },
)

Object.assign(Loader, {
  sizes: LoaderSizes,
  colors: LoaderColors,
  defaultTestId: ComponentDefaultTestId.LOADER,
})

export default Loader

const StyledLoaderContainer = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
