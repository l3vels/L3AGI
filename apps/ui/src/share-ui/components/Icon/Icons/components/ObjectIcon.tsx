/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ObjectIconProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ObjectIcon: React.FC<ObjectIconProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M15.7632 10V21M11 12.75L20.5263 18.25M11 18.25L20.5263 12.75" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
ObjectIcon.displayName = 'ObjectIcon';
export default ObjectIcon;
/* tslint:enable */
/* eslint-enable */
