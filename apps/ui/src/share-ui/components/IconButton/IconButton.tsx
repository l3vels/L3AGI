import React, { forwardRef, Fragment, useMemo, useRef } from "react";
import cx from "classnames";
import { noop as NOOP } from "lodash-es";
import useMergeRefs from "../../hooks/useMergeRefs";
import Tooltip, { TooltipProps } from "../Tooltip/Tooltip";
import Icon from "../Icon/Icon";
import Close from "../Icon/Icons/components/Close";
import { getWidthHeight, Size } from "./services/IconButton-helpers";
import { SubIcon, L3Component, L3ComponentProps } from "../../types";
import { getTestId } from "../../tests/test-ids-utils";
import { ComponentDefaultTestId } from "../../tests/constants";
import Button from "../Button/Button";
import { BUTTON_ICON_SIZE, ButtonColor, ButtonType } from "../Button/ButtonConstants";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends L3ComponentProps {
  /**
   * id to be added to the element
   */
  id?: string;
  /**
   * callback function when clicking the icon button
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * class to be added to the button
   */
  className?: string;
  /**
   * class to be added to the button wrapper
   */
  wrapperClassName?: string;
  /**
   * Icon to be rendered
   */
  icon?: SubIcon;
  /**
   * a11y property to be added, used for screen reader to know what kind of button it is
   */
  ariaLabel?: string;
  /**
   * Size of the icon
   */
  size?: Size;
  /**
   * Whether the tooltip should be displayed or not
   */
  hideTooltip?: boolean;
  /**
   * Props for Tooltip component
   */
  tooltipProps?: Partial<TooltipProps>;
  /**
   * Tooltip wraps the button icon, it will display in the tooltip, if not present the aria label will be shown
   */
  tooltipContent?: string;
  /**
   * Kind of button - like <Button />
   */
  kind?: ButtonType;
  active?: boolean;
  /** The button's color  */
  color?: ButtonColor;
  /**
   * disabled state
   */
  disabled?: boolean;
  /**
   * if disabled - this will be shown in the tooltip
   */
  disabledReason?: string;
  dataTestId?: string;
  /** Change the focus indicator from around the button to within it */
  insetFocus?: boolean;
  label?: string;
  labelInButton?: string;
  shape?: "Square" | "Circle";
}

