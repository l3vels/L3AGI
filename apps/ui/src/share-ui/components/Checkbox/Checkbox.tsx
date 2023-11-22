import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import { isNil, noop as NOOP } from 'lodash-es'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Icon from '../Icon/Icon'
import Check from '../Icon/Icons/components/Check'
import Remove from '../Icon/Icons/components/Remove'
import { backwardCompatibilityForProperties } from '../../helpers/backwardCompatibilityForProperties'
import { useSupportFirefoxLabelClick } from './hooks/useSupportFirefoxLabelClick'
import useMergeRefs from '../../hooks/useMergeRefs'

const BASE_CLASS_NAME = 'l3-style-checkbox'

type CheckboxProps = {
  className?: string

  componentClassName?: string
  checkboxClassName?: string
  labelClassName?: string
  ariaLabel?: string
  label?: string
  ariaLabelledBy?: string
  onChange?: any
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  value?: any
  name?: string
  id?: string
  size?: 'large' | 'small'
  kind?: 'primary' | 'secondary'
  description?: string
}

// eslint-disable-next-line react/display-name
const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      className,
      // Backward compatibility for props naming
      componentClassName,
      checkboxClassName,
      labelClassName,
      ariaLabel,
      label = '',
      ariaLabelledBy,
      onChange,
      checked,
      indeterminate,
      disabled,
      defaultChecked,
      value,
      name,
      id,
      size = 'large',
      kind = 'primary',
      description = '',
    },
    ref,
  ) => {
    const iconContainerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const mergedInputRef = useMergeRefs({ refs: [ref, inputRef] })
    const overrideClassName = backwardCompatibilityForProperties([className, componentClassName])
    const onMouseUpCallback = useCallback(() => {
      const input = inputRef.current
      if (!input) return

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          input.blur()
        })
      })
    }, [inputRef])

    const checkboxClassNames = [
      `${BASE_CLASS_NAME}__checkbox`,
      `${BASE_CLASS_NAME}__prevent-animation`,
      checkboxClassName,
    ]
    let overrideDefaultChecked = defaultChecked

    // If component did not receive default checked and checked props, choose default checked as
    // default behavior (handle isChecked logic inside input) and set default value
    if (isNil(overrideDefaultChecked) && isNil(checked)) {
      overrideDefaultChecked = false
    }

    useEffect(() => {
      if (inputRef.current && indeterminate) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [inputRef, indeterminate])

    const { onClickCapture: onClickCaptureLabel } = useSupportFirefoxLabelClick({ inputRef })

    return (
      <div className={cx(`wrapper`, description && `wrapper--size-${size}`)}>
        <label
          className={cx(
            BASE_CLASS_NAME,
            overrideClassName,
            { [`${BASE_CLASS_NAME}__disabled`]: disabled },
            [`${BASE_CLASS_NAME}--size-${size}`],
            [`${BASE_CLASS_NAME}--kind-${kind}`],
          )}
          onMouseUp={onMouseUpCallback}
          htmlFor={id}
          onClickCapture={onClickCaptureLabel}
        >
          <input
            ref={mergedInputRef}
            id={id}
            className={`${BASE_CLASS_NAME}__input`}
            value={value}
            name={name}
            type='checkbox'
            onChange={onChange}
            defaultChecked={overrideDefaultChecked}
            disabled={disabled}
            aria-label={ariaLabel || label}
            aria-labelledby={ariaLabelledBy}
            checked={checked}
          />
          <div className={cx(...checkboxClassNames)} ref={iconContainerRef}>
            <Icon
              className={`${BASE_CLASS_NAME}__icon`}
              iconType={Icon.type?.SVG}
              icon={indeterminate ? Remove : Check}
              ignoreFocusStyle
              clickable={false}
              ariaHidden={true}
              iconSize='16'
            />
          </div>

          {label?.length > 0 ? null : (
            <span className={cx(`${BASE_CLASS_NAME}__label`, labelClassName)}>{label}</span>
          )}
        </label>
        {description?.length > 0 ? null : (
          <span
            className={cx(
              `${BASE_CLASS_NAME}__description`,
              `${BASE_CLASS_NAME}__description--size-${size}`,
              `${BASE_CLASS_NAME}__description--kind-${kind}`,
            )}
          >
            {description}
          </span>
        )}
      </div>
    )
  },
)

export default Checkbox
