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
  bold?: boolean
  semiBold?: boolean
}

function Typography<T extends React.ElementType = 'span'>({
  as,
  value,
  type = TypographyTypes.P,
  size = TypographySizes.lg,
  customColor,
  style = {},
  bold = false,
  semiBold = false,
}: TypographyProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & {
    sizes?: typeof TypographySizes
    types?: typeof TypographyTypes
  }) {
  const finalStyle = useStyle(style, { color: customColor })
  const typograpghClassName = `${type}_${size}`

  return (
    <StyledTypography style={finalStyle} size={size} bold={bold} semiBold={semiBold}>
      {value}
    </StyledTypography>
  )
}

Object.assign(Typography, {
  types: TypographyTypes,
  sizes: TypographySizes,
})

export default Typography

const StyledTypography = styled.span<{ size: string; bold: boolean; semiBold: boolean }>`
  /* font-weight: 450; */
  font-style: normal;
  ${props =>
    props.size === 'large' &&
    css`
      font-size: 18px;
      line-height: 24px;
    `}
  ${props =>
    props.size === 'x-large' &&
    css`
      font-size: 22px;
      line-height: 26px;
    `}
  ${props =>
    props.size === 'medium' &&
    css`
      font-size: 16px;
      line-height: 20px;
    `}
    ${props =>
    props.size === 'small' &&
    css`
      font-size: 14px;
      line-height: 16px;
    `}
    ${props =>
    props.size === 'xs-small' &&
    css`
      font-size: 12px;
      line-height: 16px;
    `}
    ${props =>
    props.bold &&
    css`
      font-weight: bold;
    `}
    ${props =>
    props.semiBold &&
    css`
      font-weight: 500;
    `}
`
