import { CSSProperties } from 'react'
// import L3ComponentProps from "../../../types/L3ComponentProps";
import { TypographySizes, TypographyTypes } from './TypographyConstants'
import useStyle from '../../hooks/useStyle'

import cx from 'classnames'

interface TypographyProps<T extends React.ElementType> {
  as?: T
  value?: string
  size?: TypographySizes
  //   highlightTerm?: string;
  customColor?: string
  type?: TypographyTypes
  style?: CSSProperties
}

function Typography<T extends React.ElementType = 'span'>({
  as,
  value,
  type = TypographyTypes.P,
  size = TypographySizes.lg,
  customColor,
  style = {},
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & {
    sizes?: typeof TypographySizes
    types?: typeof TypographyTypes
  }) {
  const finalStyle = useStyle(style, { color: customColor })
  const typograpghClassName = `${type}_${size}`

  const Component = as || 'span'
  return (
    <Component style={finalStyle} className={cx(typograpghClassName)}>
      {value}
    </Component>
  )
}

Object.assign(Typography, {
  types: TypographyTypes,
  sizes: TypographySizes,
})

export default Typography
