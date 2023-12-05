import React, { CSSProperties, ReactElement } from 'react'
import Icon from '../Icon/Icon'
import { InfixKind, SliderTextSize } from './SliderConstants'
import { useSliderInfix, useSliderSelection } from './SliderContext'
import SelectionIndicator from './SelectionIndicator'
import { IconType } from '../Icon/IconConstants'

const defaultIconProps = {
  clickable: false,
  iconSize: 18,
  ignoreFocusStyle: true,
}

export function useSliderInfixComponent(
  kind: InfixKind,
  textSize: SliderTextSize,
): [boolean, string[], ReactElement, CSSProperties] {
  const {
    prefix,
    postfix,
    indicateSelection,
    selectionIndicatorWidth,
    textfix,
    indicateTextSelection,
  } = useSliderInfix()
  const { ranged, value, valueText } = useSliderSelection()
  const infix = kind === InfixKind.POSTFIX ? postfix : prefix
  const inTextFix = kind === InfixKind.TEXTFIX && textfix

  const isPostfix = kind === InfixKind.POSTFIX
  const isTextFix = kind === InfixKind.TEXTFIX
  if (indicateTextSelection && (isTextFix || ranged)) {
    return [
      true,
      [],
      <SelectionIndicator key={kind} kind={kind} textSize={textSize} />,
      { width: selectionIndicatorWidth },
    ]
  }
  if (typeof inTextFix === 'object' && (inTextFix as { icon: IconType }).icon) {
    const { icon, ...restIconProps } = inTextFix as { icon: IconType }
    const iconProps = { ...defaultIconProps, ...restIconProps }
    return [true, [], <Icon key='inTextFix-icon' icon={icon} {...iconProps} />, {}]
  }
  if (typeof inTextFix === 'function') {
    return [true, [], inTextFix(value, valueText), {}]
  }
  if (typeof inTextFix === 'string') {
    return [true, ['txt'], <>{inTextFix}</>, {}]
  }
  if (typeof inTextFix === 'undefined') {
    return [false, [], null, {}]
  }
  if (indicateSelection && (isPostfix || ranged)) {
    return [
      true,
      [],
      <SelectionIndicator key={kind} kind={kind} />,
      { width: selectionIndicatorWidth },
    ]
  }
  if (typeof infix === 'object' && (infix as { icon: IconType }).icon) {
    const { icon, ...restIconProps } = infix as { icon: IconType }
    const iconProps = { ...defaultIconProps, ...restIconProps }
    return [true, [], <Icon key='infix-icon' icon={icon} {...iconProps} />, {}]
  }
  if (typeof infix === 'function') {
    return [true, [], infix(value, valueText), {}]
  }
  if (typeof infix === 'string') {
    return [true, ['txt'], <>{infix}</>, {}]
  }
  if (typeof infix === 'undefined') {
    return [false, [], null, {}]
  }
  return [true, [], <>{infix}</>, {}]
}
