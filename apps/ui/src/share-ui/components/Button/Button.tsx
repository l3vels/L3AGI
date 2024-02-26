/* eslint-disable react/button-has-type */
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cx from 'classnames'
import { SIZES } from '../../constants'
import useResizeObserver from '../../hooks/useResizeObserver'
import useMergeRefs from '../../hooks/useMergeRefs'
import { NOOP } from '../../utils/function-utils'
import Icon from '../Icon/Icon'
import Loader from '../Loader/Loader'
import {
  BUTTON_ICON_SIZE,
  ButtonColor,
  ButtonInputType,
  ButtonType,
  getActualSize,
  Size,
} from './ButtonConstants'
import { getParentBackgroundColorNotTransparent, TRANSPARENT_COLOR } from './helper/dom-helpers'
import { getTestId } from '../../tests/test-ids-utils'
import { isIE11 } from '../../utils/user-agent-utils'
import { SubIcon, L3Component } from '../../types'
import { ComponentDefaultTestId } from '../../tests/constants'
import styled, { css } from 'styled-components'

import '../../styles/global-css-settings.css'

// min button width
const MIN_BUTTON_HEIGHT_PX = isIE11() ? 32 : 6
const UPDATE_CSS_VARIABLES_DEBOUNCE = 200

export interface ButtonProps {
  children?: React.ReactNode
  /** Custom class names to pass to the component */
  className?: string
  /** The button's kind */
  kind?: ButtonType
  /** Callback function to run when the button is clicked */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Blur on button click */
  blurOnMouseUp?: boolean
  /** Name of the button - for form submit usages  */
  name?: string
  /** The button's size */
  size?: Size
  /** The button's color */
  color?: ButtonColor
  /** The button's type */
  type?: ButtonInputType
  /** Whether the button should be disabled or not */
  disabled?: boolean
  /** Icon to place on the right */
  rightIcon?: SubIcon
  /** Icon to place on the left */
  leftIcon?: SubIcon
  /** the success props are used when you have async action and wants to display a success message */
  success?: boolean
  /** Success icon name */
  successIcon?: SubIcon
  /** Success text */
  successText?: string
  /** loading boolean which switches the text to a loader */
  loading?: boolean
  style?: React.CSSProperties
  /** displays the active state */
  active?: boolean
  /** id to pass to the button */
  id?: string
  /** adds 8px margin to the right */
  marginRight?: boolean
  /** adds 8px margin to the left */
  marginLeft?: boolean
  /** element id to describe the button accordingly */
  ariaLabeledBy?: string
  /** aria label to provide important when providing only Icon */
  ariaLabel?: string
  /** aria for a button popup */
  ariaHasPopup?: React.HTMLProps<HTMLButtonElement>['aria-haspopup']
  /** aria to be set if the popup is open */
  ariaExpanded?: boolean
  /** aria controls - receives id for the controlled region */
  ariaControls?: string
  /** On Button Focus callback */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
  /** On Button Blur callback */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
  rightFlat?: boolean
  leftFlat?: boolean
  preventClickAnimation?: boolean
  noSidePadding?: boolean
  /** default color for text color in ON_PRIMARY_COLOR kind (should be any type of css color (rbg, var, hex...) */
  defaultTextColorOnPrimaryColor?: string
  dataTestId?: string
  /** Change the focus indicator from around the button to within it */
  insetFocus?: boolean
}

