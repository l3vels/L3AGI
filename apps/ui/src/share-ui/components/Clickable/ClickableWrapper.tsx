import React, { forwardRef } from "react";
import Clickable from "./Clickable";
import L3ComponentProps from "../../types/L3ComponentProps";
import L3Component from "../../types/L3Component";
import { ClickableProps } from "../Clickable/Clickable";
interface ClickableWrapperProps extends L3ComponentProps {
  children: React.ReactNode;
  isClickable: boolean;
  clickableProps: ClickableProps;
}

const ClickableWrapper: L3Component<ClickableWrapperProps, HTMLElement> = forwardRef(
  ({ children, isClickable = true, clickableProps = {} }, ref) => {
    if (!isClickable) {
      return <>{children}</>;
    }

    return (
      <Clickable {...clickableProps} ref={ref}>
        {children}
      </Clickable>
    );
  }
);

export default ClickableWrapper;
