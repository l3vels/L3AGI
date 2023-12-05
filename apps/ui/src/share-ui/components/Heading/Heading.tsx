import { DialogPosition } from '../../constants/positions'
import React, { CSSProperties, useLayoutEffect } from 'react'
import cx from 'classnames'
import Tooltip from '../../components/Tooltip/Tooltip'
import useIsOverflowing from '../../hooks/useIsOverflowing'
import useStyle from '../../hooks/useStyle'
import useRefWithCallback from '../../hooks/useRefWithCallback'
import TextWithHighlight from '../TextWithHighlight/TextWithHighlight'
import { HeadingSizes, HeadingTypes } from './HeadingConstants'
import L3ComponentProps from '../../types/L3ComponentProps'
import styled, { css } from 'styled-components'

export interface HeadingProps extends L3ComponentProps {
  type?: HeadingTypes
  ariaLabel?: string
  value?: string
  ellipsis?: boolean
  ellipsisMaxLines?: number
  suggestEditOnHover?: boolean
  /** Tooltip to show when no overflow */
  nonEllipsisTooltip?: string
  size?: HeadingSizes
  highlightTerm?: string
  customColor?: string
  style?: CSSProperties
  tooltipPosition?: DialogPosition
}

const Heading: React.FC<HeadingProps> & {
  sizes?: typeof HeadingSizes
  types?: typeof HeadingTypes
} = ({
  className,
  value = '',
  type = HeadingTypes.h1,
  size = HeadingSizes.LARGE,
  ariaLabel = '',
  id,
  customColor,
  ellipsis = true,
  ellipsisMaxLines = 1,
  style,
  tooltipPosition,
  highlightTerm = null,
  suggestEditOnHover = false,
  nonEllipsisTooltip = null,
}) => {
  const [componentRef, setRef] = useRefWithCallback(node =>
    node.style.setProperty('--heading-clamp-lines', ellipsisMaxLines.toString()),
  )
  const finalStyle = useStyle(style, { color: customColor })
  const classNames = cx('heading-component', className, `element-type-${type}`, `size-${size}`, {
    'multi-line-ellipsis': ellipsis && ellipsisMaxLines > 1,
    'single-line-ellipsis': ellipsis && ellipsisMaxLines <= 1,
    'suggest-edit-on-hover': suggestEditOnHover,
  })
  const Element = React.createElement(
    type,
    { className: classNames, 'aria-label': ariaLabel, id, ref: setRef, style: finalStyle },
    highlightTerm ? (
      <StyledText size={size} style={finalStyle}>
        <TextWithHighlight
          highlightTerm={highlightTerm}
          text={value}
          linesToClamp={ellipsisMaxLines}
          useEllipsis={ellipsis}
          nonEllipsisTooltip={nonEllipsisTooltip}
          tooltipPosition={tooltipPosition}
        />
      </StyledText>
    ) : (
      <StyledText size={size} style={finalStyle}>
        {value}
      </StyledText>
    ),
  )

  const isOverflowing = useIsOverflowing({ ref: ellipsis ? componentRef : null })

  useLayoutEffect(() => {
    if (componentRef.current) {
      componentRef.current.style.setProperty('--heading-clamp-lines', ellipsisMaxLines?.toString())
    }
  }, [componentRef, ellipsisMaxLines, isOverflowing])

  // When using highlight term - use tooltip there
  if (!highlightTerm) {
    if (isOverflowing || nonEllipsisTooltip) {
      const tooltipContent = isOverflowing ? value : nonEllipsisTooltip
      return (
        <Tooltip content={tooltipContent} position={tooltipPosition}>
          {Element}
        </Tooltip>
      )
    }
  }
  return Element
}

Object.assign(Heading, {
  types: HeadingTypes,
  sizes: HeadingSizes,
})

export default Heading

const StyledText = styled.div<{ size: string }>`
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 52px;

  ${props =>
    props.size === 'medium' &&
    css`
      font-size: 36px;
      line-height: 44px;
    `}
  ${props =>
    props.size === 'small' &&
    css`
      font-size: 32px;
      line-height: 40px;
    `}
  ${props =>
    props.size === 'xs' &&
    css`
      font-size: 28px;
      line-height: 36px;
    `}
  ${props =>
    props.size === 'xss' &&
    css`
      font-size: 24px;
      line-height: 32px;
    `}
`
