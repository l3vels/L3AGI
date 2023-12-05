/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ChevronDownProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ChevronDown: React.FC<ChevronDownProps> = ({size, ...props}) => (
  <svg viewBox="0 0 8 8" fill="currentColor" width={ size || "8" } height={ size || "8" } {...props}>
    <path d="M3.64648 6.35353L0.646484 3.35353L1.35359 2.64642L4.00004 5.29287L6.64648 2.64642L7.35359 3.35353L4.35359 6.35353L4.00004 6.70708L3.64648 6.35353Z" fill="#fff"
      fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
ChevronDown.displayName = 'ChevronDown';
export default ChevronDown;
/* tslint:enable */
/* eslint-enable */
