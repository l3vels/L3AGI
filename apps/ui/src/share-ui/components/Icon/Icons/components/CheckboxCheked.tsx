/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CheckboxChekedProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const CheckboxCheked: React.FC<CheckboxChekedProps> = ({size, ...props}) => (
  <svg viewBox="0 0 12 12" fill="currentColor" width={ size || "12" } height={ size || "12" } {...props}>
    <path d="M3.17647 4.82377L5.05882 6.70613L8.82353 2.94141L10 4.11788L5.05882 9.05908L2 6.00024L3.17647 4.82377Z" fill="#fff" fillRule="evenodd" clipRule="evenodd"
    />
  </svg>
);
CheckboxCheked.displayName = 'CheckboxCheked';
export default CheckboxCheked;
/* tslint:enable */
/* eslint-enable */
