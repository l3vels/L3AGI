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
import styled, { css } from 'styled-components'

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
      indeterminate = false,
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
          <StyledInnerWrapper>
            <StyledInput
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
            <StyledCustomInput
              size={size}
              checked={checked}
              className={'customInput'}
              ref={iconContainerRef}
              indeterminate={indeterminate}
            >
              <Icon
                className={`checkboxIcon`}
                iconType={Icon.type?.SVG}
                icon={indeterminate ? Remove : Check}
                ignoreFocusStyle
                clickable={false}
                ariaHidden={true}
                iconSize='16'
              />
            </StyledCustomInput>
            {label?.length === 0 ? null : (
              <StyledLabel size={size} className={cx(`${BASE_CLASS_NAME}__label`, labelClassName)}>
                {label}
              </StyledLabel>
            )}
          </StyledInnerWrapper>
        </label>
        {description?.length === 0 ? null : (
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

const StyledInnerWrapper = styled.div`
  display: flex;

  gap: 8px;
`

const StyledLabel = styled.span<{ size: string }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  cursor: pointer;

  ${props =>
    props.size === 'small' &&
    css`
      font-size: 12px;
      line-height: 16px;
    `}
`
const StyledInput = styled.input`
  display: none;
`
const StyledCustomInput = styled.div<{ checked: boolean; size: string; indeterminate: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 21px;
  height: 21px;

  border: 3.5px solid #000;
  border-radius: 3.5px;

  /* position: relative;
  overflow: hidden; */

  .checkboxIcon {
    opacity: 0;
  }

  ${props =>
    props.checked &&
    css`
      outline: 2px solid rgba(0, 0, 0, 0.2);
      .checkboxIcon {
        opacity: 1;
        background-color: #4ca6f8;
        color: #fff;
      }
    `}
  ${props =>
    props.size === 'small' &&
    css`
      width: 16px;
      height: 16px;
    `}


  ${props =>
    props.indeterminate &&
    css`
      outline: 2px solid rgba(0, 0, 0, 0.2);
      .checkboxIcon {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
      }
    `}
`
