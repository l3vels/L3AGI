import React, { ForwardedRef, forwardRef, useMemo } from "react";
import cx from "classnames";
import { backwardCompatibilityForProperties } from "../../helpers/backwardCompatibilityForProperties";
import {
  LoaderColors,
  // LoaderSize,
  LoaderSizes
} from "./LoaderConstants";
import { getTestId } from "../../tests/test-ids-utils";
import { L3Component, L3ComponentProps } from "../../types";
import { ComponentDefaultTestId } from "../../tests/constants";
import styles from "./Loader.module.scss";

export interface LoaderProps extends L3ComponentProps {
  // Backward compatibility for props naming
  svgClassName?: string;
  className?: string;
  /** The loader's size: `number` or `LoaderSizes` */
  size?: LoaderSizes;
  color?: LoaderColors;
  // hasBackground?: boolean;
  label?: boolean;
}

const Loader: L3Component<LoaderProps, HTMLElement> & {
  sizes?: typeof LoaderSizes;
  colors?: typeof LoaderColors;
} = forwardRef(
  (
    {
      svgClassName,
      className,
      size,
      color,
      //  hasBackground = false,
      id,
      "data-testid": dataTestId,
      label = false
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const overrideClassName = backwardCompatibilityForProperties([className, svgClassName], "");

    const sizeStyle = useMemo(() => {
      if (typeof size === "number") {
        return { width: size, height: size };
      }
      return undefined;
    }, [size]);

    return (
      <div
        className={cx("l3-loader-component", styles.loaderContainer)}
        ref={ref}
        role="alert"
        title="loading"
        style={sizeStyle}
        id={id}
        data-testid={dataTestId || getTestId(ComponentDefaultTestId.LOADER, id)}
      >
        <svg
          className={cx("circle-loader-spinner", styles.circleLoaderSpinner, overrideClassName)}
          viewBox="0 0 50 50"
          color={color}
          aria-hidden
        >
          {/* {hasBackground && ( */}
          <circle className={styles.circleLoaderSpinnerBackground} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
          {/* )} */}
          <circle
            className={cx("circle-loader-spinner-path", styles.circleLoaderSpinnerPath)}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
        {label && <p className={cx(styles.loaderLabel)}>Uploading...</p>}
      </div>
    );
  }
);

Object.assign(Loader, {
  sizes: LoaderSizes,
  colors: LoaderColors,
  defaultTestId: ComponentDefaultTestId.LOADER
});

export default Loader;
