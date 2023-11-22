import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import cx from 'classnames'
import useMergeRefs from '../../hooks/useMergeRefs'
import Clickable from '../Clickable/Clickable'
import { backwardCompatibilityForProperties } from '../../helpers/backwardCompatibilityForProperties'
import { baseClassName, RadioButtonSize, RadioButtonType } from './RadioButtonConstants'
import L3ComponentProps from '../../types/L3ComponentProps'
import L3Component from '../../types/L3Component'
import Tooltip from '../Tooltip/Tooltip'

interface RadioButtonProps extends L3ComponentProps {
  className?: string
  componentClassName?: string
  text?: string
  value?: string
  name?: string
  disabled?: boolean
  disabledReason?: string
  defaultChecked?: boolean
  children?: React.ReactNode
  onSelect?: (event: React.ChangeEvent<HTMLInputElement | null>) => void
  checked?: boolean
  retainChildClick?: boolean
  childrenTabIndex?: string
  noLabelAnimation?: boolean
  kind?: RadioButtonType
  size?: RadioButtonSize
  description?: string
}

// eslint-disable-next-line react/display-name
const RadioButton: L3Component<RadioButtonProps, HTMLElement> = forwardRef(
  (
    {
      className,
      // Backward compatibility for props naming
      componentClassName,
      text = '',
      value = '',
      name = '',
      disabled = false,
      disabledReason,
      defaultChecked = false,
      children,
      onSelect,
      checked,
      retainChildClick = true,
      childrenTabIndex = '0',
      noLabelAnimation = false,
      kind = 'primary',
      size = 'large',
      description,
    },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>()
    const mergedRef = useMergeRefs({ refs: [ref, inputRef] })
    const overrideClassName = backwardCompatibilityForProperties([className, componentClassName])
    const onChildClick = useCallback(() => {
      if (disabled || !retainChildClick) return
      if (inputRef.current) {
        inputRef.current.checked = true
      }
      if (onSelect) {
        onSelect(null)
      }
    }, [onSelect, inputRef, disabled, retainChildClick])

    const checkedProps = useMemo(() => {
      if (checked !== undefined) {
        return { checked }
      }
      return { defaultChecked }
    }, [checked, defaultChecked])

    const tooltipContent = disabled ? disabledReason : null

    return (
      <Tooltip content={tooltipContent}>
        <div className={cx(`wrapper`, description && `wrapper--size-${size}`)}>
          <label className={cx(baseClassName, overrideClassName, { disabled })}>
            <span
              className={cx(
                `${baseClassName}__radio-input-container`,
                `${baseClassName}__radio-input-container--kind-${kind}`,
              )}
            >
              <input
                className={`${baseClassName}__radio-input-container__radio-input`}
                type='radio'
                value={value}
                name={name}
                disabled={disabled}
                {...checkedProps}
                onChange={onSelect}
                ref={mergedRef}
              />
              <span
                className={cx(
                  `${baseClassName}__radio-input-container__radio-control`,
                  `${baseClassName}__radio-input-container__radio-control--size-${size}`,
                  {
                    [`${baseClassName}__radio-input-container__radio-control--label-animation`]:
                      !noLabelAnimation,
                  },
                  {
                    [`${baseClassName}__radio-input-container__radio-control--label-animation--size-${size}`]:
                      !noLabelAnimation,
                  },
                )}
              />
            </span>
            {text && (
              <span
                className={cx(
                  `${baseClassName}__radio-label`,
                  `${baseClassName}__radio-label--kind-${kind}`,
                  `${baseClassName}__radio-label--size-${size}`,
                )}
              >
                {text}
              </span>
            )}
            {children && (
              <Clickable
                className='radio-children-wrapper'
                onClick={onChildClick}
                tabIndex={childrenTabIndex}
              >
                {children}
              </Clickable>
            )}
          </label>
          {description && (
            <span
              className={cx(
                `${baseClassName}__description`,
                `${baseClassName}__description--size-${size}`,
                `${baseClassName}__description--kind-${kind}`,
              )}
            >
              {description}
            </span>
          )}
        </div>
      </Tooltip>
    )
  },
)

export default RadioButton
