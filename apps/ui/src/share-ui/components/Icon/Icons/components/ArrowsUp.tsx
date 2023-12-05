/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowsUpProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowsUp: React.FC<ArrowsUpProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M16.5 22V11M12 15.5L16.5 11 21 15.5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
ArrowsUp.displayName = 'ArrowsUp';
export default ArrowsUp;
/* tslint:enable */
/* eslint-enable */