const IconButton: L3Component<IconButtonProps> & {
  sizes?: typeof Button.sizes;
  kinds?: typeof Button.kinds;
  colors?: typeof Button.colors;
} = forwardRef(
  (
    {
      wrapperClassName,
      id,
      icon,
      size,
      tooltipProps,
      tooltipContent,
      ariaLabel,
      hideTooltip,
      kind,
      active,
      disabled,
      disabledReason,
      onClick,
      color,
      dataTestId,
      insetFocus,
      label,
      labelInButton,
      shape
    },
    ref
  ) => {
    const componentRef = useRef(null);
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] });
    const overrideTooltipContent = useMemo(
      () => tooltipProps?.content || tooltipContent,
      [tooltipProps?.content, tooltipContent]
    );

    const buttonAriaLabel = useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (typeof overrideTooltipContent === "string") return overrideTooltipContent;
      return undefined;
    }, [ariaLabel, overrideTooltipContent]);

    const iconSize = useMemo(() => {
      switch (size) {
        case Button.sizes.XXS:
        case Button.sizes.XS:
        case Button.sizes.SMALL:
          return 16;
        case Button.sizes.LARGE:
          return BUTTON_ICON_SIZE;
        default:
          return 24;
      }
    }, [size]);

    const overrideStyle = useMemo(() => {
      let style = {
        justifyContent: "center",
        alignItems: "center",
        padding: 0
      } as React.CSSProperties;

      if (size) {
        style = { ...style, ...getWidthHeight(size) };
      }
      return style;
    }, [size]);

    const calculatedTooltipContent = useMemo(() => {
      if (hideTooltip) return null;
      if (disabled && disabledReason) return disabledReason;
      if (overrideTooltipContent) return overrideTooltipContent as never;
      return ariaLabel;
    }, [hideTooltip, disabled, disabledReason, overrideTooltipContent, ariaLabel]);

    const IconButtonWrapper = wrapperClassName ? "div" : Fragment;
    const iconButtonWrapperProps = useMemo(() => {
      return wrapperClassName ? { className: cx(wrapperClassName, styles.wrapper) } : {};
    }, [wrapperClassName]);

    const shapeTypeClassName = shape === "Circle" ? styles.l3_style_circle_button : styles.l3_style_square_button;
    const labelSizeClassName = iconSize === 16 ? styles.label_styles_small : styles.label_styles_large;

    return (
      <>
        {label ? (
          <div className={styles.iconButtonContainer}>
            <IconButtonWrapper {...iconButtonWrapperProps}>
              <Tooltip
                {...tooltipProps}
                content={calculatedTooltipContent}
                referenceWrapperClassName={styles.referenceWrapper}
              >
                <Button
                  onClick={onClick}
                  disabled={disabled}
                  color={color}
                  kind={kind}
                  ariaLabel={buttonAriaLabel}
                  ref={mergedRef}
                  id={id}
                  dataTestId={dataTestId || getTestId(ComponentDefaultTestId.ICON_BUTTON, id)}
                  noSidePadding
                  active={active}
                  className={shapeTypeClassName}
                  style={overrideStyle}
                  insetFocus={insetFocus}
                >
                  {labelInButton ? (
                    <>
                      <span className={labelSizeClassName}>{labelInButton}</span>
                    </>
                  ) : (
                    <Icon
                      icon={icon}
                      iconType={Icon.type.SVG}
                      iconSize={iconSize}
                      ignoreFocusStyle
                      className="icon-button-padding"
                      clickable={false}
                    />
                  )}
                </Button>
              </Tooltip>
            </IconButtonWrapper>
            <span className={labelSizeClassName}>{label}</span>
          </div>
        ) : (
          <div className={styles.iconButtonContainer}>
            <IconButtonWrapper {...iconButtonWrapperProps}>
              <Tooltip
                {...tooltipProps}
                content={calculatedTooltipContent}
                referenceWrapperClassName={styles.referenceWrapper}
              >
                <Button
                  onClick={onClick}
                  disabled={disabled}
                  color={color}
                  kind={kind}
                  ariaLabel={buttonAriaLabel}
                  ref={mergedRef}
                  id={id}
                  dataTestId={dataTestId || getTestId(ComponentDefaultTestId.ICON_BUTTON, id)}
                  noSidePadding
                  active={active}
                  className={shapeTypeClassName}
                  style={overrideStyle}
                  insetFocus={insetFocus}
                >
                  {labelInButton ? (
                    <>
                      <span className={labelSizeClassName}>{labelInButton}</span>
                    </>
                  ) : (
                    <Icon
                      icon={icon}
                      iconType={Icon.type.SVG}
                      iconSize={iconSize}
                      ignoreFocusStyle
                      className="icon-button-padding"
                      clickable={false}
                    />
                  )}
                </Button>
              </Tooltip>
            </IconButtonWrapper>
          </div>
        )}
      </>
    );
  }
);

Object.assign(IconButton, {
  sizes: Button.sizes,
  kinds: Button.kinds,
  colors: Button.colors,
  defaultTestId: ComponentDefaultTestId.ICON_BUTTON
});

IconButton.defaultProps = {
  className: undefined,
  wrapperClassName: undefined,
  onClick: NOOP,
  id: undefined,
  icon: Close,
  ariaLabel: undefined,
  size: IconButton?.sizes.LARGE,
  hideTooltip: false,
  tooltipContent: undefined,
  tooltipProps: {} as TooltipProps,
  kind: IconButton.kinds.PRIMARY,
  disabled: false,
  disabledReason: undefined,
  color: undefined,
  dataTestId: undefined,
  insetFocus: false,
  shape: "Circle"
};

export default IconButton;
