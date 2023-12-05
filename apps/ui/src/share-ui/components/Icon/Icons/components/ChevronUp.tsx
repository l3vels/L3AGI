/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ChevronUpProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ChevronUp: React.FC<ChevronUpProps> = ({size, ...props}) => (
  <svg viewBox="0 0 8 8" fill="currentColor" width={ size || "8" } height={ size || "8" } {...props}>
    <path d="M3.64648 1.64647L0.646484 4.64647L1.35359 5.35358L4.00004 2.70713L6.64648 5.35358L7.35359 4.64647L4.35359 1.64647L4.00004 1.29292L3.64648 1.64647Z" fill="#fff"
      fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
ChevronUp.displayName = 'ChevronUp';
export default ChevronUp;
/* tslint:enable */
/* eslint-enable */
