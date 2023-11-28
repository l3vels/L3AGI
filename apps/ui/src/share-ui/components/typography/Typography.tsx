import { CSSProperties } from 'react'
// import L3ComponentProps from "../../../types/L3ComponentProps";
import { TypographySizes, TypographyTypes } from './TypographyConstants'
import useStyle from '../../hooks/useStyle'

import cx from 'classnames'
import styled, { css } from 'styled-components'

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

  return (
    <StyledTypography style={finalStyle} size={size}>
      {value}
    </StyledTypography>
  )
}

Object.assign(Typography, {
  types: TypographyTypes,
  sizes: TypographySizes,
})

export default Typography

const StyledTypography = styled.span<{ size: string }>`
  font-weight: 450;
  ${props =>
    props.size === 'large' &&
    css`
      font-size: 18px;
      line-height: 26px;
    `}
  ${props =>
    props.size === 'medium' &&
    css`
      font-size: 16px;
      line-height: 22px;
    `}
    ${props =>
    props.size === 'small' &&
    css`
      font-size: 14px;
      line-height: 18px;
    `}
    ${props =>
    props.size === 'xs-small' &&
    css`
      font-size: 12px;
      line-height: 14px;
    `}
`
