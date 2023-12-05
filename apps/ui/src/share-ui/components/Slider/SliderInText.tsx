import React, { FC } from 'react'
import { InfixKind, SliderTextSize } from './SliderConstants'
import { bem } from './SliderHelpers'
// import { useSliderInfixComponent } from "./SliderInfixHooks";
import L3ComponentProps from '../../types/L3ComponentProps'
// import { useSliderInTextFixComponent } from "./SliderInTextFixHooks";
import { useSliderInfixComponent } from './UseSliderInfixHooks'

interface SliderInTextProps extends L3ComponentProps {
  /**
   * kind (type/mode) of Infix prefix/postfix
   * Infix - additional inserted by Consumer - component/string/number etc.
   */
  kind?: InfixKind
  textSize?: SliderTextSize
}

const SliderInText: FC<SliderInTextProps> & {
  kinds?: typeof InfixKind
  textSizes?: typeof SliderTextSize
} = ({ kind = SliderInText.kinds?.TEXTFIX, textSize = SliderTextSize.SMALL }) => {
  const [isShow, modificators, InfixComponent, inlineStyle] = useSliderInfixComponent(
    kind,
    textSize,
  )
  return (
    isShow && (
      <div className={bem('', [...modificators, kind, textSize])} style={inlineStyle}>
        {InfixComponent}
      </div>
    )
  )
}

SliderInText.kinds = InfixKind
SliderInText.textSizes = SliderTextSize

Object.assign(SliderInText, {
  kinds: InfixKind,
  sizes: SliderTextSize,
})

export default SliderInText
