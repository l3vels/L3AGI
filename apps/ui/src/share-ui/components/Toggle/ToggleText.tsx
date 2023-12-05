import React, { FC } from "react";
import { BASE_TOGGLE_CLASS_NAME } from "./ToggleConstants";
import L3ComponentProps from "../../types/L3ComponentProps";

interface ToggleTextProps extends L3ComponentProps {
  children: string;
}

const ToggleText: FC<ToggleTextProps> = ({ children }) => (
  <span className={`${BASE_TOGGLE_CLASS_NAME}_text`}>{children}</span>
);
export default ToggleText;
