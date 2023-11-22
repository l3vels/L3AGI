import React, { FC } from "react";
import { InfixKind, SliderTextSize } from "./SliderConstants";
import { bem } from "./SliderHelpers";
import { useSliderInfixComponent } from "./UseSliderInfixHooks";
import L3ComponentProps from "../../types/L3ComponentProps";

interface SliderInfixProps extends L3ComponentProps {
  /**
   * kind (type/mode) of Infix prefix/postfix
   * Infix - additional inserted by Consumer - component/string/number etc.
   */
  kind?: InfixKind;
  textSize?: SliderTextSize;
}

const SliderInfix: FC<SliderInfixProps> & { kinds?: typeof InfixKind } = ({
  kind = SliderInfix.kinds.PREFIX,
  textSize
}) => {
  const [isShow, modificators, InfixComponent, inlineStyle] = useSliderInfixComponent(kind, textSize);
  return (
    isShow && (
      <div className={bem("infix", [...modificators, kind])} style={inlineStyle}>
        {InfixComponent}
      </div>
    )
  );
};

SliderInfix.kinds = InfixKind;

Object.assign(SliderInfix, {
  kinds: InfixKind
});

export default SliderInfix;
