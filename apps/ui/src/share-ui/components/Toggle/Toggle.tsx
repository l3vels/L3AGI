import React, { FC } from 'react'
import cx from 'classnames'
import { noop as NOOP } from 'lodash-es'
import { Switch } from '../Switch/Switch'
import { MockToggle } from './MockToggle'
import { BEMClass as bemClass } from '../../helpers/bem-helper'
import { backwardCompatibilityForProperties } from '../../helpers/backwardCompatibilityForProperties'
import { BASE_TOGGLE_CLASS_NAME, ToggleSize, ToggleType } from './ToggleConstants'
import L3ComponentProps from '../../types/L3ComponentProps'

const bemHelper = bemClass(BASE_TOGGLE_CLASS_NAME)

interface ToggleProps extends L3ComponentProps {
  // Backward compatibility for props naming
  componentClassName?: string
  isDefaultSelected?: boolean
  isSelected?: boolean
  onChange?: (value: boolean) => void
  value?: string
  name?: string
  // Backward compatibility for props naming
  isDisabled?: boolean
  disabled?: boolean
  areLabelsHidden?: boolean
  onOverrideText?: string
  offOverrideText?: string
  ariaLabel?: string
  ariaControls?: string
  size?: ToggleSize
  label?: boolean
  kind?: ToggleType
}

const Toggle: FC<ToggleProps> = ({
  id,
  // Backward compatibility for props naming
  componentClassName,
  className,
  isDefaultSelected = true,
  isSelected,
  onChange = NOOP,
  value,
  name,
  disabled,
  // Backward compatibility for props naming
  isDisabled,
  ariaLabel,
  ariaControls,
  // areLabelsHidden = false,
  onOverrideText = 'Switch on',
  offOverrideText = 'Switch off',
  size = 'large',
  label = false,
  kind = 'primary',
}) => {
  const overrideClassName = backwardCompatibilityForProperties([
    className,
    componentClassName,
  ]) as string
  const overrideDisabled = backwardCompatibilityForProperties(
    [disabled, isDisabled],
    false,
  ) as boolean
  const wrapperClassName = cx(
    bemHelper({ element: 'wrapper' }),
    {
      [bemHelper({ element: 'wrapper', state: 'disabled' })]: overrideDisabled,
    },
    bemHelper({ element: `size_${size}` }),
    bemHelper({ element: `kind_${kind}` }),
  )
  const inputClassName = bemHelper({ element: 'input' })
  return (
    <Switch
      defaultChecked={isDefaultSelected}
      checked={isSelected}
      id={id}
      wrapperClassName={wrapperClassName}
      onChange={onChange}
      value={value}
      name={name}
      disabled={overrideDisabled}
      ariaLabel={ariaLabel}
      ariaControls={ariaControls}
      inputClassName={inputClassName}
    >
      <MockToggle
        offOverrideText={offOverrideText}
        className={overrideClassName}
        onOverrideText={onOverrideText}
        label={label}
        // areLabelsHidden={areLabelsHidden}
      />
    </Switch>
  )
}

export default Toggle
