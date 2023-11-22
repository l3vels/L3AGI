import ToggleText from './ToggleText'
import cx from 'classnames'
import React, { FC } from 'react'
import { BEMClass as bemClass } from '../../helpers/bem-helper'
import { BASE_TOGGLE_CLASS_NAME } from './ToggleConstants'
import L3ComponentProps from '../../types/L3ComponentProps'

const bemHelper = bemClass(BASE_TOGGLE_CLASS_NAME)

export interface MockToggleProps extends L3ComponentProps {
  areLabelsHidden?: boolean
  checked?: boolean
  offOverrideText?: string
  onOverrideText?: string
  label?: boolean
}

export const MockToggle: FC<MockToggleProps> = ({
  // areLabelsHidden,
  checked,
  offOverrideText,
  onOverrideText,
  className,
  label,
}) => (
  <>
    <div
      className={cx(bemHelper({ element: 'toggle' }), className, {
        [bemHelper({ element: 'toggle', state: 'selected' })]: checked,
        [bemHelper({ element: 'toggle', state: 'not-selected' })]: !checked,
      })}
      aria-hidden='true'
    />
    {label &&
      (checked ? (
        <ToggleText>{onOverrideText}</ToggleText>
      ) : (
        <ToggleText>{offOverrideText}</ToggleText>
      ))}
  </>
)
