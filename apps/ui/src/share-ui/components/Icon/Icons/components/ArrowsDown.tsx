/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowsDownProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowsDown: React.FC<ArrowsDownProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M16 10.5V21.5M11.5 17L16 21.5 20.5 17" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
ArrowsDown.displayName = 'ArrowsDown';
export default ArrowsDown;
/* tslint:enable */
/* eslint-enable */
