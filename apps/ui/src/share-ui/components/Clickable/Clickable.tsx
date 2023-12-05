/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { AriaRole, ReactNode, forwardRef, useRef } from 'react'
import { noop as NOOP } from 'lodash-es'
import cx from 'classnames'
import useMergeRefs from '../../hooks/useMergeRefs'
import { BEMClass as bemClass } from '../../helpers/bem-helper'
import { useKeyboardButtonPressedFunc } from '../../hooks/useKeyboardButtonPressedFunc'
import { getTestId } from '../../tests/test-ids-utils'
import { ComponentDefaultTestId } from '../../tests/constants'
import L3ComponentProps from '../../types/L3ComponentProps'
import L3Component from '../../types/L3Component'

const CSS_BASE_CLASS = 'l3-style-clickable'
const bemHelper = bemClass(CSS_BASE_CLASS)

export interface ClickableProps extends L3ComponentProps {
  elementType?: keyof JSX.IntrinsicElements | string
  className?: string
  id?: string
  children?: React.ReactNode
  role?: AriaRole
  onClick?: (event: React.MouseEvent) => void
  enableTextSelection?: boolean
  onMouseDown?: (event: React.MouseEvent) => void
  ariaLabel?: string | ReactNode
  ariaHidden?: boolean
  ariaHasPopup?: boolean | string
  ariaExpanded?: boolean
  tabIndex?: string
  disabled?: boolean
  style?: React.CSSProperties
  dataTestId?: string
}

// eslint-disable-next-line react/display-name
const Clickable: L3Component<ClickableProps, HTMLElement> = forwardRef(
  (
    {
      elementType = 'div',
      className = '',
      id,
      children,
      role = 'button',
      onClick = NOOP,
      enableTextSelection = false,
      onMouseDown = NOOP,
      ariaLabel,
      ariaHidden,
      ariaHasPopup,
      ariaExpanded,
      tabIndex = '0',
      disabled = false,
      style,
      dataTestId,
    },
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    const componentRef = useRef<HTMLElement | null>(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] })
    const onKeyDown = useKeyboardButtonPressedFunc(onClick)
    return React.createElement(
      elementType,
      {
        ref: mergedRef,
        className: cx(CSS_BASE_CLASS, className, {
          disabled,
          [bemHelper({ state: 'disable-text-selection' })]: !enableTextSelection,
        }),
        'data-testid': dataTestId || getTestId(ComponentDefaultTestId.CLICKABLE, id),
        role: role,
        onClick: disabled ? undefined : onClick,
        id: id,
        onKeyDown: disabled ? undefined : onKeyDown,
        tabIndex: disabled ? -1 : tabIndex,
        'aria-label': ariaLabel,
        'aria-hidden': ariaHidden,
        'aria-haspopup': ariaHasPopup,
        'aria-expanded': ariaExpanded,
        onMouseDown: onMouseDown,
        style: style,
      },
      children,
    )
  },
)

Object.assign(Clickable, {
  defaultTestId: ComponentDefaultTestId.CLICKABLE,
})

export default Clickable