const Button: L3Component<ButtonProps, unknown> & {
  sizes?: typeof SIZES
  colors?: typeof ButtonColor
  kinds?: typeof ButtonType
  types?: typeof ButtonInputType
  inputTags?: typeof ButtonInputType
  // eslint-disable-next-line react/display-name
} = forwardRef<unknown, ButtonProps>(
  (
    {
      className,
      children,
      kind,
      onClick,
      name,
      size,
      color,
      disabled,
      rightIcon,
      leftIcon,
      success,
      successText,
      successIcon,
      style,
      loading,
      active,
      id,
      marginRight,
      marginLeft,
      type,
      onMouseDown,
      ariaLabel,
      rightFlat,
      leftFlat,
      preventClickAnimation,
      noSidePadding,
      onFocus,
      onBlur,
      ariaLabeledBy,
      defaultTextColorOnPrimaryColor,
      ariaHasPopup,
      ariaExpanded,
      ariaControls,
      blurOnMouseUp,
      dataTestId,
      insetFocus,
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [hasSizeStyle, setHasSizeStyle] = useState(false)

    const updateCssVariables = useMemo(() => {
      return ({ borderBoxSize }: { borderBoxSize: { blockSize: number; inlineSize: number } }) => {
        const { blockSize, inlineSize } = borderBoxSize
        const width = Math.max(inlineSize, MIN_BUTTON_HEIGHT_PX)
        const height = Math.max(blockSize, MIN_BUTTON_HEIGHT_PX)
        if (!buttonRef.current) return
        buttonRef.current.style.setProperty('--element-width', `${width}px`)
        buttonRef.current.style.setProperty('--element-height', `${height}px`)
        setHasSizeStyle(true)
      }
    }, [buttonRef])

    useResizeObserver({
      ref: buttonRef,
      callback: updateCssVariables,
      debounceTime: UPDATE_CSS_VARIABLES_DEBOUNCE,
    })
    useEffect(() => {
      if (color !== ButtonColor.ON_PRIMARY_COLOR) return
      if (kind !== ButtonType.PRIMARY) return
      if (!buttonRef.current) return

      const buttonElement = buttonRef.current
      buttonElement.style.color = getParentBackgroundColorNotTransparent(
        buttonElement,
        defaultTextColorOnPrimaryColor,
      )
    }, [kind, buttonRef, color, defaultTextColorOnPrimaryColor])

    const onMouseUp = useCallback(() => {
      const button = buttonRef.current
      if (disabled || !button) {
        return
      }
      if (blurOnMouseUp) {
        button.blur()
      }
    }, [disabled, buttonRef, blurOnMouseUp])

    const onButtonClicked = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled || loading || success) {
          event.preventDefault()
          return
        }

        if (onClick) {
          onClick(event)
        }
      },
      [onClick, disabled, loading, success],
    )

    const onMouseDownClicked = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled || loading || success) {
          event.preventDefault()
          return
        }

        if (onMouseDown) {
          onMouseDown(event)
        }
      },
      [onMouseDown, disabled, loading, success],
    )

    const mergedRef = useMergeRefs({ refs: [ref, buttonRef] })

    const buttonProps = useMemo(() => {
      const props: Record<string, any> = {
        ref: mergedRef,
        type,
        className: className,
        name,
        onMouseUp,
        style,
        onClick: onButtonClicked,
        id,
        onFocus,
        onBlur,
        'data-testid': dataTestId || getTestId(ComponentDefaultTestId.BUTTON, id),
        onMouseDown: onMouseDownClicked,
        'aria-disabled': disabled,
        'aria-busy': loading,
        'aria-labelledby': ariaLabeledBy,
        'aria-label': ariaLabel,
        'aria-haspopup': ariaHasPopup,
        'aria-expanded': ariaExpanded,
        'aria-controls': ariaControls,
      }
      return props
    }, [
      disabled,
      mergedRef,
      type,
      className,
      name,
      onMouseUp,
      style,
      onButtonClicked,
      id,
      onFocus,
      onBlur,
      dataTestId,
      onMouseDownClicked,
      ariaLabeledBy,
      ariaLabel,
      loading,
      ariaHasPopup,
      ariaExpanded,
      ariaControls,
    ])

    const leftIconSize = useMemo(() => {
      if (typeof leftIcon !== 'function') return
      return BUTTON_ICON_SIZE
    }, [leftIcon])

    const rightIconSize = useMemo(() => {
      if (typeof rightIcon !== 'function') return
      return BUTTON_ICON_SIZE
    }, [rightIcon])

    return (
      <StyledButton {...buttonProps} size={size} kind={kind} disabled={disabled}>
        {!loading && leftIcon ? (
          <Icon
            iconType={Icon?.type?.ICON_FONT}
            clickable={false}
            icon={leftIcon}
            iconSize={leftIconSize}
            className={cx({ 'l3-style-button--left-icon': !!children })}
            ignoreFocusStyle
          />
        ) : null}

        {!loading ? children : <Loader svgClassName='l3-style-button-loader-svg' />}

        {!loading && rightIcon ? (
          <Icon
            iconType={Icon?.type?.ICON_FONT}
            clickable={false}
            icon={rightIcon}
            iconSize={rightIconSize}
            className={cx({ 'l3-style-button--right-icon': !!children })}
            ignoreFocusStyle
          />
        ) : null}
      </StyledButton>
    )
  },
)

Object.assign(Button, {
  sizes: SIZES,
  colors: ButtonColor,
  kinds: ButtonType,
  types: ButtonInputType,
  inputTags: ButtonInputType,
  defaultTestId: ComponentDefaultTestId.BUTTON,
})

