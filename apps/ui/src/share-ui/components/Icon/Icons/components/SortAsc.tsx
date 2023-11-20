/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SortAscProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SortAsc: React.FC<SortAscProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M17 18.4996L19.5 20.9996 21.9999 18.5M19.5 14.9996V20.9996M11 15.9996H15.4999M11 11.9996H19.4999M11 19.9996H14.5" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);
SortAsc.displayName = 'SortAsc';
export default SortAsc;
/* tslint:enable */
/* eslint-enable */
