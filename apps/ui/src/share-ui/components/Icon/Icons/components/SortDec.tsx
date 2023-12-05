/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SortDecProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SortDec: React.FC<SortDecProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M17 13.4996L19.5 10.9996 21.9999 13.4992M19.5 16.9996V10.9996M11 15.9996H15.4999M11 11.9996H14.4999M11 19.9996H19.4999" stroke="#fff" strokeLinecap="round"
      strokeLinejoin="round" />
  </svg>
);
SortDec.displayName = 'SortDec';
export default SortDec;
/* tslint:enable */
/* eslint-enable */
