import React, { FC } from "react";
import { bem } from "../SliderHelpers";
import L3ComponentProps from "../../../types/L3ComponentProps";

export interface SliderTrackProps extends L3ComponentProps {
  /**
   * Consumer/Custom/Extra `class names` to be added to the Component's-Root-Node
   */
  className?: string;
}

const SliderTrack: FC<SliderTrackProps> = React.memo(({ className }) => {
  return <div className={bem("track", "", className)} />;
});

export default SliderTrack;
