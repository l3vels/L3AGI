import React, { FC, ReactElement, useMemo, useRef } from 'react'
import cx from 'classnames'
import { useSwitchChecked } from './hooks/useSwitchChecked'
import L3ComponentProps from '../../types/L3ComponentProps'
import { MockToggleProps } from '../Toggle/MockToggle'

interface SwitchProps extends L3ComponentProps {
  name?: string
  value?: string
  role?: string
  disabled?: boolean
  ariaLabel?: string
  ariaLabelledBy?: string
  checked?: boolean
  inputClassName?: string
  onChange?: (value: boolean) => void
  ariaControls?: string
  defaultChecked?: boolean
  children?: ReactElement<MockToggleProps>
  wrapperClassName?: string
}

export const Switch: FC<SwitchProps> = ({
  id,
  name,
  value,
  role,
  disabled,
  ariaLabel,
  ariaLabelledBy,
  checked,
  inputClassName,
  onChange,
  ariaControls,
  defaultChecked,
  children: originalChildren,
  wrapperClassName,
}) => {
  const ref = useRef()
  const { onChange: overrideOnChange, checked: overrideChecked } = useSwitchChecked({
    checked,
    defaultChecked,
    onChange,
  })

  const children = useMemo(
    () =>
      React.cloneElement(originalChildren, {
        ...originalChildren?.props,
        checked: overrideChecked,
      }),
    [originalChildren, overrideChecked],
  )

  return (
    <label htmlFor={id} className={wrapperClassName}>
      <input
        ref={ref}
        id={id}
        aria-controls={ariaControls}
        value={value}
        name={name}
        type='checkbox'
        checked={overrideChecked}
        role={role ? role : 'switch'}
        onChange={overrideOnChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-checked={overrideChecked}
      />
      {children}
    </label>
  )
}