Button.defaultProps = {
  className: undefined,
  name: undefined,
  style: undefined,
  id: undefined,
  dataTestId: undefined,
  kind: Button.kinds?.PRIMARY,
  onClick: NOOP,
  size: Button.sizes?.MEDIUM,
  color: Button.colors?.PRIMARY,
  disabled: false,
  rightIcon: null,
  leftIcon: null,
  success: false,
  successText: '',
  successIcon: null,
  loading: false,
  active: false,
  marginRight: false,
  marginLeft: false,
  type: Button.types?.BUTTON,
  onMouseDown: NOOP,
  rightFlat: false,
  leftFlat: false,
  preventClickAnimation: false,
  noSidePadding: false,
  onFocus: NOOP,
  onBlur: NOOP,
  defaultTextColorOnPrimaryColor: TRANSPARENT_COLOR,
  ariaHasPopup: undefined,
  blurOnMouseUp: true,
  ariaExpanded: undefined,
  ariaControls: undefined,
  ariaLabel: undefined,
  ariaLabeledBy: undefined,
  insetFocus: false,
}

export default Button

const StyledButton = styled.button<{ size?: string; kind?: string; disabled?: boolean }>`
  outline: 3px solid transparent;
  border: none;
  height: auto;
  border-radius: 60px;
  cursor: pointer;
  white-space: nowrap;

  border: 2px solid transparent;

  display: inline-flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  // Prevent text selection
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &--margin-right {
    margin-right: 8px;
  }
  &--margin-left {
    margin-left: 8px;
  }

  &--right-flat {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &--left-flat {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${props =>
    props.size === 'xxs' &&
    css`
      padding: var(--spacing-xxs) var(--spacing-xs);
      height: 16px;
      line-height: 16px;
    `}
  ${props =>
    props.size === 'xs' &&
    css`
      padding: var(--spacing-xs) var(--spacing-small);
      height: 24px;
      line-height: 21px;
    `}
  ${props =>
    props.size === 'small' &&
    css`
      padding: var(--spacing-xs) var(--spacing-small);
      height: var(--btn-size-small);
      line-height: 24px;
      font-size: 14px;
    `}
  ${props =>
    props.size === 'medium' &&
    css`
      padding: var(--spacing-small) var(--spacing-medium);
      height: var(--btn-size-medium);
      font-size: 16px;
    `}
  ${props =>
    props.size === 'large' &&
    css`
      padding: var(--spacing-small-medium) var(--spacing-large);
      height: var(--btn-size-big);
      font-size: 18px;
    `}


    ${props =>
    props.kind === 'primary' &&
    css`
      color: ${({ theme }) => theme.button.primary.color};
      background-color: ${({ theme }) => theme.button.primary.bgColor};
      &:hover {
        background-color: ${({ theme }) => theme.button.primary.hoverBgColor};
      }
      &:active {
        outline-color: ${({ theme }) => theme.button.primary.pressedBorderColor};
        background-color: ${({ theme }) => theme.button.primary.pressedBgColor};
      }
    `}
    ${props =>
    props.kind === 'secondary' &&
    css`
      color: ${({ theme }) => theme.button.secondary.color};
      background-color: ${({ theme }) => theme.button.secondary.bgColor};
      &:hover {
        /* background-color: ${({ theme }) => theme.button.secondary.hoverBgColor}; */

        border: 2px solid ${({ theme }) => theme.button.secondary.hoverBgColor};
      }
      &:active {
        border: 2px solid ${({ theme }) => theme.button.secondary.pressedBorderColor};
        /* background-color: ${({ theme }) => theme.button.secondary.pressedBgColor}; */
      }
    `}
    ${props =>
    props.kind === 'tertiary' &&
    css`
      color: ${({ theme }) => theme?.button.tertiary.color};
      background-color: ${({ theme }) => theme.button.tertiary.bgColor};
      &:hover {
        background-color: ${({ theme }) => theme.button.tertiary.hoverBgColor};
      }
      &:active {
        outline-color: ${({ theme }) => theme.button.tertiary.pressedBorderColor};
        background-color: ${({ theme }) => theme.button.tertiary.pressedBgColor};
      }
    `}

    ${props =>
    props.disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;

      color: #00000066;
      background-color: #00000033;

      &:hover {
        background-color: unset;
      }
    `}

    ${props =>
    props.disabled &&
    props.kind === 'tertiary' &&
    css`
      background-color: transparent;
    `}
`
